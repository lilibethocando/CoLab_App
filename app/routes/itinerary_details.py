from flask import Flask, request, jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from io import StringIO
import csv
from datetime import datetime
from app import db, app  
from app.models import User, Itinerary, ItineraryPlace, Note, Date

@app.route('/save/itinerary', methods=['POST','OPTIONS'])
@cross_origin(supports_credentials=True)
def save_itinerary():
    data = request.json
    try:
        new_itinerary = Itinerary(
            name=data['name'],
            country=data['country'],
            city=data['city'],
            user_id=data['user_id']
        )
        db.session.add(new_itinerary)
        db.session.commit()

        for item in data['items']:
            new_place = ItineraryPlace(
                name=item['name'],
                photo_url=item.get('photo_url', ''),
                itinerary_id=new_itinerary.id
            )
            db.session.add(new_place)
            db.session.commit()

            for note_content in item.get('notes', []):
                new_note = Note(
                    content=note_content,
                    place_id=new_place.id
                )
                db.session.add(new_note)

            for date_value in item.get('dates', []):
                new_date = Date(
                    date=datetime.strptime(date_value, '%Y-%m-%d').date(),
                    place_id=new_place.id
                )
                db.session.add(new_date)

            db.session.commit()

        return jsonify({'message': 'Itinerary saved successfully'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/itinerary/<int:itinerary_id>/share', methods=['GET','POST','OPTIONS'])
@cross_origin(supports_credentials=True)
def share_itinerary(itinerary_id):
    # Determine the base URL dynamically
    scheme = request.scheme
    host = request.host
    download_base_url = f"{scheme}://{host}"
    
    download_url = f"{download_base_url}/itinerary/{itinerary_id}/download"
    return jsonify({'download_url': download_url})

@app.route('/itinerary/<int:itinerary_id>/download', methods=['GET','POST','OPTIONS'])
@cross_origin(supports_credentials=True)
def download_itinerary(itinerary_id):
    itinerary = Itinerary.query.get(itinerary_id)
    if not itinerary:
        return jsonify({'error': 'Itinerary not found'}), 404

    output = StringIO()
    writer = csv.writer(output)

    # Write CSV header
    writer.writerow(['Place Name', 'Photo URL', 'Notes', 'Dates'])

    for item in itinerary.items:
        notes = ', '.join(note.content for note in item.notes)
        dates = ', '.join(date.date.strftime('%Y-%m-%d') for date in item.dates)
        writer.writerow([item.name, item.photo_url, notes, dates])

    output.seek(0)
    return send_file(output, mimetype='text/csv', as_attachment=True, download_name=f'{itinerary.name}.csv')



