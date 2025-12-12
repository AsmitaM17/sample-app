from flask import request, jsonify
from functools import wraps
import os
import jwt

JWT_SECRET = os.getenv("JWT_SECRET", "dev_secret_key")
JWT_ALGO = "HS256"

def jwt_required(f):
    """Decorator to protect routes - requires valid JWT token"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Get token from Authorization header
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return jsonify({"message": "Authorization header missing"}), 401
        
        # Expected format: "Bearer <token>"
        parts = auth_header.split()
        
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return jsonify({"message": "Invalid authorization header format"}), 401
        
        token = parts[1]
        
        try:
            # Verify and decode token
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
            # Attach admin info to request for use in route
            request.admin_id = payload["admin_id"]
            request.admin_username = payload["username"]
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401
        
        # Token is valid, proceed to the route
        return f(*args, **kwargs)
    
    return decorated_function
