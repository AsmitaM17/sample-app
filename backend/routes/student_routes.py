from flask import Blueprint, request, jsonify
from models.student_model import (
    get_all_students,
    get_student_by_id,
    create_student,
    update_student,
    delete_student,
    search_students
)

student_bp = Blueprint("students", __name__)

# Public search - no auth required
@student_bp.route("/search", methods=["GET"])
def search():
    name = request.args.get("name", "")
    stream = request.args.get("stream", "")
    
    results = search_students(name, stream)
    return jsonify(results), 200

# Protected routes - add @jwt_required decorator later
@student_bp.route("/students", methods=["GET"])
def list_students():
    students = get_all_students()
    return jsonify(students), 200

@student_bp.route("/students/<int:id>", methods=["GET"])
def get_student(id):
    student = get_student_by_id(id)
    if not student:
        return jsonify({"message": "Student not found"}), 404
    return jsonify(student), 200

@student_bp.route("/students", methods=["POST"])
def add_student():
    data = request.get_json() or {}
    required = ["name", "stream", "age", "gender", "college", "semester"]
    
    for field in required:
        if field not in data:
            return jsonify({"message": f"{field} is required"}), 400
    
    student_id = create_student(data)
    return jsonify({"message": "Student created", "id": student_id}), 201

@student_bp.route("/students/<int:id>", methods=["PUT"])
def edit_student(id):
    data = request.get_json() or {}
    success = update_student(id, data)
    
    if not success:
        return jsonify({"message": "Student not found"}), 404
    return jsonify({"message": "Student updated"}), 200

@student_bp.route("/students/<int:id>", methods=["DELETE"])
def remove_student(id):
    success = delete_student(id)
    
    if not success:
        return jsonify({"message": "Student not found"}), 404
    return jsonify({"message": "Student deleted"}), 200
