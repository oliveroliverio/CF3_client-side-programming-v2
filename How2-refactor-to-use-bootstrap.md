# How to Refactor myFlix to Use Bootstrap 5.2.0

This guide provides step-by-step instructions for refactoring your myFlix React application to use Bootstrap 5.2.0 for UI design, replacing custom SCSS files.

## 1. Install Bootstrap Dependencies

### Install Bootstrap Package

```bash
npm install bootstrap@5.2.0 --save-dev
npm install react-bootstrap --save
```

### Update package.json

Your package.json should now include:

```json
"dependencies": {
  "prop-types": "^15.8.1",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-bootstrap": "^2.7.0"
},
"devDependencies": {
  "@parcel/transformer-sass": "^2.15.4",
  "bootstrap": "5.2.0"
}
```

## 2. Import Bootstrap Styles

### Update src/index.jsx

Add the Bootstrap CSS import at the top of your main index.jsx file:

```jsx
// Add this import at the top of the file
import 'bootstrap/dist/css/bootstrap.min.css';
```

## 3. Archive Old SCSS Files

### Create an Archive Directory

```bash
mkdir -p src/archived-styles
```

### Move Old SCSS Files

```bash
# Move all SCSS files to the archive directory
find src -name "*.scss" -exec mv {} src/archived-styles/ \;

# If you want to keep index.scss, move it back
mv src/archived-styles/index.scss src/
```

## 4. Update Component Files

### Update MainView Component

Refactor `src/components/main-view/main-view.jsx`:

```jsx
import { Container, Row, Col } from 'react-bootstrap';

// Replace the main-view div with Bootstrap components
return (
  <>
    <NavbarView user={user} onLoggedOut={handleLogout} />
    
    {selectedMovie ? (
      <MovieView
        selectedMovie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
        similarMovies={movies.filter(movie =>
          movie._id !== selectedMovie._id &&
          movie.genre && selectedMovie.genre &&
          movie.genre.name === selectedMovie.genre.name
        ).slice(0, 5)}
        setSelectedMovie={setSelectedMovie}
      />
    ) : (
      <Container className="main-view">
        <Row className="justify-content-center">
          {movies.map((movie) => (
            <Col md={3} className="mb-4" key={movie._id}>
              <MovieCard
                movie={movie}
                setSelectedMovie={setSelectedMovie}
              />
            </Col>
          ))}
        </Row>
      </Container>
    )}
  </>
);
```

### Update NavbarView Component

Refactor `src/components/navbar-view/navbar-view.jsx`:

```jsx
import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export const NavbarView = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {user && (
              <>
                <Navbar.Text className="me-3">
                  Welcome, {user.username}
                </Navbar.Text>
                <Button variant="danger" onClick={onLoggedOut}>Sign Out</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
```

### Update LoginView Component

Refactor `src/components/login-view/login-view.jsx`:

```jsx
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';

// Replace the form elements with Bootstrap components
return (
  <Container>
    <Row className="justify-content-center">
      <Col md={6}>
        <Card className="mt-5">
          <Card.Body>
            <Card.Title>Login</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="3"
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
```

### Update SignupView Component

Refactor `src/components/signup-view/signup-view.jsx`:

```jsx
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';

// Replace the form elements with Bootstrap components
return (
  <Container>
    <Row className="justify-content-center">
      <Col md={6}>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Sign Up</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="3"
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBirthday" className="mt-3">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
```

### Update MovieCard Component

Refactor `src/components/movie-card/movie-card.jsx`:

```jsx
import { Card, Button } from 'react-bootstrap';

export const MovieCard = ({ movie, setSelectedMovie }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.imageURL} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director?.name}</Card.Text>
        <Button variant="primary" onClick={() => setSelectedMovie(movie)}>
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};
```

### Update MovieView Component

Refactor `src/components/movie-view/movie-view.jsx`:

```jsx
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

return (
  <Container>
    <Row className="my-4">
      <Col md={8}>
        <Card>
          <Card.Img variant="top" src={selectedMovie.imageURL} />
          <Card.Body>
            <Card.Title>{selectedMovie.title}</Card.Title>
            <Card.Text>Director: {selectedMovie.director?.name}</Card.Text>
            <Card.Text>Genre: {selectedMovie.genre?.name}</Card.Text>
            <Card.Text>{selectedMovie.description}</Card.Text>
            <Button variant="primary" onClick={onBackClick}>Back</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <h4>Similar Movies</h4>
        {similarMovies.length > 0 ? (
          similarMovies.map(movie => (
            <Card className="mb-3" key={movie._id}>
              <Card.Img variant="top" src={movie.imageURL} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Button variant="link" onClick={() => setSelectedMovie(movie)}>
                  View
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No similar movies found</p>
        )}
      </Col>
    </Row>
  </Container>
);
```

## 5. Update index.jsx and index.scss

### Update index.jsx

Make sure your `src/index.jsx` file has the Bootstrap import:

```jsx
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

// Bundle the app component
const MyFlixApplication = () => {
  return <MainView />;
};

// Find the root of the app
const container = document.querySelector('#root');
const root = createRoot(container);

// Render the app in the root DOM element
root.render(<MyFlixApplication />);
```

### Update index.scss

Simplify your `src/index.scss` file to only include custom styles that aren't provided by Bootstrap:

```scss
// Custom styles that extend Bootstrap
$primary-color: #032541;
$secondary-color: #e50914;

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

// Any additional custom styles can go here
```

## 6. Remove References to Old SCSS Files

Remove any import statements for the old SCSS files from your component files. For example:

```jsx
// Remove this line from your components
import './navbar-view.scss';
```

## 7. Test Your Application

```bash
npm run start
```

Verify that all components render correctly with Bootstrap styling.

## 8. Commit Your Changes

```bash
git add .
git commit -m "Refactor UI to use Bootstrap 5.2.0"
git push origin your-branch-name
```

## Common Issues and Solutions

### Missing Bootstrap Components

If you're missing Bootstrap components, make sure you've imported them correctly:

```jsx
import { ComponentName } from 'react-bootstrap';
```

### Styling Conflicts

If you're experiencing styling conflicts, ensure that:

1. Bootstrap CSS is imported before your custom styles
2. You've removed all conflicting styles from your custom SCSS files
3. You're using Bootstrap's utility classes for spacing and layout

### Custom Styling with Bootstrap

To add custom styling to Bootstrap components:

```jsx
<Button variant="primary" className="my-custom-class">Click Me</Button>
```

And in your SCSS file:

```scss
.my-custom-class {
  // Custom styles here
}
```

## Additional Resources

- [React Bootstrap Documentation](https://react-bootstrap.github.io/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.2/)
- [Bootstrap Grid System](https://getbootstrap.com/docs/5.2/layout/grid/)
- [Bootstrap Components](https://getbootstrap.com/docs/5.2/components/)
