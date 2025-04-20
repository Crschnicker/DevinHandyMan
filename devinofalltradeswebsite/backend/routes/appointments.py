from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models import db
from models.appointment import Appointment
from models.service import Service, ServiceOption
from models.service_addon import ServiceAddon
from datetime import datetime
import json
import os
import uuid

appointment_routes = Blueprint('appointments', __name__, url_prefix='/appointments')

@appointment_routes.route('/', methods=['GET'])
@jwt_required()
def get_user_appointments():
    """Get all appointments for the current user"""
    current_user_id = get_jwt_identity()
    
    # Get query parameters for filtering
    status = request.args.get('status')
    
    # Base query
    query = Appointment.query.filter_by(user_id=current_user_id)
    
    # Apply filters if provided
    if status:
        query = query.filter_by(status=status)
    
    # Order by appointment date (descending)
    appointments = query.order_by(Appointment.appointment_date.desc()).all()
    
    return jsonify({
        'appointments': [appointment.to_dict() for appointment in appointments]
    }), 200


@appointment_routes.route('/<int:appointment_id>', methods=['GET'])
@jwt_required()
def get_appointment(appointment_id):
    """Get a specific appointment"""
    current_user_id = get_jwt_identity()
    
    appointment = Appointment.query.filter_by(
        id=appointment_id, 
        user_id=current_user_id
    ).first()
    
    if not appointment:
        return jsonify({'error': 'Appointment not found'}), 404
    
    return jsonify({
        'appointment': appointment.to_dict()
    }), 200


@appointment_routes.route('/', methods=['POST'])
@jwt_required()
def create_appointment():
    """Create a new appointment"""
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    # Validate required fields
    required_fields = [
        'service_id', 'service_option_id', 'appointment_date', 
        'appointment_time', 'address'
    ]
    
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Validate service and service option
    service = Service.query.get(data['service_id'])
    if not service:
        return jsonify({'error': 'Invalid service ID'}), 400
    
    service_option = ServiceOption.query.get(data['service_option_id'])
    if not service_option or service_option.service_id != service.id:
        return jsonify({'error': 'Invalid service option ID'}), 400
    
    # Parse date
    try:
        appointment_date = datetime.strptime(data['appointment_date'], '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
    
    # Calculate pricing based on service option and quantity
    quantity = data.get('quantity', 1)
    if service_option.per_unit:
        subtotal = service_option.price * quantity
        time_estimate = service_option.hours * quantity
    else:
        subtotal = service_option.price
        time_estimate = service_option.hours
    
    # Calculate addon pricing
    addons_total = 0
    selected_addons = []
    
    if 'addons' in data and data['addons']:
        for addon_id in data['addons']:
            addon = ServiceAddon.query.filter_by(
                service_id=service.id,
                addon_id=addon_id
            ).first()
            
            if addon:
                addons_total += addon.price
                selected_addons.append({
                    'id': addon.id,
                    'addon_id': addon.addon_id,
                    'name': addon.name,
                    'price': addon.price
                })
    
    # Total price
    total_price = subtotal + addons_total
    
    # Handle video upload if included
    video_url = None
    if 'video' in request.files:
        video_file = request.files['video']
        if video_file and video_file.filename:
            # Generate unique filename
            filename = str(uuid.uuid4()) + os.path.splitext(video_file.filename)[1]
            
            # Ensure uploads directory exists
            upload_dir = os.path.join('instance', 'uploads')
            os.makedirs(upload_dir, exist_ok=True)
            
            # Save file
            file_path = os.path.join(upload_dir, filename)
            video_file.save(file_path)
            
            # Store relative path
            video_url = f'/uploads/{filename}'
    
    # Create appointment
    appointment = Appointment(
        user_id=current_user_id,
        service_id=service.id,
        service_option_id=service_option.id,
        service_name=service.name,
        service_option_name=service_option.name,
        quantity=quantity,
        addons=json.dumps(selected_addons),
        address=data['address'],
        notes=data.get('notes', ''),
        appointment_date=appointment_date,
        appointment_time=data['appointment_time'],
        status='upcoming',
        subtotal=subtotal,
        addons_total=addons_total,
        total_price=total_price,
        time_estimate=time_estimate,
        video_url=video_url
    )
    
    # Save to database
    db.session.add(appointment)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    
    return jsonify({
        'message': 'Appointment created successfully',
        'appointment': appointment.to_dict()
    }), 201


@appointment_routes.route('/<int:appointment_id>', methods=['PUT'])
@jwt_required()
def update_appointment(appointment_id):
    """Update an existing appointment"""
    current_user_id = get_jwt_identity()
    
    appointment = Appointment.query.filter_by(
        id=appointment_id, 
        user_id=current_user_id
    ).first()
    
    if not appointment:
        return jsonify({'error': 'Appointment not found'}), 404
    
    # Only allow updates to upcoming appointments
    if appointment.status not in ['upcoming', 'change-requested']:
        return jsonify({'error': 'Cannot update completed or canceled appointments'}), 400
    
    data = request.get_json()
    
    # Update fields if provided
    if 'appointment_date' in data:
        try:
            appointment.appointment_date = datetime.strptime(data['appointment_date'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
    
    if 'appointment_time' in data:
        appointment.appointment_time = data['appointment_time']
    
    if 'address' in data:
        appointment.address = data['address']
    
    if 'notes' in data:
        appointment.notes = data['notes']
    
    # If status is being updated
    if 'status' in data and data['status'] in ['upcoming', 'completed', 'canceled', 'change-requested']:
        appointment.status = data['status']
    
    # Handle video upload if included
    if 'video' in request.files:
        video_file = request.files['video']
        if video_file and video_file.filename:
            # Remove old video if exists
            if appointment.video_url:
                old_file_path = os.path.join('instance', appointment.video_url.lstrip('/'))
                if os.path.exists(old_file_path):
                    os.remove(old_file_path)
            
            # Generate unique filename
            filename = str(uuid.uuid4()) + os.path.splitext(video_file.filename)[1]
            
            # Ensure uploads directory exists
            upload_dir = os.path.join('instance', 'uploads')
            os.makedirs(upload_dir, exist_ok=True)
            
            # Save file
            file_path = os.path.join(upload_dir, filename)
            video_file.save(file_path)
            
            # Store relative path
            appointment.video_url = f'/uploads/{filename}'
    
    # Save to database
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    
    return jsonify({
        'message': 'Appointment updated successfully',
        'appointment': appointment.to_dict()
    }), 200


@appointment_routes.route('/<int:appointment_id>', methods=['DELETE'])
@jwt_required()
def cancel_appointment(appointment_id):
    """Cancel an appointment"""
    current_user_id = get_jwt_identity()
    
    appointment = Appointment.query.filter_by(
        id=appointment_id, 
        user_id=current_user_id
    ).first()
    
    if not appointment:
        return jsonify({'error': 'Appointment not found'}), 404
    
    # Only allow cancellation of upcoming appointments
    if appointment.status != 'upcoming':
        return jsonify({'error': 'Can only cancel upcoming appointments'}), 400
    
    # Update status to canceled
    appointment.status = 'canceled'
    
    # Save to database
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    
    return jsonify({
        'message': 'Appointment canceled successfully'
    }), 200


@appointment_routes.route('/<int:appointment_id>/change-request', methods=['POST'])
@jwt_required()
def request_appointment_change(appointment_id):
    """Request a change to an appointment"""
    current_user_id = get_jwt_identity()
    
    appointment = Appointment.query.filter_by(
        id=appointment_id, 
        user_id=current_user_id
    ).first()
    
    if not appointment:
        return jsonify({'error': 'Appointment not found'}), 404
    
    # Only allow change requests for upcoming appointments
    if appointment.status != 'upcoming':
        return jsonify({'error': 'Can only request changes for upcoming appointments'}), 400
    
    data = request.get_json()
    
    # Update status to change-requested
    appointment.status = 'change-requested'
    
    # Add change request details to notes
    change_reason = data.get('change_reason', '')
    if change_reason:
        note_prefix = f"[CHANGE REQUEST {datetime.now().strftime('%Y-%m-%d %H:%M')}]: "
        if appointment.notes:
            appointment.notes = note_prefix + change_reason + "\n\n" + appointment.notes
        else:
            appointment.notes = note_prefix + change_reason
    
    # Save to database
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    
    return jsonify({
        'message': 'Change request submitted successfully',
        'appointment': appointment.to_dict()
    }), 200