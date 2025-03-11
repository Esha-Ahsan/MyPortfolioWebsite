from flask import Flask, render_template, request, redirect, flash
import csv

app = Flask(__name__)
SECRET_KEY='~190bvyry7rnisdd3254erf54'
import os
app.secret_key = os.getenv("SECRET_KEY", "default_secret_key")


@app.route('/')
def home():
    return render_template('index.html')
@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        # Store the message in a CSV file
        with open("messages.csv", "a", newline='') as file:
            writer = csv.writer(file)
            writer.writerow([name, email, message])

        # Redirect with success indicator
        return redirect('/contact?success=1')

    return render_template('contact.html')

# Redirect back to the home page
if __name__ == "__main__":
    app.run(debug=True)
