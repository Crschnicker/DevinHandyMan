from flask import Blueprint, jsonify
from models.service import Service, ServiceOption
from models.service_addon import ServiceAddon

service_routes = Blueprint('services', __name__, url_prefix='/services')

@service_routes.route('/', methods=['GET'])
def get_all_services():
    """Get all available services"""
    services = Service.query.all()
    
    return jsonify({
        'services': [service.to_dict() for service in services]
    }), 200


@service_routes.route('/<int:service_id>', methods=['GET'])
def get_service(service_id):
    """Get a specific service by ID"""
    service = Service.query.get(service_id)
    
    if not service:
        return jsonify({'error': 'Service not found'}), 404
    
    return jsonify({
        'service': service.to_dict()
    }), 200


@service_routes.route('/slug/<string:slug>', methods=['GET'])
def get_service_by_slug(slug):
    """Get a specific service by slug"""
    service = Service.query.filter_by(slug=slug).first()
    
    if not service:
        return jsonify({'error': 'Service not found'}), 404
    
    return jsonify({
        'service': service.to_dict()
    }), 200


@service_routes.route('/<int:service_id>/options', methods=['GET'])
def get_service_options(service_id):
    """Get all options for a specific service"""
    service = Service.query.get(service_id)
    
    if not service:
        return jsonify({'error': 'Service not found'}), 404
    
    options = ServiceOption.query.filter_by(service_id=service_id).all()
    
    return jsonify({
        'options': [option.to_dict() for option in options]
    }), 200


@service_routes.route('/<int:service_id>/addons', methods=['GET'])
def get_service_addons(service_id):
    """Get all addons for a specific service"""
    service = Service.query.get(service_id)
    
    if not service:
        return jsonify({'error': 'Service not found'}), 404
    
    addons = ServiceAddon.query.filter_by(service_id=service_id).all()
    
    return jsonify({
        'addons': [addon.to_dict() for addon in addons]
    }), 200


@service_routes.route('/<int:service_id>/full', methods=['GET'])
def get_service_full(service_id):
    """Get a service with all its options and addons"""
    service = Service.query.get(service_id)
    
    if not service:
        return jsonify({'error': 'Service not found'}), 404
    
    options = ServiceOption.query.filter_by(service_id=service_id).all()
    addons = ServiceAddon.query.filter_by(service_id=service_id).all()
    
    service_data = service.to_dict()
    service_data['options'] = [option.to_dict() for option in options]
    service_data['addons'] = [addon.to_dict() for addon in addons]
    
    return jsonify({
        'service': service_data
    }), 200