import pytest
from app import app
import json

@pytest.fixture
def client():
    """Create a test client for the Flask app"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_login_success(client):
    """Test successful admin login"""
    # Arrange: prepare test data
    payload = {
        "username": "admin1",
        "password": "yourpassword"  # use actual password from create_admin.py
    }
    
    # Act: send POST request to /admin/login
    response = client.post(
        '/admin/login',
        data=json.dumps(payload),
        content_type='application/json'
    )
    
    # Assert: check response
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "token" in data
    assert data["username"] == "admin1"

def test_login_missing_username(client):
    """Test login fails when username is missing"""
    payload = {"password": "test123"}
    
    response = client.post(
        '/admin/login',
        data=json.dumps(payload),
        content_type='application/json'
    )
    
    assert response.status_code == 400
    data = json.loads(response.data)
    assert "required" in data["message"].lower()

def test_login_wrong_password(client):
    """Test login fails with incorrect password"""
    payload = {
        "username": "admin1",
        "password": "wrongpassword"
    }
    
    response = client.post(
        '/admin/login',
        data=json.dumps(payload),
        content_type='application/json'
    )
    
    assert response.status_code == 401
    data = json.loads(response.data)
    assert "invalid" in data["message"].lower()

def test_login_nonexistent_user(client):
    """Test login fails for non-existent username"""
    payload = {
        "username": "nonexistent",
        "password": "password123"
    }
    
    response = client.post(
        '/admin/login',
        data=json.dumps(payload),
        content_type='application/json'
    )
    
    assert response.status_code == 401
