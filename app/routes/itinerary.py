from flask import session, jsonify, request, Blueprint, render_template, redirect, url_for
from . import itinerary_bp
import requests
from app import db
from app.models import Itinerary

API_KEY = 'AIzaSyARNOpZX6eVHWb2Ao1_q1IM1nRLs4xNdWc' 

def get_popular_destinations(city):
    popular_destinations = []

    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"

    params = {
        'query': f'top tourist attractions in {city}',
        'key': API_KEY
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        results = response.json().get('results', [])

        for place in results:
            place_name = place.get('name', 'Unnamed Place')
            photo_reference = place.get('photos', [])[0].get('photo_reference', '') if place.get('photos') else ''
            photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={API_KEY}"
            place_details = {
                'name': place_name,
                'photo_url': photo_url
            }
            popular_destinations.append(place_details)
    
    return popular_destinations



@itinerary_bp.route('/search', methods=['POST'])
def search():
    city = request.json.get('city')  
    if city:
        popular_destinations = get_popular_destinations(city)
        return jsonify({'popular_destinations': popular_destinations})
    else:
        return jsonify({'error': 'City not provided'})

@itinerary_bp.route('/itineraries', methods=['GET'])
def get_user_itineraries():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    itineraries = Itinerary.query.filter_by(user_id=user_id).all()
    return jsonify({"itineraries": [itinerary.to_json() for itinerary in itineraries]}), 200

@itinerary_bp.route('/itineraries', methods=['POST'])
def create_itinerary():
    user_id = session.get("user_id")
    data = request.get_json()
    itinerary_name = data.get("name")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    if not itinerary_name:
        return jsonify({"error": "Name is required"}), 400

    new_itinerary = Itinerary(name=itinerary_name, user_id=user_id)
    db.session.add(new_itinerary)
    db.session.commit()

    return jsonify({"message": "Itinerary created successfully", "itinerary": new_itinerary.to_json()}), 201

#this is to run REACT
@itinerary_bp.route('/itinerary_search', methods=['POST'])
def itinerary_search():
    city = request.json.get('city')
    if city:
        popular_destinations = get_popular_destinations(city)
        return jsonify({'places': popular_destinations})
    else:
        return jsonify({'error': 'City not provided'})

