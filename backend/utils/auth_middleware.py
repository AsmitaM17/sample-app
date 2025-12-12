from flask import request, jsonify
from functools import wraps
import jwt
from config import Config

def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return jsonify({"message": "Authorization header missing"}), 401
        
        parts = auth_header.split()
        
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return jsonify({"message": "Invalid authorization header format"}), 401
        
        token = parts[1]
        
        try:
            payload = jwt.decode(token, Config.JWT_SECRET, algorithms=[Config.JWT_ALGORITHM])
            request.admin_id = payload["admin_id"]
            request.admin_username = payload["username"]
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401
        
        return f(*args, **kwargs)
    
    return decorated_function
