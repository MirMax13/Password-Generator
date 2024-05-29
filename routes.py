from flask import Flask
from markupsafe import escape
from flask import render_template

app = Flask(__name__)

@app.get("/")
def input():
    return render_template("input.ejs")

@app.get("/passwords")
def passwords():
    return "<p>Here are all the passwords: 1234, 5678, 9012</p>"

@app.post("/generate")
def generate():
    return "<p>Generating passwords...</p>"

@app.post("/save")
def save():
    return "<p>Saving passwords...</p>"

@app.delete("/password/<int:password_id>")
def delete_password(password_id):
    return f"<p>Deleting password with id {escape(password_id)}...</p>"