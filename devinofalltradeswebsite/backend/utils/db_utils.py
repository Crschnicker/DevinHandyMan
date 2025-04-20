from backend.models import db
from models.service import Service, ServiceOption
from models.service_addon import ServiceAddon

def init_sample_data():
    """Initialize the database with sample service data"""
    
    # Check if data already exists
    if Service.query.count() > 0:
        return
    
    # Define services with their options and addons
    services_data = [
        {
            'name': 'Painting',
            'slug': 'painting',
            'description': 'Fresh coats for interiors and exteriors',
            'base_price': 35.0,
            'icon': 'Paintbrush',
            'pricing_description': 'Per hour, plus materials. Includes wall preparation, taping, and cleanup.',
            'option_label': 'Square Footage',
            'image_url': '/images/img1.png',
            'options': [
                {
                    'name': 'Small Room (up to 150 sq ft)',
                    'price': 35.0,
                    'multiplier': 1.0,
                    'hours': 4.0,
                    'per_unit': False
                },
                {
                    'name': 'Medium Room (151-250 sq ft)',
                    'price': 52.5,
                    'multiplier': 1.5,
                    'hours': 6.0,
                    'per_unit': False
                },
                {
                    'name': 'Large Room (251-400 sq ft)',
                    'price': 70.0,
                    'multiplier': 2.0,
                    'hours': 8.0,
                    'per_unit': False
                },
                {
                    'name': 'Extra Large Room (400+ sq ft)',
                    'price': 87.5,
                    'multiplier': 2.5,
                    'hours': 10.0,
                    'per_unit': False
                }
            ],
            'addons': [
                {
                    'addon_id': 'prep',
                    'name': 'Heavy Prep Work (patching, sanding)',
                    'price': 75.0
                },
                {
                    'addon_id': 'ceiling',
                    'name': 'Ceiling Painting',
                    'price': 85.0
                },
                {
                    'addon_id': 'trim',
                    'name': 'Trim/Baseboards',
                    'price': 45.0
                }
            ]
        },
        {
            'name': 'Electrical',
            'slug': 'electrical',
            'description': 'Light fixture installs, fans, switches & more',
            'base_price': 65.0,
            'icon': 'BatteryCharging',
            'pricing_description': 'Per hour, plus parts. All work done by qualified professionals.',
            'option_label': 'Project Type',
            'image_url': '/images/img4.png',
            'options': [
                {
                    'name': 'Replace Light Fixture',
                    'price': 65.0,
                    'multiplier': 1.0,
                    'hours': 1.0,
                    'per_unit': False
                },
                {
                    'name': 'Install Ceiling Fan',
                    'price': 97.5,
                    'multiplier': 1.5,
                    'hours': 1.5,
                    'per_unit': False
                },
                {
                    'name': 'Replace Outlets/Switches',
                    'price': 48.75,
                    'multiplier': 0.75,
                    'hours': 0.75,
                    'per_unit': True
                },
                {
                    'name': 'Install Dimmer Switches',
                    'price': 65.0,
                    'multiplier': 1.0,
                    'hours': 1.0,
                    'per_unit': True
                }
            ],
            'addons': [
                {
                    'addon_id': 'highceiling',
                    'name': 'High Ceiling Access Required',
                    'price': 35.0
                },
                {
                    'addon_id': 'complex',
                    'name': 'Complex Wiring',
                    'price': 50.0
                }
            ]
        },
        {
            'name': 'General Repairs',
            'slug': 'repairs',
            'description': 'Fixes for what\'s broken, loose, or squeaky',
            'base_price': 45.0,
            'icon': 'Wrench',
            'pricing_description': 'Per hour, plus materials. Most common household repairs.',
            'option_label': 'Repair Type',
            'image_url': '/images/img6.png',
            'options': [
                {
                    'name': 'Door Repair/Adjustment',
                    'price': 45.0,
                    'multiplier': 1.0,
                    'hours': 1.0,
                    'per_unit': False
                },
                {
                    'name': 'Window Repair',
                    'price': 56.25,
                    'multiplier': 1.25,
                    'hours': 1.25,
                    'per_unit': False
                },
                {
                    'name': 'Cabinet Repair',
                    'price': 67.5,
                    'multiplier': 1.5,
                    'hours': 1.5,
                    'per_unit': False
                },
                {
                    'name': 'Shelf Installation',
                    'price': 45.0,
                    'multiplier': 1.0,
                    'hours': 1.0,
                    'per_unit': False
                }
            ],
            'addons': [
                {
                    'addon_id': 'materials',
                    'name': 'Materials Provided',
                    'price': 35.0
                },
                {
                    'addon_id': 'hardware',
                    'name': 'New Hardware',
                    'price': 25.0
                }
            ]
        },
        {
            'name': 'Drywall',
            'slug': 'drywall',
            'description': 'Smooth finishes for holes or water damage',
            'base_price': 55.0,
            'icon': 'Hammer',
            'pricing_description': 'Per hour, plus materials. Includes patching, taping, and mud work.',
            'option_label': 'Project Size',
            'image_url': '/images/img3.png',
            'options': [
                {
                    'name': 'Small Patch (up to 1 sq ft)',
                    'price': 41.25,
                    'multiplier': 0.75,
                    'hours': 0.75,
                    'per_unit': False
                },
                {
                    'name': 'Medium Patch (1-4 sq ft)',
                    'price': 82.5,
                    'multiplier': 1.5,
                    'hours': 1.5,
                    'per_unit': False
                },
                {
                    'name': 'Large Patch (4-10 sq ft)',
                    'price': 137.5,
                    'multiplier': 2.5,
                    'hours': 2.5,
                    'per_unit': False
                },
                {
                    'name': 'New Drywall Installation (per 8x4 sheet)',
                    'price': 165.0,
                    'multiplier': 3.0,
                    'hours': 3.0,
                    'per_unit': True
                }
            ],
            'addons': [
                {
                    'addon_id': 'texture',
                    'name': 'Texture Matching',
                    'price': 45.0
                },
                {
                    'addon_id': 'prime',
                    'name': 'Prime & Paint',
                    'price': 35.0
                }
            ]
        },
        {
            'name': 'Furniture Assembly',
            'slug': 'assembly',
            'description': 'From bookshelves to beds, we\'ll build it',
            'base_price': 40.0,
            'icon': 'Armchair',
            'pricing_description': 'Per hour. We assemble all types of furniture from any store.',
            'option_label': 'Item Complexity',
            'image_url': '/images/img5.png',
            'options': [
                {
                    'name': 'Simple Item (small shelf, side table)',
                    'price': 40.0,
                    'multiplier': 1.0,
                    'hours': 1.0,
                    'per_unit': False
                },
                {
                    'name': 'Medium Item (desk, dining table)',
                    'price': 80.0,
                    'multiplier': 2.0,
                    'hours': 2.0,
                    'per_unit': False
                },
                {
                    'name': 'Complex Item (large bookcase, bed frame)',
                    'price': 120.0,
                    'multiplier': 3.0,
                    'hours': 3.0,
                    'per_unit': False
                },
                {
                    'name': 'Very Complex Item (entertainment center, large wardrobes)',
                    'price': 160.0,
                    'multiplier': 4.0,
                    'hours': 4.0,
                    'per_unit': False
                }
            ],
            'addons': [
                {
                    'addon_id': 'disposal',
                    'name': 'Packaging Disposal',
                    'price': 15.0
                },
                {
                    'addon_id': 'wallmount',
                    'name': 'Wall Mounting/Securing',
                    'price': 35.0
                }
            ]
        },
        {
            'name': 'Caulking',
            'slug': 'caulking',
            'description': 'Clean seals for bathrooms, kitchens & windows',
            'base_price': 40.0,
            'icon': 'Droplets',
            'pricing_description': 'Per hour, plus materials. Waterproof sealing for bathrooms, kitchens, windows.',
            'option_label': 'Project Area',
            'image_url': '/images/img2.png',
            'options': [
                {
                    'name': 'Bathtub/Shower',
                    'price': 40.0,
                    'multiplier': 1.0,
                    'hours': 1.0,
                    'per_unit': False
                },
                {
                    'name': 'Kitchen Countertops',
                    'price': 40.0,
                    'multiplier': 1.0,
                    'hours': 1.0,
                    'per_unit': False
                },
                {
                    'name': 'Window Sealing (per window)',
                    'price': 20.0,
                    'multiplier': 0.5,
                    'hours': 0.5,
                    'per_unit': True
                },
                {
                    'name': 'Full Bathroom Recaulking',
                    'price': 80.0,
                    'multiplier': 2.0,
                    'hours': 2.0,
                    'per_unit': False
                }
            ],
            'addons': [
                {
                    'addon_id': 'removal',
                    'name': 'Old Caulk Removal',
                    'price': 25.0
                },
                {
                    'addon_id': 'mold',
                    'name': 'Mold Treatment',
                    'price': 30.0
                }
            ]
        },
        {
            'name': 'Smart Home Setup',
            'slug': 'smart-home',
            'description': 'Professional setup and configuration of smart home devices',
            'base_price': 75.0,
            'icon': 'Smartphone',
            'pricing_description': 'Per hour, plus parts. Setup, configuration, and personalized training.',
            'option_label': 'Project Type',
            'image_url': '/images/img7.png',
            'options': [
                {
                    'name': 'Smart Speaker/Display Setup',
                    'price': 75.0,
                    'multiplier': 1.0,
                    'hours': 1.0,
                    'per_unit': False
                },
                {
                    'name': 'Smart Lighting System',
                    'price': 112.5,
                    'multiplier': 1.5,
                    'hours': 1.5,
                    'per_unit': False
                },
                {
                    'name': 'Smart Thermostat Installation',
                    'price': 150.0,
                    'multiplier': 2.0,
                    'hours': 2.0,
                    'per_unit': False
                },
                {
                    'name': 'Complete Smart Home System',
                    'price': 300.0,
                    'multiplier': 4.0,
                    'hours': 4.0,
                    'per_unit': False
                }
            ],
            'addons': [
                {
                    'addon_id': 'networking',
                    'name': 'WiFi Network Optimization',
                    'price': 45.0
                },
                {
                    'addon_id': 'training',
                    'name': 'User Training Session',
                    'price': 40.0
                },
                {
                    'addon_id': 'integration',
                    'name': 'Multi-Device Integration',
                    'price': 60.0
                }
            ]
        }
    ]
    
    # Create and add services
    for service_data in services_data:
        options_data = service_data.pop('options')
        addons_data = service_data.pop('addons')
        
        service = Service(**service_data)
        db.session.add(service)
        db.session.flush()  # To get service.id
        
        # Create and add options
        for option_data in options_data:
            option_data['service_id'] = service.id
            option = ServiceOption(**option_data)
            db.session.add(option)
        
        # Create and add addons
        for addon_data in addons_data:
            addon_data['service_id'] = service.id
            addon = ServiceAddon(**addon_data)
            db.session.add(addon)
    
    # Commit all changes
    try:
        db.session.commit()
        print("Sample service data initialized successfully")
    except Exception as e:
        db.session.rollback()
        print(f"Error initializing sample data: {e}")


def reset_db():
    """Reset the database by dropping and recreating all tables"""
    db.drop_all()
    db.create_all()
    print("Database reset successful")


def create_db_command(app):
    """Add db-init and db-reset commands to Flask CLI"""
    @app.cli.command('db-init')
    def init_db_command():
        """Initialize the database with sample data"""
        with app.app_context():
            init_sample_data()
    
    @app.cli.command('db-reset')
    def reset_db_command():
        """Reset the database"""
        with app.app_context():
            reset_db()
            init_sample_data()