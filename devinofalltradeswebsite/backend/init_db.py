# backend/init_db.py
import os
import sys
import traceback

# Add the backend directory to Python's module search path
# And the project root directory to find the 'instance' folder correctly
backend_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(backend_dir) # Go one level up from backend

if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)
# No need to add project_root to sys.path typically, Flask handles instance path

# Import necessary components AFTER adjusting path
try:
    from app import create_app # Import the factory function
    from models import db      # Import db (ensure it's defined in models/__init__.py or similar)
    from utils.db_utils import init_sample_data
except ImportError as e:
    print(f"Error importing modules: {e}")
    print("Ensure models/__init__.py defines or imports 'db'.")
    print("Current sys.path:", sys.path)
    sys.exit(1)

def initialize_database():
    """Initialize database with tables and sample data using app factory"""
    print("Starting database initialization...")
    # Create a new app instance using the factory
    # This ensures instance_path and config are properly set for this script run
    app = create_app()

    with app.app_context():
        print(f"Using database URI: {app.config['SQLALCHEMY_DATABASE_URI']}")
        print(f"Instance path: {app.instance_path}")

        # Ensure instance path exists (create_app should do this, but double-check)
        if not os.path.exists(app.instance_path):
             print(f"Warning: Instance path {app.instance_path} does not exist. Attempting creation...")
             try:
                 os.makedirs(app.instance_path, exist_ok=True)
                 print("Instance path created.")
             except OSError as e:
                 print(f"Error creating instance path: {e}")
                 # Decide if you want to exit or proceed cautiously
                 # sys.exit(1)


        try:
            print("Dropping existing tables (if any)...") # Optional: for a clean start
            db.drop_all() # Be careful with this in production!
            print("Creating database tables...")
            db.create_all()
            print("Tables created successfully.")

            print("Adding sample data...")
            init_sample_data() # Make sure this function uses db.session correctly
            print("Sample data added.")

            print("Database initialization complete!")

        except Exception as e:
            print("\n !!! An error occurred during database initialization !!!")
            print(f"Error Type: {type(e).__name__}")
            print(f"Error Details: {e}")
            print("Traceback:")
            traceback.print_exc()
            print("----------------------------------------------------\n")


if __name__ == '__main__':
    initialize_database()