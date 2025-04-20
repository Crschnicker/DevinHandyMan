from flask import Blueprint

# Create Blueprint for API routes
api_bp = Blueprint('api', __name__, url_prefix='/api')

def init_routes(app):
    """Initialize all routes with the Flask app"""
    # Import routes
    from routes.auth import auth_routes
    from routes.appointments import appointment_routes
    from routes.services import service_routes
    
    # Register routes with blueprint
    api_bp.register_blueprint(auth_routes)
    api_bp.register_blueprint(appointment_routes)
    api_bp.register_blueprint(service_routes)
    
    # Register blueprint with app
    app.register_blueprint(api_bp)