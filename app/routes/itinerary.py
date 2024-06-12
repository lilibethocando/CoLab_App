from flask import session, jsonify, request, Blueprint, render_template, redirect, url_for, send_file
from flask_cors import CORS, cross_origin
from . import itinerary_bp
import requests
from app import db, app
from app.models import Itinerary, ItineraryPlace, Note, Date
from datetime import datetime
from io import StringIO, BytesIO
import csv

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
    

@itinerary_bp.route('/itineraries', methods=['POST'])
@app.route('/itineraries', methods=['POST'])
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
    

@itinerary_bp.route('/itineraries', methods=['GET'])
@app.route('/itineraries', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_user_itineraries():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    itineraries = Itinerary.query.filter_by(user_id=user_id).all()
    return jsonify({"itineraries": [itinerary.to_json() for itinerary in itineraries]}), 200



@itinerary_bp.route('/itineraries/<int:itinerary_id>/items', methods=['POST'])
@app.route('/itineraries/<int:itinerary_id>/items', methods=['POST'])
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

#Route for getting an itinerary by ID:
@app.route('/itinerary/<int:id>')
def get_itinerary(id):
    itinerary = Itinerary.query.get(id)
    if itinerary:
        return jsonify(itinerary.to_json())
    else:
        return jsonify({'error': 'Itinerary not found'}), 404



@app.route('/save/itinerary', methods=['POST'])
@cross_origin(supports_credentials=True)
def save_itinerary():
    data = request.get_json()
    try:
        print("Received data:", data)  # Debug: Print the received data

        itinerary_id = data.get('id')
        itinerary = Itinerary.query.get(itinerary_id)
        
        if not itinerary:
            return jsonify({'error': 'Itinerary not found'}), 404

        for item in data.get('items', []):
            place_id = item.get('id')
            place = ItineraryPlace.query.get(place_id)

            if not place or place.itinerary_id != itinerary_id:
                continue

            # Debug: Print details of the place being processed
            print(f"Processing place with ID {place_id}")

            # Delete existing notes and dates for the place
            Note.query.filter_by(place_id=place_id).delete()
            Date.query.filter_by(place_id=place_id).delete()

            # Add new notes for the place
            if 'notes' in item:
                for note in item['notes']:
                    note_content = note.get('content')
                    new_note = Note(
                        content=note_content,
                        place_id=place_id
                    )
                    db.session.add(new_note)
                    print(f"Added note: {note_content}")  # Debug: Print added note

            # Add new dates for the place
            if 'dates' in item:
                for date_value in item['dates']:
                    new_date = Date(
                        date=datetime.strptime(date_value, '%Y-%m-%d').date(),
                        place_id=place_id
                    )
                    db.session.add(new_date)
                    print(f"Added date: {date_value}")  # Debug: Print added date

        print("Committing the session...")  # Debug: Before committing
        db.session.commit()
        print("Session committed successfully.")  # Debug: After committing
        return jsonify({'message': 'Itinerary updated successfully'}), 200

    except Exception as e:
        print("Error:", str(e))  # Debug: Print the error message
        db.session.rollback()
        return jsonify({'error': str(e)}), 500



@app.route('/itinerary/<int:itinerary_id>/download', methods=['GET','POST','OPTIONS'])
@cross_origin(supports_credentials=True)
def download_itinerary(itinerary_id):
    itinerary = Itinerary.query.get(itinerary_id)
    if not itinerary:
        return jsonify({'error': 'Itinerary not found'}), 404

    # Create a StringIO buffer to store CSV data
    output = StringIO()

    # Create a CSV writer
    writer = csv.writer(output)

    # Write CSV header
    writer.writerow(['Place Name', 'Photo URL', 'Notes', 'Dates'])

    # Write itinerary data to CSV
    for item in itinerary.items:
        name = str(item.name)
        photo_url = str(item.photo_url)

        # Join notes and dates into strings before writing
        notes = ', '.join(str(note.content) for note in item.notes) if item.notes else ''
        dates = ', '.join(date.date.strftime('%Y-%m-%d') for date in item.dates) if item.dates else ''

        writer.writerow([name, photo_url, notes, dates])

    # Reset buffer position to start of the buffer
    output.seek(0)

    # Send the CSV file to the user as an attachment
    return send_file(BytesIO(output.getvalue().encode()), mimetype='text/csv', as_attachment=True, download_name=f'{itinerary.name}.csv')



@app.route('/itinerary/<int:itinerary_id>/share', methods=['GET'])
@cross_origin(supports_credentials=True)
def share_itinerary(itinerary_id):
    scheme = request.scheme
    host = request.host
    download_base_url = f"{scheme}://{host}"
    download_url = f"{download_base_url}/itinerary/{itinerary_id}/download"
    return jsonify({'download_url': download_url})