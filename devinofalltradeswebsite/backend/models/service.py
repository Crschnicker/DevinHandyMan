from backend.models import db

class Service(db.Model):
    """Service model for the different services offered"""
    
    __tablename__ = 'services'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    base_price = db.Column(db.Float, nullable=False)
    icon = db.Column(db.String(50), nullable=True)
    pricing_description = db.Column(db.String(200), nullable=True)
    option_label = db.Column(db.String(100), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    
    # Relationships
    options = db.relationship('ServiceOption', backref='service', lazy=True, cascade='all, delete-orphan')
    addons = db.relationship('ServiceAddon', backref='service', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convert service to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'description': self.description,
            'base_price': self.base_price,
            'icon': self.icon,
            'pricing_description': self.pricing_description,
            'option_label': self.option_label,
            'image_url': self.image_url
        }
    
    def __repr__(self):
        return f'<Service {self.name}>'


class ServiceOption(db.Model):
    """Service options for each service type"""
    
    __tablename__ = 'service_options'
    
    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    multiplier = db.Column(db.Float, default=1.0)
    hours = db.Column(db.Float, nullable=False, default=1.0)
    per_unit = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        """Convert service option to dictionary"""
        return {
            'id': self.id,
            'service_id': self.service_id,
            'name': self.name,
            'price': self.price,
            'multiplier': self.multiplier,
            'hours': self.hours,
            'per_unit': self.per_unit
        }
    
    def __repr__(self):
        return f'<ServiceOption {self.name}>'