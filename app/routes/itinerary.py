from flask import session, jsonify, request, Blueprint, render_template, redirect, url_for
from flask_cors import CORS, cross_origin
from . import itinerary_bp
import requests
from app import db, app
from app.models import Itinerary, ItineraryPlace, State

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


#this is to run REACT
@itinerary_bp.route('/itinerary_search', methods=['POST'])
@app.route('/itinerary_search', methods=['POST'])
@cross_origin(supports_credentials=True)
def itinerary_search():
    city = request.json.get('city')
    if city:
        popular_destinations = get_popular_destinations(city)
        return jsonify({'places': popular_destinations})
    else:
        return jsonify({'error': 'City not provided'})


@itinerary_bp.route('/search', methods=['POST'])
@cross_origin(supports_credentials=True)
def search():
    city = request.json.get('city')  
    if city:
        popular_destinations = get_popular_destinations(city)
        return jsonify({'popular_destinations': popular_destinations})
    else:
        return jsonify({'error': 'City not provided'})
    

@itinerary_bp.route('/itineraries', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_user_itineraries():
    print("GET /itineraries route accessed")  # Debugging statement
    user_id = session.get("user_id")
    print("User ID retrieved from session:", user_id)

    if not user_id:
        error_message = "Unauthorized: User ID not found in session."
        print(error_message)
        return jsonify({"error": error_message}), 401

    print("Fetching itineraries for user:", user_id)
    itineraries = Itinerary.query.filter_by(user_id=user_id).all()

    # Print the fetched itineraries to the console
    for itinerary in itineraries:
        print("Itinerary:", itinerary.to_json())

    return jsonify({"itineraries": [itinerary.to_json() for itinerary in itineraries]}), 200




@itinerary_bp.route('/itineraries', methods=['POST'])
@cross_origin(supports_credentials=True)
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


@itinerary_bp.route('/itineraries/<int:itinerary_id>/items', methods=['POST'])
@cross_origin(supports_credentials=True)
def add_item_to_itinerary(itinerary_id):
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    itinerary = Itinerary.query.filter_by(id=itinerary_id, user_id=user_id).first()
    if not itinerary:
        return jsonify({"error": "Itinerary not found"}), 404

    data = request.get_json()
    item_name = data.get("name")
    photo_url = data.get("photo_url")

    if not item_name:
        return jsonify({"error": "Name is required"}), 400

    new_item = ItineraryPlace(name=item_name, photo_url=photo_url, itinerary_id=itinerary_id)
    db.session.add(new_item)
    db.session.commit()

    return jsonify({"message": "Item added successfully", "item": new_item.to_json()}), 201

