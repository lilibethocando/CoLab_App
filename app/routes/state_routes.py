# state_routes.py

from flask import Blueprint, request, jsonify
from app.models import State
from app import db

state_bp = Blueprint('state', __name__)

@state_bp.route('/states', methods=['GET'])
def get_states():
    states = State.query.all()
    return jsonify([state.to_dict() for state in states])

@state_bp.route('/states', methods=['POST'])
def create_state():
    state_name = request.json.get('name')
    if not state_name:
        return jsonify({"error": "State name is required"}), 400

    new_state = State(name=state_name)
    db.session.add(new_state)
    db.session.commit()

    return jsonify({"message": "State added successfully"}), 201
