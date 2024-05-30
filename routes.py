from flask import Blueprint, render_template, request, url_for
from db import db
from password_generate_model import PasswordGenerateModel
from flask import jsonify
from password_generator import generate_password
from bson.objectid import ObjectId


router = Blueprint('router', __name__)

@router.get("/")
def input():
    url_for('static', filename='style.css')
    url_for('static', filename='style2.css')
    return render_template("input.ejs")

@router.get("/passwords")
def passwords():
    try:
        passwords_collection = db['passwords']
        passwords = [{'_id': str(password['_id']), 'password': password['password'], 'usage': password['usage']} for password in passwords_collection.find()]
        return jsonify(passwords)
    except Exception as e:
        return str(e)

@router.post("/generate")
def generate():
    try:
        data = request.json
        length = int(data.get('length', 10))
        letters = data.get('letters', None)
        if letters:
            options = PasswordGenerateModel(letters=letters, length=length)
        else:
            options = PasswordGenerateModel(
                include_latin_uppercase=data.get('includeLatinUppercase', False),
                include_latin_lowercase=data.get('includeLatinLowercase', False),
                include_cyrillic_uppercase=data.get('includeCyrillicUppercase', False),
                include_cyrillic_lowercase=data.get('includeCyrillicLowercase', False),
                include_numbers=data.get('includeNumbers', False),
                include_symbols=data.get('includeSymbols', False),
                length=length
            )
        password = generate_password(length, options)
        response = {
            'password': password,
            'message': 'Password successfully generated.'
        }
        return jsonify(response), 201
    except Exception as e:
        print(e)
        return 'Error generating password', 500


@router.post("/save")
def save():
    try:
        data = request.json
        password = data.get('password', None)
        usage = data.get('usage', 'Unknown')
        passwords_collection = db['passwords']
        passwords_collection.insert_one({'password': password, 'usage': usage})
        response = {
            'password': password,
            'usage': usage,
            'message': 'Password successfully saved.'
        }
        return jsonify(response), 201
    except Exception as e:
        print(e)
        return 'Error saving password to the database', 500

@router.delete("/password/<password_id>")
def delete_password(password_id):
    try:
        passwords_collection = db['passwords']
        passwords_collection.delete_one({'_id': ObjectId(password_id)})
        return 'Password successfully deleted.', 200
    except Exception as e:
        print(e)
        return 'Error deleting password', 500

@router.errorhandler(404)
def page_not_found(e):
    print(e)
    return render_template('input.ejs'), 404

