
from flask import Flask
from server_python.routes import router

app = Flask(__name__, template_folder='../templates', static_folder='../static')
app.register_blueprint(router)

# Error handling
@app.errorhandler(500)
def server_error(e):
    print(e)
    return 'Something went wrong!', 500

if __name__ == "__main__":
    app.run(debug=True)