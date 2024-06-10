from flask import Blueprint, request, jsonify, render_template, redirect, url_for
from app.models import State
from app import db

state_bp = Blueprint('state', __name__)

@state_bp.route('/state_form', methods=['GET'])
def state_form():
    # Fetch all states from the database
    states = State.query.all()
    # Print all states
    for state in states:
        print(state.name)
    return render_template('state_form.html', states=states)


@state_bp.route('/submit_state', methods=['POST'])
def submit_state():
    state_name = request.form.get('state')
    if not state_name:
        return jsonify({"error": "State name is required"}), 400

    new_state = State(name=state_name)
    db.session.add(new_state)
    db.session.commit()

    # Redirect back to the state form page
    return redirect(url_for('state.state_form'))


