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
    items = db.relationship('ItineraryPlace', backref='itinerary', cascade='all, delete-orphan', lazy=True)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "country": self.country,
            "city": self.city,
            "user_id": self.user_id,
            "created_at": self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'items': [item.to_json() for item in self.items]
        }


class ItineraryPlace(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    photo_url = db.Column(db.Text)
    itinerary_id = db.Column(db.Integer, db.ForeignKey('itinerary.id', ondelete='CASCADE'), nullable=False)
    notes = db.relationship('Note', backref='place', cascade='all, delete-orphan', lazy=True)
    dates = db.relationship('Date', backref='place', cascade='all, delete-orphan', lazy=True)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'photo_url': self.photo_url,
            'notes': [note.to_json() for note in self.notes],
            'dates': [date.to_json() for date in self.dates]
        }


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    place_id = db.Column(db.Integer, db.ForeignKey('itinerary_place.id', ondelete='CASCADE'), nullable=True)

    def to_json(self):
        return {
            'id': self.id,
            'content': self.content
        }


class Date(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    place_id = db.Column(db.Integer, db.ForeignKey('itinerary_place.id', ondelete='CASCADE'), nullable=True)

    def to_json(self):
        return {
            'id': self.id,
            'date': self.date.strftime('%Y-%m-%d')
        }
