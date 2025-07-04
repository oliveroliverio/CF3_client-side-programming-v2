# How to Implement React Router in React Application

## Problem
Needed to implement client-side routing in the React application to enable navigation between different views without page reloads.

## Solution
Implemented React Router v6 to handle client-side routing with protected routes and proper navigation.

### Files Changed
1. `src/components/main-view/main-view.jsx`
   - Added React Router imports
   - Restructured the component to use `BrowserRouter`, `Routes`, and `Route`
   - Implemented protected routes and navigation

### Commands Used
```bash
# Install react-router-dom
npm install react-router-dom@6.3.0

# If you need to force reinstall
rm -rf node_modules package-lock.json
npm install
```

### Key Changes Made
1. Wrapped the application in `BrowserRouter`
2. Created routes for:
   - `/login` - For user login
   - `/signup` - For new user registration
   - `/movies/:movieId` - For individual movie details
   - `/` - Home page showing all movies
3. Added route protection to redirect unauthenticated users to login
4. Implemented navigation using `useNavigate` hook
5. Updated movie selection to use URL parameters

### Dependencies Added
- react-router-dom@6.3.0

### Notes
- The application now maintains browser history and allows deep linking
- Protected routes ensure users must be authenticated to access certain views
- The URL updates to reflect the current view, enabling browser navigation (back/forward)
