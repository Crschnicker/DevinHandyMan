from flask import jsonify
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from models.user import User

def admin_required():
    """
    Decorator for routes that require admin access
    Note: This is placeholder for future admin functionality
    """
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            current_user_id = get_jwt_identity()
            current_user = User.query.get(current_user_id)
            
            # Check if user exists and has admin role
            # For now, we assume there's no admin role
            # This can be expanded in the future
            if not current_user:
                return jsonify({"error": "User not found"}), 404
            
            # Admin check would go here
            # if not current_user.is_admin:
            #     return jsonify({"error": "Admin privileges required"}), 403
            
            return fn(*args, **kwargs)
        return decorator
    return wrapper


def get_current_user_from_token():
    """
    Helper function to get the current user from JWT token
    Returns User object if found, None otherwise
    """
    try:
        verify_jwt_in_request()
        current_user_id = get_jwt_identity()
        return User.query.get(current_user_id)
    except Exception:
        return None


def is_valid_password(password):
    """
    Validate password strength
    - Minimum 8 characters
    - Contains at least one uppercase letter (optional)
    - Contains at least one number (optional)
    - Contains at least one special character (optional)
    """
    if not password or len(password) < 8:
        return False
    
    # For now, just check length - can add more checks later
    return True