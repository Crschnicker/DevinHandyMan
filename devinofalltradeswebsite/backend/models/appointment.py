from datetime import datetime
from backend.models import db
import json

class Appointment(db.Model):
    """Appointment model for scheduled services"""
    
    __tablename__ = 'appointments'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    service_option_id = db.Column(db.Integer, db.ForeignKey('service_options.id'), nullable=False)
    
    # Appointment details
    service_name = db.Column(db.String(100), nullable=False)
    service_option_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    addons = db.Column(db.Text, nullable=True)  # JSON string of selected addons
    address = db.Column(db.String(200), nullable=False)
    notes = db.Column(db.Text, nullable=True)
    
    # Date and time
    appointment_date = db.Column(db.Date, nullable=False)
    appointment_time = db.Column(db.String(20), nullable=False)  # Time as a string (e.g., "9:00 AM")
    
    # Status and pricing
    status = db.Column(db.String(20), default='upcoming')  # upcoming, completed, canceled, change-requested
    subtotal = db.Column(db.Float, nullable=False)
    addons_total = db.Column(db.Float, default=0.0)
    total_price = db.Column(db.Float, nullable=False)
    time_estimate = db.Column(db.Float, nullable=False)  # In hours
    
    # Media
    video_url = db.Column(db.String(255), nullable=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    service = db.relationship('Service', backref='appointments')
    service_option = db.relationship('ServiceOption', backref='appointments')
    
    def get_addons_list(self):
        """Get addons as Python list"""
        if self.addons:
            return json.loads(self.addons)
        return []
    
    def set_addons_list(self, addons_list):
        """Set addons from Python list"""
        self.addons = json.dumps(addons_list)
    
    def to_dict(self):
        """Convert appointment to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'service_id': self.service_id,
            'service_option_id': self.service_option_id,
            'service_name': self.service_name,
            'service_option_name': self.service_option_name,
            'quantity': self.quantity,
            'addons': self.get_addons_list(),
            'address': self.address,
            'notes': self.notes,
            'appointment_date': self.appointment_date.isoformat() if self.appointment_date else None,
            'appointment_time': self.appointment_time,
            'status': self.status,
            'subtotal': self.subtotal,
            'addons_total': self.addons_total,
            'total_price': self.total_price,
            'time_estimate': self.time_estimate,
            'video_url': self.video_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Appointment {self.id}: {self.service_name} on {self.appointment_date}>'