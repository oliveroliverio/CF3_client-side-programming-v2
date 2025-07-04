# How to Implement a User Profile View in React

This guide explains how to implement a User Profile View in a React application with features for viewing and editing user information and managing favorite movies.

## Issue/Task

The task was to create a new profile view that would allow users to:

1. View their user information
2. Update their user information (username, password, email, date of birth)
3. Deregister their account
4. View their favorite movies as a list
5. Add movies to their favorites list
6. Remove movies from their favorites list

## Solution

We implemented the profile view by creating a new component and updating existing components to support the new functionality.

### Files Modified

1. `/src/components/profile-view/profile-view.jsx` (created)
2. `/src/components/main-view/main-view.jsx` (updated)
3. `/src/components/navbar-view/navbar-view.jsx` (updated)
4. `/src/components/movie-card/movie-card.jsx` (updated)

### Detailed Changes

#### 1. Created `profile-view.jsx`

We created a new component for the Profile View that allows users to view and update their information and manage their favorite movies.

**Key features implemented:**
- Form to update user information (username, password, email, birthday)
- Button to delete account
- Display of favorite movies with ability to remove them

```jsx
// /src/components/profile-view/profile-view.jsx
import { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col, Container, Alert } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import axios from "axios";

export const ProfileView = ({ user, token, movies, onUserUpdate }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday ? user.birthday.slice(0, 10) : "");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Filter favorite movies
  const favoriteMovies = movies.filter(movie => 
    user.favoriteMovies?.includes(movie._id)
  );
  
  // Update user info
  const handleUpdate = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    
    const updatedData = {
      username,
      email,
      birthday
    };
    
    // Only include password if it's not empty
    if (password) {
      updatedData.password = password;
    }
    
    try {
      const response = await axios.put(
        `https://myflix2-54ee4b2daeee.herokuapp.com/users/${user.username}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Update local storage and parent component
      localStorage.setItem("user", JSON.stringify(response.data));
      onUserUpdate(response.data);
      setSuccessMessage("Profile updated successfully!");
      setPassword(""); // Clear password field
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };
  
  // Deregister user
  const handleDeregister = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await axios.delete(
          `https://myflix2-54ee4b2daeee.herokuapp.com/users/${user.username}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        // Clear user data from localStorage and redirect to login
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } catch (error) {
        console.error("Error deleting account:", error);
        setErrorMessage("Failed to delete account. Please try again.");
      }
    }
  };
  
  // Remove movie from favorites
  const handleRemoveFavorite = async (movieId) => {
    try {
      await axios.delete(
        `https://myflix2-54ee4b2daeee.herokuapp.com/users/${user.username}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Update local storage and parent component
      const updatedUser = { 
        ...user, 
        favoriteMovies: user.favoriteMovies.filter(id => id !== movieId)
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      onUserUpdate(updatedUser);
    } catch (error) {
      console.error("Error removing favorite:", error);
      setErrorMessage("Failed to remove from favorites. Please try again.");
    }
  };

  return (
    <Container className="profile-view">
      <Row className="mb-4">
        <Col>
          <h2 className="mb-4">Your Profile</h2>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        </Col>
      </Row>
      
      <Row>
        {/* User Information Form */}
        <Col md={6} className="mb-4">
          <Card className="p-4">
            <h3 className="mb-3">Update Information</h3>
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>New Password (leave blank to keep current):</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              
              <Form.Group controlId="formBirthday" className="mb-3">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </Form.Group>
              
              <div className="d-flex justify-content-between mt-4">
                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
                <Button variant="danger" onClick={handleDeregister}>
                  Delete Account
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
        
        {/* Favorite Movies */}
        <Col md={6}>
          <Card className="p-4 h-100">
            <h3 className="mb-3">Your Favorite Movies</h3>
            {favoriteMovies.length === 0 ? (
              <p className="text-muted">You haven't added any favorite movies yet.</p>
            ) : (
              <Row xs={1} md={2} className="g-3">
                {favoriteMovies.map(movie => (
                  <Col key={movie._id}>
                    <div className="position-relative">
                      <MovieCard movie={movie} />
                      <Button 
                        variant="danger" 
                        size="sm"
                        className="position-absolute top-0 end-0 m-2"
                        onClick={() => handleRemoveFavorite(movie._id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
```

#### 2. Updated `main-view.jsx`

We modified the MainView component to:
- Import the ProfileView component
- Add a new route for the profile page
- Pass necessary data to the ProfileView component
- Pass user and token information to the MovieCard components

```jsx
// Import ProfileView at the top of the file
import { ProfileView } from "../profile-view/profile-view";

// Update MovieCard rendering to include user and token
{movies.map((movie) => (
    <Col key={movie._id} xl={2}>
        <MovieCard movie={movie} user={user} token={token} />
    </Col>
))}

// Add new route for ProfileView
<Route
    path="/profile"
    element={
        !user ? (
            <Navigate to="/login" replace />
        ) : (
            <ProfileView 
                user={user} 
                token={token} 
                movies={movies} 
                onUserUpdate={(updatedUser) => setUser(updatedUser)}
            />
        )
    }
/>
```

#### 3. Updated `navbar-view.jsx`

We enhanced the NavbarView component to:
- Import the Link component from react-router-dom
- Add navigation links to Home and Profile
- Use Link components for proper routing

```jsx
// Add Link import
import { Link } from 'react-router-dom';

// Update Navbar.Brand to use Link
<Navbar.Brand as={Link} to="/">myFlix</Navbar.Brand>

// Add navigation links
<>
    <Nav.Link as={Link} to="/" className="me-3">Home</Nav.Link>
    <Nav.Link as={Link} to="/profile" className="me-3">Profile</Nav.Link>
    <Navbar.Text className="me-3">
        Welcome, {user.username}
    </Navbar.Text>
    <Button variant="danger" onClick={onLoggedOut}>Sign Out</Button>
</>
```

#### 4. Updated `movie-card.jsx`

We enhanced the MovieCard component to:
- Accept user and token props
- Add favorite/unfavorite functionality
- Add a favorite button UI
- Update PropTypes

```jsx
// Import useState and axios
import { useState } from 'react';
import axios from 'axios';

// Update component to accept user and token props
export const MovieCard = ({ movie, user, token }) => {
    // Add state for tracking favorite status
    const [isFavorite, setIsFavorite] = useState(
        user?.favoriteMovies?.includes(movie._id)
    );
    
    // Add function to handle favorite/unfavorite
    const handleFavoriteClick = async (e) => {
        e.stopPropagation();
        
        try {
            if (isFavorite) {
                // Remove from favorites
                await axios.delete(
                    `https://myflix2-54ee4b2daeee.herokuapp.com/users/${user.username}/movies/${movie._id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            } else {
                // Add to favorites
                await axios.post(
                    `https://myflix2-54ee4b2daeee.herokuapp.com/users/${user.username}/movies/${movie._id}`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            }
            
            // Update user in localStorage
            const updatedUser = {
                ...user,
                favoriteMovies: isFavorite
                    ? user.favoriteMovies.filter(id => id !== movie._id)
                    : [...user.favoriteMovies, movie._id]
            };
            
            localStorage.setItem("user", JSON.stringify(updatedUser));
            
            // Update state
            setIsFavorite(!isFavorite);
            
        } catch (error) {
            console.error("Error updating favorites:", error);
            alert("Failed to update favorites. Please try again.");
        }
    };

    // Add favorite button UI
    {user && (
        <Button
            variant={isFavorite ? "danger" : "outline-danger"}
            size="sm"
            className="position-absolute top-0 end-0 m-2"
            onClick={handleFavoriteClick}
        >
            {isFavorite ? "♥" : "♡"}
        </Button>
    )}

    // Update PropTypes
    MovieCard.propTypes = {
        movie: PropTypes.shape({
            title: PropTypes.string,
            imageUrl: PropTypes.string,
            _id: PropTypes.string,
            genre: PropTypes.object,
            director: PropTypes.object,
            description: PropTypes.string
        }).isRequired,
        user: PropTypes.object,
        token: PropTypes.string
    };
```

## Running and Testing the Application

To start the application and test the functionality:

```bash
# Navigate to the project directory
cd /Users/mbp16-oo/Downloads/z-dev/___DVW-CareerFoundry/CF3_client-side-programming-v2

# Start the development server
npm start
```

After starting the application:

1. Log in to the application
2. Click the "Profile" link in the navigation bar
3. Test updating user information
4. Test adding and removing favorite movies
5. Test the "Delete Account" functionality (be careful, this will permanently delete the account)

## Key API Endpoints Used

1. `PUT /users/:username` - Update user information
2. `DELETE /users/:username` - Delete user account
3. `POST /users/:username/movies/:movieId` - Add a movie to favorites
4. `DELETE /users/:username/movies/:movieId` - Remove a movie from favorites

## Notes on Lowercase Field Names

The myFlix API expects lowercase field names for authentication and user operations:
- For login: 'username' and 'password' (lowercase)
- For user operations: 'username', 'password', 'email', 'birthday' (lowercase)
