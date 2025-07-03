# How to Implement State-Based Routing and Navigation in React

This guide explains how to implement client-side routing using React's state management for a single-page application (SPA) without using React Router. This approach is particularly useful for simple applications where you want to avoid additional dependencies.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Implementation Steps](#implementation-steps)
3. [Navigation Component](#navigation-component)
4. [State Management](#state-management)
5. [Conditional Rendering](#conditional-rendering)
6. [Git Workflow](#git-workflow)
7. [Testing](#testing)

## Prerequisites

- Basic React application set up
- Basic understanding of React hooks (useState, useEffect)
- Existing components for different views (Login, Signup, MovieList, etc.)

## Implementation Steps

### 1. Create a Navigation Component

First, let's create a reusable navigation component that will be displayed across all views.

```jsx
// src/components/navigation/navigation.jsx
import { Navbar, Nav, Container } from 'react-bootstrap';

export const Navigation = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && <Nav.Link href="/movies">Movies</Nav.Link>}
            {user && <Nav.Link href="/profile">Profile</Nav.Link>}
          </Nav>
          {user && (
            <Nav>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
```

### 2. Set Up State Management in App.js

Modify your main App component to manage the application state and routing:

```jsx
// src/App.js
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Navigation } from './components/navigation/navigation';
import { LoginView } from './components/login-view/login-view';
import { SignupView } from './components/signup-view/signup-view';
import { MovieList } from './components/movie-list/movie-list';
import { ProfileView } from './components/profile-view/profile-view';
import { MovieView } from './components/movie-view/movie-view';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [view, setView] = useState('login'); // 'login', 'signup', 'movies', 'profile', 'movie'

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
      setView('movies');
    }
  }, []);

  // Handle user login
  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    setView('movies');
  };

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    setView('login');
  };

  // Render the appropriate view based on the current state
  const renderView = () => {
    switch (view) {
      case 'signup':
        return <SignupView onSignupSuccess={() => setView('login')} />;
      case 'movies':
        return (
          <MovieList
            movies={movies}
            onMovieSelect={(movie) => {
              setSelectedMovie(movie);
              setView('movie');
            }}
            user={user}
            token={token}
          />
        );
      case 'movie':
        return (
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setView('movies')}
            user={user}
            token={token}
          />
        );
      case 'profile':
        return (
          <ProfileView
            user={user}
            token={token}
            onBackClick={() => setView('movies')}
            onUserUpdate={(updatedUser) => {
              setUser(updatedUser);
              localStorage.setItem('user', JSON.stringify(updatedUser));
            }}
          />
        );
      case 'login':
      default:
        return (
          <>
            <LoginView onLogin={handleLogin} />
            <button 
              className="btn btn-link" 
              onClick={() => setView('signup')}
            >
              Don't have an account? Sign up
            </button>
          </>
        );
    }
  };

  return (
    <>
      <Navigation 
        user={user} 
        onLoggedOut={handleLogout} 
        onNavigate={(newView) => setView(newView)}
      />
      <Container className="mt-4">
        {renderView()}
      </Container>
    </>
  );
};

export default App;
```

### 3. Update Navigation Component with Navigation Handler

Enhance the Navigation component to handle navigation between views:

```jsx
// Update in src/components/navigation/navigation.jsx
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

export const Navigation = ({ user, onLoggedOut, onNavigate }) => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            onNavigate('movies');
          }}
        >
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('movies');
                  }}
                >
                  Movies
                </Nav.Link>
                <Nav.Link 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('profile');
                  }}
                >
                  Profile
                </Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Nav>
              <Nav.Link 
                onClick={() => {
                  onLoggedOut();
                  onNavigate('login');
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
```

## Git Workflow

1. **Create a new feature branch**
   ```bash
   git checkout -b feature/state-based-routing
   ```

2. **Install any new dependencies** (if any)
   ```bash
   npm install react-bootstrap bootstrap@5.2.0
   ```

3. **Add and commit your changes**
   ```bash
   git add .
   git commit -m "feat: implement state-based routing and navigation"
   ```

4. **Push to remote repository**
   ```bash
   git push origin feature/state-based-routing
   ```

5. **Create a pull request**
   - Go to your repository on GitHub/GitLab
   - Click on "Compare & pull request"
   - Add a descriptive title and description
   - Request review from team members if needed
   - Merge after approval

## Testing

Test the following scenarios:
1. **Unauthenticated User**
   - Should see login/signup views only
   - Should be able to navigate to signup from login and vice versa

2. **Authenticated User**
   - Should see navigation bar with Movies and Profile links
   - Should be able to navigate between different views
   - Should maintain state when navigating
   - Should be able to log out

3. **View Transitions**
   - Clicking on a movie should show movie details
   - Back buttons should return to the previous view
   - Browser back/forward buttons should work as expected

## Best Practices

1. **State Management**
   - Keep state as close to where it's needed as possible
   - Lift state up to the nearest common ancestor when multiple components need the same state

2. **Performance**
   - Use React.memo() for pure components to prevent unnecessary re-renders
   - Consider using useCallback for functions passed to child components

3. **Code Organization**
   - Keep components small and focused on a single responsibility
   - Use meaningful names for state variables and functions
   - Add PropTypes for all components

4. **Error Handling**
   - Add error boundaries to catch and handle errors gracefully
   - Show user-friendly error messages

## Troubleshooting

1. **State not updating**
   - Make sure you're using the state setter function correctly
   - Check for any race conditions in useEffect

2. **Navigation not working**
   - Ensure all click handlers are properly preventing default behavior
   - Verify that the view state is being updated correctly

3. **UI not updating**
   - Check for any console errors
   - Verify that all state updates are happening as expected

## Next Steps

1. Implement protected routes that redirect unauthenticated users
2. Add loading states for better UX
3. Implement proper error boundaries
4. Add animations for smoother transitions between views
