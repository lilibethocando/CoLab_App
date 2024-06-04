import os
from flask import render_template
from app import app

# # Get the filename of the generated JavaScript bundle
# js_bundle_dir = os.path.abspath(os.path.dirname(__file__)) + '/static/assets'
# js_bundle_filename = os.listdir(js_bundle_dir)[0]  # Assuming there's only one file in the directory

# # Extract the hash from the filename (assuming the format is "index-{hash}.js")
# bundle_hash = js_bundle_filename.split('-')[1]

@app.route('/')
def home():
    return render_template('index.html')