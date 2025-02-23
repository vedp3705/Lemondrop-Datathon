from flask import Flask, request, jsonify
from geopy.geocoders import Nominatim
from flask_cors import CORS
import requests
import tensorflow as tf
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

model = tf.keras.models.load_model("fire_size_classifier.h5")
preprocessor = joblib.load("preprocessor_fireclass.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Replace with your actual API key
API_KEY = "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"

# Groq API Endpoint
API_URL = "https://api.groq.com/openai/v1/chat/completions"

geolocator = Nominatim(user_agent="count_locator_app")
CORS(app, resources={r"/*": {"origins": "*"}})

cause_mapping = {
    "Lightning": 0,
    "Debris Burning": 1,
    "Campfire": 2,
    "Other": 3
}

def reverse_geocode(lat, lon):
    """Use geopy to determine the county from latitude/longitude."""
    try:
        location = geolocator.reverse((lat, lon), exactly_one=True, addressdetails=True)
        if location and "county" in location.raw["address"]:
            return location.raw["address"]["county"]
        return None
    except Exception as e:
        print(f"Reverse geocoding error: {e}")
        return None

def predict_fire_size(county, month, year, cause, latitude, longitude):
    input_data = pd.DataFrame({
        "FIRE_YEAR": [year],
        "LATITUDE": [latitude],
        "LONGITUDE": [longitude],
        "MONTH_sin": [np.sin(2 * np.pi * month / 12)],
        "MONTH_cos": [np.cos(2 * np.pi * month / 12)],
        "STAT_CAUSE_CODE": [cause]
    })
    input_transformed = preprocessor.transform(input_data)
    predicted_class_index = np.argmax(model.predict(input_transformed))
    fire_size_class = label_encoder.inverse_transform([predicted_class_index])[0]
    return fire_size_class


def get_fire_mitigation_recommendation(county, month, year, cause, fire_size_class):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    prompt = (
        f"Explicitly state that a wildfire was discovered in {county} county in {month} {year}. "
        f"Explicitly state that the reported cause is {cause}. Estimate the cost to put out based on historical data and the class of fire."
        f"Name a 3 fire departments in that county and tell me what steps the fire departments should take to minimize damage. "
        f"Use the context of the county/area. (ex: how urban the area is, demographic of residents) "
        f"Give a few tips to reduce the likelihood and damage of the fires in the future (ex: trim certain kinds of vegetation, limit certain behaviors)."
        f"Do not give extra information. Give you answer in a minimalist format with bullet points."
    )

    data = {
        "model": "llama3-8b-8192",
        "messages": [
            {"role": "system", "content": "You are an expert in wildfire prevention and emergency response."},
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(API_URL, headers=headers, json=data)

    if response.status_code == 200:
        mitigation_plan = response.json()["choices"][0]["message"]["content"]
        return mitigation_plan
    else:
        return f"Error: {response.text}"

@app.route('/predict', methods=['POST'])
def predict_fire():
    data = request.json
    county = data.get("county")
    month = data.get("month")
    year = data.get("year")
    cause = data.get("cause")
    latitude = data.get("latitude")
    longitude = data.get("longitude")

    if not latitude and not longitude:
        coordinates = geocode(county)
        latitude = coordinates[0]
        longitude = coordinates[1]
    
    if latitude and longitude and not county:
        county = reverse_geocode(latitude, longitude)
        if not county:
            return jsonify({"error": "Could not determine county from coordinates"}), 400

    fire_size_class = predict_fire_size(county, month, year, cause, latitude, longitude)
    # Get mitigation plan from Groq API
    mitigation_plan = get_fire_mitigation_recommendation(county, month, year, cause, fire_size_class)

    return jsonify({
        "predicted_fire_size_class": fire_size_class,
        "mitigation_plan": mitigation_plan
    })

def geocode(county):
    if not county:
        return {'error': 'No county provided'}

    location = geolocator.geocode(county)
    if location:
        return [location.latitude, location.longitude]
    else:
        return {'error': 'County not found'}

if __name__ == '__main__':
    app.run(port=5002, debug=True)  # Single backend runs on port 5002