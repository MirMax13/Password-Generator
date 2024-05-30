from flask import Flask
from markupsafe import escape
from flask import render_template
from flask import request
from flask import url_for

app = Flask(__name__)



@app.get("/")
def input():
    url_for('static', filename='style.css')
    url_for('static', filename='style2.css')
    url_for('static', filename='script.css')
    return render_template("input.ejs")

@app.get("/passwords")
def passwords():
    return "<p>Here are all the passwords: 1234, 5678, 9012</p>"

@app.post("/generate")
def generate():
    return "<p>Generating passwords...</p>"

@app.post("/save")
def save():
    file = request.files['file']
    file.save(f"uploads/{file.filename}")

@app.delete("/password/<int:password_id>")
def delete_password(password_id):
    return f"<p>Deleting password with id {escape(password_id)}...</p>"

@app.errorhandler(404)
def page_not_found(error):
    return render_template('input.ejs'), 404

