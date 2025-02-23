# from flask import Flask, request, jsonify
# from geopy.geocoders import Nominatim
# from flask_cors import CORS
# import requests
# import tensorflow as tf
# import joblib
# import numpy as np

# app = Flask(__name__)

# model = tf.keras.models.load_model("fire_size_class_model.keras")
# preprocessor = joblib.load("preprocessor_fireclass.pkl")
# label_encoder = joblib.load("label_encoder.pkl")

# API_KEY = "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"
# API_URL = "https://api.groq.com/openai/v1/chat/completions"

# geolocator = Nominatim(user_agent="count_locator_app")
# CORS(app)

# def predict_fire_size(county, month, year, cause, latitude, longitude):
#     input_data = np.array([[year, latitude, longitude, np.sin(2 * np.pi * month / 12), np.cos(2 * np.pi * month / 12), cause]])
#     input_transformed = preprocessor.transform(input_data)
#     predicted_class_index = np.argmax(model.predict(input_transformed))
#     fire_size_class = label_encoder.inverse_transform([predicted_class_index])[0]

#     return fire_size_class

# def get_fire_mitigation_recommendation(county, month, year, cause, fire_size_class):
#     headers = {
#         "Authorization": f"Bearer {API_KEY}",
#         "Content-Type": "application/json"
#     }

#     fire_severity = {
#         "A": "Minimal fire, local containment is sufficient.",
#         "B": "Small fire, may require regional response.",
#         "C": "Moderate fire, requires coordinated suppression efforts.",
#         "D": "Large fire, state-level intervention may be needed.",
#         "E": "Very large fire, multiple agencies required.",
#         "F": "Extreme fire, national-level response advised.",
#         "G": "Catastrophic fire, mass evacuations and air support required."
#     }

#     severity_level = fire_severity.get(fire_size_class, "Unknown severity level")

#     prompt = (
#         f"A wildfire of size **Class {fire_size_class}** ({severity_level}) was predicted in {county} County in {month} {year}. "
#         f"The reported cause is {cause}. \n\n"

#         f"1️⃣ **List all fire departments within a reasonable response area**, considering the fire severity and response radius. \n"
#         f"2️⃣ **Recommend optimal resource allocation to contain the fire** and minimize damage to people, nature, and buildings. \n"
#         f"3️⃣ **List critical at-risk facilities (e.g., hospitals, power plants, schools) in the county** that may need evacuation. \n"
#         f"4️⃣ **Provide an optimal containment strategy** based on past firefighting lessons learned. \n\n"

#         f"Ensure that recommendations are specific and tailored to the fire's size, location, and cause."
#     )

#     data = {
#         "model": "llama3-8b-8192",
#         "messages": [
#             {"role": "system", "content": "You are an expert in wildfire mitigation, emergency response, and resource allocation."},
#             {"role": "user", "content": prompt}
#         ]
#     }

#     response = requests.post(API_URL, headers=headers, json=data)

#     if response.status_code == 200:
#         mitigation_plan = response.json()["choices"][0]["message"]["content"]
#         return mitigation_plan
#     else:
#         return f"Error: {response.text}"

# @app.route('/fire-analysis', methods=['POST'])
# def analyze_fire():
#     data = request.json
#     county = data.get("county")
#     month = int(data.get("month"))
#     year = int(data.get("year"))
#     cause = int(data.get("cause"))  
#     latitude = float(data.get("latitude"))
#     longitude = float(data.get("longitude"))

#     if not all([county, month, year, cause, latitude, longitude]):
#         return jsonify({"error": "Missing input fields"}), 400

#     fire_size_class = predict_fire_size(county, month, year, cause, latitude, longitude)

#     mitigation_plan = get_fire_mitigation_recommendation(county, month, year, cause, fire_size_class)

#     return jsonify({
#         "predicted_fire_size_class": fire_size_class,
#         "mitigation_plan": mitigation_plan
#     })

# @app.route('/geocode', methods=['GET'])
# def geocode():
#     county = request.args.get('county')

#     if not county:
#         return jsonify({'error': 'No county provided'}), 400

#     location = geolocator.geocode(county)
#     if location:
#         return jsonify({
#             'county': county,
#             'latitude': location.latitude,
#             'longitude': location.longitude
#         })
#     else:
#         return jsonify({'error': 'County not found'}), 404

# if __name__ == '__main__':
#     app.run(port=5002, debug=True)



















from flask import Flask, request, jsonify
from geopy.geocoders import Nominatim
from flask_cors import CORS
import pandas as pd
import requests
import tensorflow as tf
import joblib
import numpy as np

app = Flask(__name__)

# Load ML model and preprocessors
model = tf.keras.models.load_model("fire_size_classifier.h5")
preprocessor = joblib.load("preprocessor_fireclass.pkl")
label_encoder = joblib.load("label_encoder.pkl")

API_KEY = "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"
API_URL = "https://api.groq.com/openai/v1/chat/completions"

geolocator = Nominatim(user_agent="count_locator_app")
CORS(app, resources={r"/*": {"origins": "*"}})

# Mapping fire causes to numerical values
cause_mapping = {
    "Lightning": 0,
    "Debris Burning": 1,
    "Campfire": 2,
    "Other": 3
}

# def predict_fire_size(county, month, year, cause, latitude, longitude):
#     input_data = np.array([
#         [year, latitude, longitude, np.sin(2 * np.pi * month / 12), np.cos(2 * np.pi * month / 12), cause]
#     ])
#     input_transformed = preprocessor.transform(input_data)
#     predicted_class_index = np.argmax(model.predict(input_transformed))
#     fire_size_class = label_encoder.inverse_transform([predicted_class_index])[0]

#     return fire_size_class


def predict_fire_size(county, month, year, cause_numeric, latitude, longitude):
    input_data = pd.DataFrame({
        "FIRE_YEAR": [year],
        "LATITUDE": [latitude],
        "LONGITUDE": [longitude],
        # "MONTH": [month],
        "MONTH_sin": [np.sin(2 * np.pi * month / 12)],
        "MONTH_cos": [np.cos(2 * np.pi * month / 12)],
        "STAT_CAUSE_CODE": [cause_numeric]
    })
    input_transformed = preprocessor.transform(input_data)
    predicted_class_index = np.argmax(model.predict(input_transformed))
    fire_size_class = label_encoder.inverse_transform([predicted_class_index])[0]
    # fire_size_class = label_encoder.column_transform([predicted_class_index])[0]
    return fire_size_class



def get_fire_mitigation_recommendation(county, month, year, cause, fire_size_class):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    fire_severity = {
        "A": "Minimal fire, local containment is sufficient.",
        "B": "Small fire, may require regional response.",
        "C": "Moderate fire, requires coordinated suppression efforts.",
        "D": "Large fire, state-level intervention may be needed.",
        "E": "Very large fire, multiple agencies required.",
        "F": "Extreme fire, national-level response advised.",
        "G": "Catastrophic fire, mass evacuations and air support required."
    }

    severity_level = fire_severity.get(fire_size_class, "Unknown severity level")

    prompt = (
        f"A wildfire of size **Class {fire_size_class}** ({severity_level}) was predicted in {county} County in {month} {year}. "
        f"The reported cause is {cause}. \n\n"

        f"1️⃣ **List all fire departments within a reasonable response area**, considering the fire severity and response radius. \n"
        f"2️⃣ **Recommend optimal resource allocation to contain the fire** and minimize damage to people, nature, and buildings. \n"
        f"3️⃣ **List critical at-risk facilities (e.g., hospitals, power plants, schools) in the county** that may need evacuation. \n"
        f"4️⃣ **Provide an optimal containment strategy** based on past firefighting lessons learned. \n\n"

        f"Ensure that recommendations are specific and tailored to the fire's size, location, and cause."
    )

    data = {
        "model": "llama3-8b-8192",
        "messages": [
            {"role": "system", "content": "You are an expert in wildfire mitigation, emergency response, and resource allocation."},
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(API_URL, headers=headers, json=data)

    if response.status_code == 200:
        mitigation_plan = response.json()["choices"][0]["message"]["content"]
        return mitigation_plan
    else:
        return f"Error: {response.text}"

@app.route('/fire-analysis', methods=['POST'])
def analyze_fire():
    data = request.json
    county = data.get("county")
    month = int(data.get("month"))
    year = int(data.get("year"))
    cause = data.get("cause")  # Keep as string for logging/debugging

    # Convert cause to numerical value
    cause_numeric = cause_mapping.get(cause, -1)

    latitude = float(data.get("latitude"))
    longitude = float(data.get("longitude"))

    if not all([county, month, year, cause, latitude, longitude]):
        return jsonify({"error": "Missing input fields"}), 400

    # Check if cause is valid
    if cause_numeric == -1:
        return jsonify({"error": f"Invalid fire cause: {cause}"}), 400

    fire_size_class = predict_fire_size(county, month, year, cause_numeric, latitude, longitude)

    mitigation_plan = get_fire_mitigation_recommendation(county, month, year, cause, fire_size_class)

    return jsonify({
        "predicted_fire_size_class": fire_size_class,
        "mitigation_plan": mitigation_plan
    })

@app.route('/geocode', methods=['GET'])
def geocode():
    county = request.args.get('county')

    if not county:
        return jsonify({'error': 'No county provided'}), 400

    location = geolocator.geocode(county)
    if location:
        return jsonify({
            'county': county,
            'latitude': location.latitude,
            'longitude': location.longitude
        })
    else:
        return jsonify({'error': 'County not found'}), 404

if __name__ == '__main__':
    app.run(port=5002, debug=True)
