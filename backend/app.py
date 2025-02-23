# from flask import Flask, request, jsonify
# from geopy.geocoders import Nominatim
# from flask_cors import CORS
# import requests
# import tensorflow as tf
# import joblib
# import numpy as np
# import pandas as pd

# app = Flask(__name__)
# CORS(app) 

# model = tf.keras.models.load_model("fire_size_classifier.h5")
# preprocessor = joblib.load("preprocessor_fireclass.pkl")
# label_encoder = joblib.load("label_encoder.pkl")

# API_KEY = "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"

# API_URL = "https://api.groq.com/openai/v1/chat/completions"

# geolocator = Nominatim(user_agent="count_locator_app")
# CORS(app, resources={r"/*": {"origins": "*"}})

# def reverse_geocode(lat, lon):
#     """Use geopy to determine the county from latitude/longitude."""
#     try:
#         location = geolocator.reverse((lat, lon), exactly_one=True, addressdetails=True)
#         if location and "county" in location.raw["address"]:
#             return location.raw["address"]["county"]
#         return None
#     except Exception as e:
#         print(f"Reverse geocoding error: {e}")
#         return None

# def predict_fire_size(county, month, year, cause, latitude, longitude):
#     cause_mapping = {
#         "Lightning": 1.0,
#         "Equipment Use": 2.0,
#         "Smoking": 3.0,
#         "Campfire": 4.0,
#         "Debris Burning": 5.0,
#         "Railroad": 6.0,
#         "Arson": 7.0,
#         "Children": 8.0,
#         "Miscellaneous": 9.0
#     }

#     input_data = pd.DataFrame({
#         "FIRE_YEAR": [year],
#         "LATITUDE": [latitude],
#         "LONGITUDE": [longitude],
#         "MONTH_sin": [np.sin(2 * np.pi * month / 12)],
#         "MONTH_cos": [np.cos(2 * np.pi * month / 12)],
#         "STAT_CAUSE_CODE": [cause_mapping[cause]]
#     })

#     input_transformed = preprocessor.transform(input_data)
#     predicted_class_index = np.argmax(model.predict(input_transformed))
#     fire_size_class = label_encoder.inverse_transform([predicted_class_index])[0]
#     return fire_size_class


# #Groq API that is called once we predict the fire_size_class we get
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


# @app.route('/predict', methods=['POST'])
# def predict_fire():
#     data = request.json
#     county = data.get("county")
#     month = data.get("month")
#     year = data.get("year")
#     cause = data.get("cause")
#     latitude = data.get("latitude")
#     longitude = data.get("longitude")

#     if not latitude and not longitude:
#         coordinates = geocode(county)
#         latitude = coordinates[0]
#         longitude = coordinates[1]
    
#     if latitude and longitude and not county:
#         county = reverse_geocode(latitude, longitude)
#         if not county:
#             return jsonify({"error": "Could not determine county from coordinates"}), 400

#     fire_size_class = predict_fire_size(county, month, year, cause, latitude, longitude)
#     print("PREDICTION:", fire_size_class)
#     mitigation_plan = get_fire_mitigation_recommendation(county, month, year, cause, fire_size_class)

#     return jsonify({
#         "predicted_fire_size_class": fire_size_class,
#         "mitigation_plan": mitigation_plan
#     })

# def geocode(county):
#     if not county:
#         return {'error': 'No county provided'}

#     location = geolocator.geocode(county)
#     if location:
#         return [location.latitude, location.longitude]
#     else:
#         return {'error': 'County not found'}

# if __name__ == '__main__':
#     app.run(port=5002, debug=True)  # Backend runs on port 5002



from flask import Flask, request, jsonify
from geopy.geocoders import Nominatim
from flask_cors import CORS
import requests
import tensorflow as tf
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model("fire_size_classifier.h5")
preprocessor = joblib.load("preprocessor_fireclass.pkl")
label_encoder = joblib.load("label_encoder.pkl")

API_KEY = "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"
API_URL = "https://api.groq.com/openai/v1/chat/completions"

geolocator = Nominatim(user_agent="count_locator_app")
CORS(app, resources={r"/*": {"origins": "*"}})

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
    cause_mapping = {
        "Lightning": 1.0,
        "Equipment Use": 2.0,
        "Smoking": 3.0,
        "Campfire": 4.0,
        "Debris Burning": 5.0,
        "Railroad": 6.0,
        "Arson": 7.0,
        "Children": 8.0,
        "Miscellaneous": 9.0
    }

    input_data = pd.DataFrame({
        "FIRE_YEAR": [year],
        "LATITUDE": [latitude],
        "LONGITUDE": [longitude],
        "MONTH_sin": [np.sin(2 * np.pi * month / 12)],
        "MONTH_cos": [np.cos(2 * np.pi * month / 12)],
        "STAT_CAUSE_CODE": [cause_mapping[cause]]
    })

    input_transformed = preprocessor.transform(input_data)
    preds = model.predict(input_transformed)
    predicted_class_index = np.argmax(preds)
    confidence = float(np.max(preds))  # Confidence value as probability
    fire_size_class = label_encoder.inverse_transform([predicted_class_index])[0]
    return fire_size_class, confidence

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


def geocode(county):
    if not county:
        print("🚨 Error: No county provided!")
        return None  # Return None instead of an error dict

    location = geolocator.geocode(county)
    
    if location:
        print(f"✅ Geocoded {county}: Latitude={location.latitude}, Longitude={location.longitude}")
        return [location.latitude, location.longitude]
    else:
        print(f"🚨 Error: County '{county}' not found!")
        return None  # Return None if geocoding fails

@app.route('/predict', methods=['POST'])
def predict_fire():
    print("🔥 Request received at /predict with data:", request.json)
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

    fire_size_class, confidence = predict_fire_size(county, month, year, cause, latitude, longitude)
    print("PREDICTION:", fire_size_class, "Confidence:", confidence)
    mitigation_plan = get_fire_mitigation_recommendation(county, month, year, cause, fire_size_class)

    return jsonify({
        "predicted_fire_size_class": fire_size_class,
        "predicted_confidence": confidence,
        "mitigation_plan": mitigation_plan
    })





if __name__ == '__main__':
    app.run(port=5002, debug=True)
