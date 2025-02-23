from flask import Flask, request, jsonify
from geopy.geocoders import Nominatim
from flask_cors import CORS

app = Flask(__name__)
geolocator = Nominatim(user_agent="county_locator_app")
CORS(app)

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
    app.run(debug=True, port=5001)