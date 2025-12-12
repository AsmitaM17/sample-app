from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import bcrypt
import jwt

from models.admin_model import get_admin_by_username
from config import Config

auth_bp = Blueprint("auth", __name__, url_prefix="/admin")

@auth_bp.route("/login", methods=["POST"])
def admin_login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    admin = get_admin_by_username(username)
    if not admin:
        return jsonify({"message": "Invalid credentials"}), 401

    stored_hash = admin["password"].encode("utf-8")
    if not bcrypt.checkpw(password.encode("utf-8"), stored_hash):
        return jsonify({"message": "Invalid credentials"}), 401

    payload = {
        "admin_id": admin["id"],
        "username": admin["username"],
        "exp": datetime.utcnow() + timedelta(hours=4),
    }
    token = jwt.encode(payload, Config.JWT_SECRET, algorithm=Config.JWT_ALGORITHM)

    return jsonify({"token": token, "username": admin["username"]}), 200
