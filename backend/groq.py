import requests

# Replace with your actual API key
API_KEY = "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"

# Groq API Endpoint (Update this if necessary)
API_URL = "https://api.groq.com/openai/v1/chat/completions"

def get_fire_mitigation_recommendation(fire_size, location, conditions):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama3-8b-8192",  # Use an available Groq model
        "messages": [
            {"role": "system", "content": "You are an expert in wildfire prevention and emergency response."},
            {"role": "user", "content": f"A wildfire is predicted at {location}. The estimated fire size is {fire_size} acres. "
                                        f"Current weather conditions: {conditions}. What steps should be taken to mitigate the fire, and who should be notified?"}
        ]
    }

    response = requests.post(API_URL, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        return f"Error: {response.text}"

# Example Usage
fire_size = 250  # Example fire size in acres
location = "Los Angeles, CA"
conditions = "Hot, dry, strong winds"

recommendations = get_fire_mitigation_recommendation(fire_size, location, conditions)
print("Wildfire Mitigation Plan:\n", recommendations)
