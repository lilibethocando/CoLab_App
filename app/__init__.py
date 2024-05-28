from flask import Flask
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
import os


app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config.from_object(Config)

app.secret_key = os.environ.get('SECRET_KEY')

db = SQLAlchemy(app)

migrate = Migrate(app, db)

from . import models

from app.routes import home, auth

if __name__ == "__main__":
    app.run(debug=True)