
from flask import Flask, send_from_directory
from routes import router

app = Flask(__name__)
app.register_blueprint(router)

@app.route('/static/<path:filename>')
def static_file(filename):
    return send_from_directory('./static', filename)

# Error handling
@app.errorhandler(500)
def server_error(e):
    print(e)
    return 'Something went wrong!', 500

if __name__ == "__main__":
    app.run(debug=True)