# How to Add a Navigation Bar with Logout Functionality

## Overview
This guide explains how to implement a navigation bar with a sign-out button in a React application, specifically for the myFlix client application.

## Files Created/Modified

### 1. Created New Component Files
- `src/components/navbar-view/navbar-view.jsx` - The React component for the navigation bar
- `src/components/navbar-view/navbar-view.scss` - The styling for the navigation bar

### 2. Modified Existing Files
- `src/components/main-view/main-view.jsx` - Updated to include the navbar and logout functionality

## Implementation Details

### 1. Creating the NavbarView Component

The `navbar-view.jsx` file contains a simple navigation bar component that:
- Displays the application name (myFlix)
- Shows a welcome message with the user's username
- Provides a sign-out button
- Conditionally renders content based on whether a user is logged in

```jsx
import React from 'react';
import './navbar-view.scss';

export const NavbarView = ({ user, onLoggedOut }) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>myFlix</h1>
            </div>
            <div className="navbar-menu">
                {user && (
                    <>
                        <span className="navbar-welcome">Welcome, {user.username}</span>
                        <button className="navbar-button" onClick={onLoggedOut}>Sign Out</button>
                    </>
                )}
            </div>
        </nav>
    );
};
```

### 2. Styling the NavbarView Component

The `navbar-view.scss` file provides styling for the navigation bar:
- Dark blue background with white text
- Flexbox layout for proper alignment
- Red sign-out button with hover effects
- Responsive design elements

```scss
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #032541;
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .navbar-brand {
        h1 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: bold;
            color: #fff;
        }
    }

    .navbar-menu {
        display: flex;
        align-items: center;
        gap: 1rem;

        .navbar-welcome {
            margin-right: 1rem;
            font-size: 0.9rem;
        }

        .navbar-button {
            background-color: #e50914;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;

            &:hover {
                background-color: darken(#e50914, 10%);
            }
        }
    }
}
```

### 3. Updating the MainView Component

The `main-view.jsx` file was modified to:

1. Import the NavbarView component:
```jsx
import { NavbarView } from "../navbar-view/navbar-view";
```

2. Add a useEffect hook to check for existing user data in localStorage:
```jsx
useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
    }
}, []);
```

3. Implement the logout functionality:
```jsx
const handleLogout = () => {
    // Clear user data from state
    setUser(null);
    setToken(null);
    setSelectedMovie(null);
    setMovies([]);
    
    // Clear localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};
```

4. Restructure the component's return statement to include the navbar:
```jsx
return (
    <>
        <NavbarView user={user} onLoggedOut={handleLogout} />
        
        {selectedMovie ? (
            <MovieView
                selectedMovie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
                similarMovies={movies.filter(movie =>
                    // Don't include the current movie
                    movie._id !== selectedMovie._id &&
                    // Match on genre
                    movie.genre && selectedMovie.genre &&
                    movie.genre.name === selectedMovie.genre.name
                ).slice(0, 5)} // Limit to 5 similar movies
                setSelectedMovie={setSelectedMovie}
            />
        ) : (
            <div className="main-view">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        setSelectedMovie={setSelectedMovie}
                    />
                ))}
            </div>
        )}
    </>
);
```

## Terminal Commands Used

```bash
# Start the development server to test the changes
npm run start

# If you need to clear the Parcel cache
rm -rf .parcel-cache dist && npm run start

# Git commands to commit the changes
git add src/components/navbar-view/navbar-view.jsx src/components/navbar-view/navbar-view.scss src/components/main-view/main-view.jsx
git commit -m "Add navigation bar with logout functionality"
git push origin your-branch-name
```

## Key Benefits

1. **Improved User Experience**:
   - Clear visual indication of login status
   - Easy access to logout functionality
   - Consistent navigation element across the application

2. **Better State Management**:
   - Proper handling of authentication state
   - Synchronization between React state and localStorage
   - Clean logout process that removes all user data

3. **Enhanced Code Structure**:
   - Separation of concerns with a dedicated navbar component
   - Cleaner conditional rendering in the MainView
   - Reusable styling with SCSS

## Testing the Implementation

1. Start the application with `npm run start`
2. Log in with valid credentials
3. Verify that the navbar appears with the correct username
4. Click the "Sign Out" button
5. Confirm that you're returned to the login screen
6. Refresh the page to ensure the logout was complete (you should still be logged out)
7. Log in again to verify the authentication flow works correctly

## Additional Enhancements for Future

1. Add more navigation links (e.g., Profile, Favorites)
2. Implement a responsive hamburger menu for mobile devices
3. Add animations for smoother transitions
4. Include a search bar in the navigation
5. Add user profile picture/avatar next to the welcome message
