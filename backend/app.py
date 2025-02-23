from flask import Flask, request, jsonify
from geopy.geocoders import Nominatim
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Replace with your actual API key
API_KEY = "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"

# Groq API Endpoint
API_URL = "https://api.groq.com/openai/v1/chat/completions"

geolocator = Nominatim(user_agent="count_locator_app")
CORS(app)

def get_fire_mitigation_recommendation(county, month, year, cause):
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
        # print("🔥 Groq AI Response:", mitigation_plan)  
        return mitigation_plan
    else:
        # print("❌ Error from Groq:", response.text)  # Debugging error
        return f"Error: {response.text}"

@app.route('/predict', methods=['POST'])
def predict_fire():
    data = request.json
    county = data.get("county")
    month = data.get("month")
    year = data.get("year")
    cause = data.get("cause")
    coordinates = data.get("coordinates")

    if not all([month, year, cause]):
        return jsonify({"error": "Missing input fields"}), 400
    
    if not county and not coordinates:
        return jsonify({"error": "Missing location field"}), 400

    if not coordinates:
        coordinates = geocode(county)
        print(coordinates)

    # Get mitigation plan from Groq API
    mitigation_plan = get_fire_mitigation_recommendation(county, month, year, cause)

    return jsonify({ "message": "success", "mitigation_plan": mitigation_plan })

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
