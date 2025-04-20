# DevinofallTrades Backend API

A Flask-based backend API for the DevinofallTrades handyman services website. This API provides authentication, appointment booking, and service management functionality.

## Features

- User authentication (register, login, token refresh)
- Appointment booking and management
- Service information and pricing
- File uploads for project videos
- SQLite database for easy development

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (recommended)

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/devinofalltradesapi.git
   cd devinofalltradesapi
   ```

2. Create and activate a virtual environment:
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate

   # On macOS/Linux
   python -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Initialize the database with sample data:
   ```bash
   flask db-init
   ```

5. Run the development server:
   ```bash
   flask run
   ```

The API will be available at `http://localhost:5000`.

## Environment Variables

You can customize the application behavior with the following environment variables:

- `FLASK_APP`: Set to `app.py` (default)
- `FLASK_ENV`: Set to `development` (enables debug mode) or `production`
- `FLASK_CONFIG`: Set to `development`, `testing`, or `production` (default: `development`)
- `SECRET_KEY`: Secret key for session management
- `JWT_SECRET_KEY`: Secret key for JWT token generation
- `DATABASE_URL`: Database connection string (default: SQLite)

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Request body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123", "phone": "123-456-7890" }`
  - Response: User data and JWT tokens

- `POST /api/auth/login` - Login a user
  - Request body: `{ "email": "john@example.com", "password": "password123" }`
  - Response: User data and JWT tokens

- `POST /api/auth/refresh` - Refresh access token
  - Requires: Refresh token in Authorization header
  - Response: New access token

- `GET /api/auth/user` - Get current user info
  - Requires: Access token in Authorization header
  - Response: User data

- `PUT /api/auth/user` - Update user info
  - Requires: Access token in Authorization header
  - Request body: User fields to update
  - Response: Updated user data

### Appointments

- `GET /api/appointments` - Get user's appointments
  - Requires: Access token in Authorization header
  - Optional query params: `status` (upcoming, completed, canceled, change-requested)
  - Response: List of appointments

- `POST /api/appointments` - Create new appointment
  - Requires: Access token in Authorization header
  - Request body: Appointment details
  - Response: Created appointment

- `GET /api/appointments/<id>` - Get appointment by ID
  - Requires: Access token in Authorization header
  - Response: Appointment details

- `PUT /api/appointments/<id>` - Update appointment
  - Requires: Access token in Authorization header
  - Request body: Fields to update
  - Response: Updated appointment

- `DELETE /api/appointments/<id>` - Cancel appointment
  - Requires: Access token in Authorization header
  - Response: Success message

- `POST /api/appointments/<id>/change-request` - Request appointment change
  - Requires: Access token in Authorization header
  - Request body: `{ "change_reason": "Need to reschedule" }`
  - Response: Updated appointment

### Services

- `GET /api/services` - Get all available services
  - Response: List of services

- `GET /api/services/<id>` - Get service by ID
  - Response: Service details

- `GET /api/services/slug/<slug>` - Get service by slug
  - Response: Service details

- `GET /api/services/<id>/options` - Get service options
  - Response: List of options for specified service

- `GET /api/services/<id>/addons` - Get service addons
  - Response: List of addons for specified service

- `GET /api/services/<id>/full` - Get service with all options and addons
  - Response: Complete service data

## Database Management

- Initialize database with sample data:
  ```bash
  flask db-init
  ```

- Reset database and reinitialize with sample data:
  ```bash
  flask db-reset
  ```

## Connecting with Frontend

To connect this backend with the React frontend:

1. Make sure the backend is running
2. Configure the frontend to point to the backend API URL
3. Update CORS settings in `config.py` to allow your frontend domain

## Testing

Run tests with:
```bash
pytest
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.