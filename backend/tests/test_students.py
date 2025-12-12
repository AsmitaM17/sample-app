import pytest
from app import app
import json

@pytest.fixture
def client():
    """Create a test client"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture
def auth_token(client):
    """Get JWT token for authenticated requests"""
    payload = {
        "username": "admin1",
        "password": "yourpassword"  # actual password
    }
    response = client.post(
        '/admin/login',
        data=json.dumps(payload),
        content_type='application/json'
    )
    data = json.loads(response.data)
    return data["token"]

def test_get_all_students(client):
    """Test GET /students returns list"""
    response = client.get('/students')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)

def test_search_students_by_name(client):
    """Test public search by name"""
    response = client.get('/search?name=Rahul')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)

def test_search_students_by_stream(client):
    """Test public search by stream"""
    response = client.get('/search?stream=Computer')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)

def test_create_student(client):
    """Test POST /students creates new student"""
    new_student = {
        "name": "Test Student",
        "stream": "Computer Science",
        "age": 20,
        "gender": "Male",
        "college": "Test College",
        "semester": 4
    }
    
    response = client.post(
        '/students',
        data=json.dumps(new_student),
        content_type='application/json'
    )
    
    assert response.status_code == 201
    data = json.loads(response.data)
    assert "id" in data

def test_create_student_missing_field(client):
    """Test POST /students fails with missing required field"""
    incomplete_student = {
        "name": "Test Student",
        "age": 20
        # missing stream, gender, college, semester
    }
    
    response = client.post(
        '/students',
        data=json.dumps(incomplete_student),
        content_type='application/json'
    )
    
    assert response.status_code == 400

def test_get_student_by_id(client):
    """Test GET /students/<id> returns specific student"""
    response = client.get('/students/1')
    
    # Assumes student with id=1 exists from seed.sql
    assert response.status_code in [200, 404]
    if response.status_code == 200:
        data = json.loads(response.data)
        assert "id" in data
        assert "name" in data

def test_update_student(client):
    """Test PUT /students/<id> updates student"""
    update_data = {
        "semester": 5
    }
    
    response = client.put(
        '/students/1',
        data=json.dumps(update_data),
        content_type='application/json'
    )
    
    assert response.status_code in [200, 404]

def test_delete_nonexistent_student(client):
    """Test DELETE /students/<id> fails for non-existent ID"""
    response = client.delete('/students/99999')
    
    assert response.status_code == 404
