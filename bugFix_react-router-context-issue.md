# BugFix: React Router Context Issue

## Issue
Application was experiencing navigation errors due to improper React Router setup. The main symptoms were:
- `useNavigate() may be used only in the context of a <Router> component` error
- Navigation not working as expected between routes

## Root Cause
1. **Multiple Router Contexts**: The application had `BrowserRouter` defined in both `index.jsx` and `main-view.jsx`
2. **Inconsistent Navigation**: Mixing of `useNavigate` hook with direct state management for routing
3. **Component Structure**: The routing logic was split between components, causing context issues

## Solution

### 1. Fixed Router Context
Moved `BrowserRouter` to wrap the entire application in `index.jsx`:

```jsx
// index.jsx
import { BrowserRouter } from 'react-router-dom';

const MyFlixApp = () => {
    return (
        <BrowserRouter>
            <div className="my-flix">
                <h1>MyFlix App Frontend</h1>
                <MainView />
            </div>
        </BrowserRouter>
    );
};
```

### 2. Removed Duplicate Router
Removed `BrowserRouter` from `main-view.jsx` and replaced it with a React Fragment:

```jsx
// main-view.jsx
return (
    <>
        <NavbarView user={user} onLoggedOut={handleLogout} />
        <Container fluid className="main-view py-5 px-4">
            {/* Routes here */}
        </Container>
    </>
);
```

### 3. Updated Navigation
Simplified navigation by using URL parameters instead of component state:

```jsx
// In movie listing
<Col
    key={movie._id}
    xl={2}
    onClick={() => navigate(`/movies/${movie._id}`)}
    style={{ cursor: 'pointer' }}
>
    <MovieCard movie={movie} />
</Col>
```

## Files Changed
1. `src/index.jsx` - Added BrowserRouter wrapper
2. `src/components/main-view/main-view.jsx` - Removed BrowserRouter, updated routing logic
3. `src/components/movie-card/movie-card.jsx` - Simplified to use navigation

## Dependencies
- react-router-dom@6.3.0

## Verification
- Navigation between routes now works correctly
- No more context-related errors in the console
- URL updates properly when navigating
- Browser back/forward buttons work as expected

## Additional Notes
- Always ensure only one `BrowserRouter` exists in your React application
- Use URL parameters for state that should be shareable via URL
- Keep routing logic centralized when possible to avoid context issues
