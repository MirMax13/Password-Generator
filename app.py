
from flask import Flask
from routes import router

app = Flask(__name__)
app.register_blueprint(router)

# Error handling
@app.errorhandler(500)
def server_error(e):
    print(e)
    return 'Something went wrong!', 500

if __name__ == "__main__":
    app.run(debug=True)