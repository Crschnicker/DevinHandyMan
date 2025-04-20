from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

# Initialize SQLAlchemy
db = SQLAlchemy()

# Initialize JWTManager
jwt = JWTManager()

def init_db(app):
    """Initialize the database with the Flask app"""
    db.init_app(app)
    jwt.init_app(app)
    
    # Create tables
    with app.app_context():
        # Import models here to avoid circular imports
        from models.user import User
        from models.appointment import Appointment
        from models.service import Service, ServiceOption
        from models.service_addon import ServiceAddon
        
        db.create_all()