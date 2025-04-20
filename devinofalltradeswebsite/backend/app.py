import os
import sys
from flask import Flask, jsonify
from flask_cors import CORS

# Add the backend directory to Python's module search path
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Now we can import our modules
from config import get_config
from models import db, jwt, init_db
from routes import init_routes
from utils.db_utils import create_db_command

def create_app(config_name=None):
    """Create and configure the Flask application"""
    # Create Flask app
    app = Flask(__name__, instance_relative_config=True)
    
    # Ensure instance folder exists
    try:
        os.makedirs(app.instance_path, exist_ok=True)
        os.makedirs(os.path.join(app.instance_path, 'uploads'), exist_ok=True)
    except OSError:
        pass
    
    # Load configuration
    config_obj = get_config()
    app.config.from_object(config_obj)
    
    # Setup CORS
    CORS(app, resources={r"/api/*": {"origins": app.config['CORS_ORIGINS']}})
    
    # Initialize database
    init_db(app)
    
    # Initialize routes
    init_routes(app)
    
    # Add database commands
    create_db_command(app)
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def server_error(error):
        return jsonify({'error': 'Server error'}), 500
    
    # Simple health check route
    @app.route('/health')
    def health_check():
        return jsonify({'status': 'ok'}), 200
    
    return app

# Create app instance
app = create_app()

if __name__ == '__main__':
    print("Starting DevinofallTrades API server...")
    print("Debug mode:", app.debug)
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))