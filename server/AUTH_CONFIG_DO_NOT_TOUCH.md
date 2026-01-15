# ⚠️ CRITICAL AUTHENTICATION CONFIGURATION ⚠️

**DO NOT MODIFY THE GOOGLE AUTH SETTINGS WITHOUT READING THIS.**

This project has a specific configuration for Google OAuth 2.0 that MUST match the Google Cloud Console settings exactly.

## Current Working Configuration (Local)

- **Frontend Port:** `3000`
- **Backend Port:** `5000`

### Required Environment Variables (`server/.env`)
The following variables are CRITICAL. Do not change them unless you have updated the Google Cloud Console accordingly.

```env
PORT=5000
CLIENT_URL=http://localhost:3000
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### Google Cloud Console Settings
If you create new credentials, you **MUST** add these exact URIs:

1.  **Authorized JavaScript origins:**
    - `http://localhost:3000`
    - `https://your-vercel-app.vercel.app` (for production)

2.  **Authorized redirect URIs:**
    - `http://localhost:5000/api/auth/google/callback`
    - `https://your-vercel-app.vercel.app/api/auth/google/callback` (for production)

## Common Pitfalls
- **Changing PORT to 3000:** This will break the app. The backend MUST run on 5000 (or another port) to avoid conflict with the frontend.
- **Missing Redirect URI:** Use the exact URL above.
