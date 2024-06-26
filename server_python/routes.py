from flask import Blueprint, render_template, request, url_for,jsonify
from server_python.db import db
from server_python.password_generate_model import PasswordGenerateModel
from server_python.password_generator import generate_password
from bson.objectid import ObjectId


router = Blueprint('router', __name__)

@router.get("/")
def input():
    url_for('static', filename='../static/style.css')
    url_for('static', filename='../static/style2.css')
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
        usage = data.get('usage') if data.get('usage', None) else 'Unknown'
        if not password:
            return jsonify({'error': 'No password provided'}), 400
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
        return jsonify({'error': 'Error saving password to the database'}), 500

@router.post("/save-100-million")
def save_100_million():
    try:
        data = request.json
        length = int(data.get('length', 10))
        batch_size = 10000  
        total_passwords = 100000000
        passwords_collection = db['passwords']
        options = PasswordGenerateModel(
                include_latin_uppercase=True,
                include_latin_lowercase=True,
                include_cyrillic_uppercase=False,
                include_cyrillic_lowercase=False,
                include_numbers=True,
                include_symbols=True,
                length=length
            )
        for _ in range(total_passwords // batch_size):
            batch = []
            for _ in range(batch_size):
                password = generate_password(length, options)
                batch.append({"password": password,'usage': 'Unknown'})
            passwords_collection.insert_many(batch)

        return jsonify({'message': '100 million passwords successfully generated.'}), 201
    except Exception as e:
        return jsonify({'error': 'Error generating 100 million passwords', 'details': str(e)}), 500

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

