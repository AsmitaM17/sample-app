from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.student_routes import student_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(student_bp)

if __name__ == "__main__":
    app.run(debug=True)
