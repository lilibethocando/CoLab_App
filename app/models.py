from app import db
from flask import jsonify
from uuid import uuid4
from datetime import datetime, timezone, timedelta

def get_uuid():
    return uuid4().hex


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_json(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
    


class Itinerary(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    country = db.Column(db.String(100))
    city = db.Column(db.String(100))
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    items = db.relationship('ItineraryPlace', backref='itinerary', lazy=True) #items are places
    

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "country": self.country,
            "city": self.city,
            "user_id": self.user_id,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'items': [item.to_json() for item in self.items] #items are places
        }
            

#add more items if necessary
class ItineraryPlace(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    photo_url = db.Column(db.Text)  # Changed to TEXT to store longer URLs
    itinerary_id = db.Column(db.Integer, db.ForeignKey('itinerary.id'), nullable=False)


    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'photo_url': self.photo_url
        }