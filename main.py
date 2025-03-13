from flask import Flask, render_template, request, redirect, flash
import csv
from dotenv import load_dotenv
import re
from flask_talisman import Talisman

app = Flask(__name__)

import os

load_dotenv()  # Load environment variables from .env file
SECRET_KEY = os.getenv('SECRET_KEY')
app.secret_key = os.getenv("SECRET_KEY", "default_secret_key")
MESSAGES_FILE = os.getenv('MESSAGES_FILE', 'messages.csv')
@app.route('/')
def home():
    return render_template('index.html')
@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        message = request.form.get('message', '').strip()

        # Validate inputs
        if not name or not email or not message:
            return "All fields are required", 400
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return "Invalid email address", 400

        # Store the message in the CSV file
        file_path = os.path.join(os.path.dirname(__file__), MESSAGES_FILE)
        with open(file_path, "a", newline='') as file:
            writer = csv.writer(file)
            writer.writerow([name, email, message])

        # Redirect with success indicator
        return redirect('/contact?success=1')

    return render_template('contact.html')

# Redirect back to the home page
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
