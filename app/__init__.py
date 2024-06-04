from flask import Flask
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_session import Session
from app.config import Config
import os


app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)

app.config.from_object(Config)

server_session = Session(app)

app.secret_key = os.environ.get('SECRET_KEY')

db = SQLAlchemy(app)

migrate = Migrate(app, db)

@app.route('/')
@cross_origin()
def serve():
    return app.send_static_file('index.html')

from . import models

from app.routes import home, auth

if __name__ == "__main__":
    app.run(debug=True)