from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Replace with your actual API key
API_KEY = "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"

# Groq API Endpoint (Update this if necessary)
API_URL = "https://api.groq.com/openai/v1/chat/completions"

def get_fire_mitigation_recommendation(county, month, year, cause):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    prompt = (
        f"A wildfire was discovered in {county} county in {month} {year}. "
        f"The reported cause is {cause}. Name a few fire departments in that county and tell me what steps I should take to be safe from the specific cause. Make sure to tailor your response to the specific details I told you "

       
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
        #print("Groq AI Response:", mitigation_plan)  
        return mitigation_plan
    else:
        #print("Error from Groq:", response.text)  
        return f"Error: {response.text}"


# API route to handle incoming requests from Node.js
@app.route('/groq-analysis', methods=['POST'])
def analyze_fire():
    data = request.json
    county = data.get("county")
    month = data.get("month")
    year = data.get("year")
    cause = data.get("cause")

    if not all([county, month, year, cause]):
        return jsonify({"error": "Missing input fields"}), 400

    mitigation_plan = get_fire_mitigation_recommendation(county, month, year, cause)
    
    return jsonify({"mitigation_plan": mitigation_plan})

if __name__ == '__main__':
    app.run(port=5003, debug=True)