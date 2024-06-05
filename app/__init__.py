from flask import Flask, send_from_directory, jsonify, request, Blueprint
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_session import Session
from config import Config
import os


app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app, resources={r"/*": {"origins": ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5000', 'http://0.0.0.0:5000']}}, supports_credentials=True)

# CORS(app, resources={r"/*": {"origins": "*"}})


# CORS(app, supports_credentials=True)

itinerary_bp = Blueprint('itinerary', __name__)

bcrypt = Bcrypt(app)

app.config.from_object(Config)

server_session = Session(app)

app.secret_key = os.environ.get('SECRET_KEY')

db = SQLAlchemy(app)

migrate = Migrate(app, db)

app.register_blueprint(itinerary_bp)

@app.route('/')
def index():
    return app.send_static_file('index.html')


from . import models

from app.routes import home, auth, itinerary

@app.before_request
def before_request():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request received'})
        response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
        response.headers.add('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')