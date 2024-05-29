from flask import request, jsonify, session, redirect, url_for
from functools import wraps
from app import app, db, bcrypt
from app.models import User

@app.route('/users')
def users():
    pass


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"Error": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first() is not None:
        return jsonify({"error": "User already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({"message": "User created successfully", "new_user": {"id": new_user.id, "email": new_user.email}}), 201


@app.route('/signin', methods=["POST"])
def signin():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"Error": "User does not exist, please sign up!"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"Error": "Unauthorized"}), 401
    
    session["user_id"] = user.id

    return jsonify({"message": "You have successfully logged in!", "user": {"id": user.id, "email": user.email}}), 200


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kargs):
        if "user_id" not in session:
            return jsonify({"Error": "Unauthorized, please log in."}), 401
        return f(*args, **kargs)
    return decorated_function
    

@app.route('/protected', methods=["GET"])
@login_required
def protected():
    return jsonify({"message": "This is a protected route accessible only to logged-in users."})


@app.route("/current_user")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 


@app.route("/signout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"
