from email_validator import validate_email, EmailNotValidError
from datetime import datetime
import re

def validate_email_format(email):
    """
    Validate email format using email_validator library
    Returns a tuple (is_valid, message)
    """
    try:
        validation = validate_email(email)
        # Normalized email
        normalized_email = validation.email
        return True, normalized_email
    except EmailNotValidError as e:
        return False, str(e)


def validate_phone_format(phone):
    """
    Validate phone number format
    Allows formats like: (123) 456-7890, 123-456-7890, 1234567890
    Returns a tuple (is_valid, message)
    """
    # Strip all non-digits
    digits_only = re.sub(r'\D', '', phone)
    
    # Check if we have a valid number of digits (10-11)
    if len(digits_only) < 10 or len(digits_only) > 11:
        return False, "Phone number must have 10 digits (or 11 with country code)"
    
    # If it's 11 digits, the first digit should be 1 (US country code)
    if len(digits_only) == 11 and digits_only[0] != '1':
        return False, "If providing 11 digits, the first digit must be 1 (US country code)"
    
    return True, digits_only


def validate_date_format(date_str, format_str='%Y-%m-%d'):
    """
    Validate if a string is in the correct date format
    Returns a tuple (is_valid, datetime_object)
    """
    try:
        date_obj = datetime.strptime(date_str, format_str)
        return True, date_obj
    except ValueError:
        return False, f"Date must be in format: {format_str}"


def validate_time_format(time_str):
    """
    Validate if a string is in a valid time format (HH:MM AM/PM)
    Returns a tuple (is_valid, message)
    """
    # Check if it's a valid format like "9:00 AM", "10:30 PM"
    pattern = r'^(1[0-2]|0?[1-9]):([0-5][0-9])\s*(AM|PM|am|pm)$'
    match = re.match(pattern, time_str)
    
    if not match:
        return False, "Time must be in format: HH:MM AM/PM (e.g., 9:00 AM, 2:30 PM)"
    
    return True, time_str


def sanitize_input(text):
    """
    Basic input sanitization to prevent XSS
    Removes HTML tags and other dangerous characters
    """
    if not text:
        return ""
    
    # Remove HTML tags
    sanitized = re.sub(r'<[^>]*>', '', text)
    
    # Replace dangerous characters
    sanitized = sanitized.replace('&', '&amp;')
    sanitized = sanitized.replace('<', '&lt;')
    sanitized = sanitized.replace('>', '&gt;')
    sanitized = sanitized.replace('"', '&quot;')
    sanitized = sanitized.replace("'", '&#x27;')
    sanitized = sanitized.replace('/', '&#x2F;')
    
    return sanitized