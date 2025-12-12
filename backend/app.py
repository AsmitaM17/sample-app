from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.student_routes import student_bp
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# More explicit CORS configuration
CORS(app, 
     resources={r"/*": {
         "origins": "*",
         "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
         "allow_headers": ["Content-Type", "Authorization"]
     }})

app.register_blueprint(auth_bp)
app.register_blueprint(student_bp)

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5000)
