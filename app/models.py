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