from backend.models import db

class ServiceAddon(db.Model):
    """Service addon model for additional service options"""
    
    __tablename__ = 'service_addons'
    
    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    addon_id = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    
    def to_dict(self):
        """Convert service addon to dictionary"""
        return {
            'id': self.id,
            'service_id': self.service_id,
            'addon_id': self.addon_id,
            'name': self.name,
            'price': self.price
        }
    
    def __repr__(self):
        return f'<ServiceAddon {self.name}>'