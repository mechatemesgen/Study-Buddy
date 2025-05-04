# Backend Integration Guide

This guide explains how to integrate the Study Buddy frontend (React+Vite) with the Django backend.

## Configuration

1. **Create a `.env` file in the frontend root directory with the following content:**

```
# API Configuration
VITE_API_URL=http://localhost:8000

# Environment
VITE_NODE_ENV=development

# Optional: Enable/disable mock data (for development without backend)
VITE_USE_MOCKS=false
```

2. **Ensure CORS is properly configured in your Django backend:**

Make sure your Django backend has the `django-cors-headers` package installed and properly configured to allow requests from your frontend application.

In your Django `settings.py`:

```python
INSTALLED_APPS = [
    # ...
    'corsheaders',
    # ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be placed before CommonMiddleware
    # ...other middleware...
]

# During development, you can use:
CORS_ALLOW_ALL_ORIGINS = True  # Only in development!

# For production, specify allowed origins:
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",  # Vite dev server default port
#     "https://yourdomain.com",
# ]

# Allow credentials (cookies, authorization headers)
CORS_ALLOW_CREDENTIALS = True
```

## Authentication

The frontend is set up to use JWT authentication with the Django backend:

1. The login function sends credentials to `/api/auth/token/` to get JWT tokens
2. Access token is stored in localStorage and included in requests via Authorization header
3. Refresh token is used to get new access tokens when they expire
4. Logout function calls `/api/auth/logout/` to invalidate tokens

## API Services

All API services have been updated to connect to the Django backend:

- `auth.js` - User authentication, registration and profile management
- `groups.js` - Study group management and chat 
- `sessions.js` - Study session scheduling and attendance
- `resources.js` - Resource uploads, downloads and management
- `chat.js` - Real-time chat functionality

## WebSockets

For real-time chat functionality, the frontend attempts to connect to a WebSocket endpoint:

```javascript
const baseURL = axiosInstance.defaults.baseURL.replace(/^http/, 'ws');
const ws = new WebSocket(`${baseURL}/ws/chat/${groupId}/?token=${token}`);
```

Ensure your Django backend has WebSocket support (using Django Channels) configured to handle these connections.

## CSRF Protection

If your Django backend uses CSRF protection, you'll need to configure the frontend to handle CSRF tokens:

1. Ensure your backend includes the CSRF token in the response cookies
2. Update `axiosInstance.js` to include the CSRF token in requests

```javascript
// Add this to axiosInstance.js
axiosInstance.defaults.xsrfCookieName = 'csrftoken';
axiosInstance.defaults.xsrfHeaderName = 'X-CSRFToken';
```

## Testing the Integration

1. Start your Django backend:
   ```bash
   # Navigate to your Django project
   cd /path/to/django/project
   python manage.py runserver
   ```

2. Start your React frontend:
   ```bash
   # Navigate to your React project
   cd FrontEnd/Study-Buddy
   npm install  # Install dependencies if needed
   npm run dev  # Start the development server
   ```

3. Open your browser and navigate to the frontend URL (usually http://localhost:5173)

4. Test API functionality:
   - Register a new user
   - Log in with the registered user
   - Create a study group
   - Upload resources
   - Schedule study sessions

## Troubleshooting

- **CORS Issues**: If you see errors related to CORS, ensure your Django backend has CORS properly configured
- **Authentication Issues**: Check that the JWT token endpoints are working properly
- **API Endpoint Mismatches**: Verify that the endpoint URLs in `api-config.js` match the actual backend endpoints 