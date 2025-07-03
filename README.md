Note: the contents of this readme will vary based on what branch you're on.  It's a copy of the "Exercise" markdown file + additional instructions to complete the task.  Be sure to update this every time you create a new branch.


## Client-Side Programming & React


# 3.7: Client-Side App Routing


- Learning Goals
- Introduction
- Client-Side App Routing
- Adding a State-Based Router
- Navigation Between Views
- Spotlight on AI
- Summary
- Resources
- Task
- Forum


#### Learning Goals


- Implement navigation between views
- Implement state-based routing to route views in a React SPA


#### Introduction

Great to have you back! Hopefully you’re feeling pretty good about your myFlix app by this point—between the new views you’ve made and the style you’ve given it with React Bootstrap, you’re well on your way to having a working—and impressive-looking!—app. But there are still a few things to consider when making this type of app in React, so you’ll be going back under the hood to find more ways to improve and optimize your app’s functionality.

In this Exercise, you’ll be taking a look at how you can add ways of routing myFlix’s requests— most notably, how to navigate users to the different views within your single-page application (SPA).

Let's get started!


> Coding Practice: Books App Demo
> As you work through this Exercise, you can code along with the instructions for our Books demo app using this codesandbox:
>
>
> Codesandbox 3.7 Starting Repo Routing


#### Client-Side App Routing

The demo Books app has a feature that allows users to switch from the main view to a single book view in order to see more details about the given book. This is achieved in the backend by changing the state of the app, but it’s not a persistent change. If a user were to reload the page, the app would return to its initial state (main view). Furthermore, users aren’t able to share a link to a specific book with anybody, since the app only has a URL linked to the main view.

To resolve these issues, you need routing—the ability to store state in the URL. Think about Google Maps, for instance. When you select a location, Google Maps gives you the option to share a URL with your friends that will take them directly to the selected location rather than the Google Maps homepage. That’s because the state—in this case, your location—is stored in the URL. Make sense?


##### Client-Side Routing vs. Server-Side Routing

Your API uses Express routing to determine what to return from your database (based on client requests). This is pure server-side routing and is based on the API endpoints you defined in Achievement 2. Heroku hosts your app and takes care of processing API requests to your database and returning what’s required. The Express server takes care of returning data for specific URLs, but it can also return a web page—an HTML file that, in turn, requests a JavaScript and CSS file—in its simplest form. It's still server-side routing; the URL is “sent” to the server, which interprets it and determines what to send back.

Client-side routing is very similar, except that it occurs in the browser. Client-side routing consists of reacting to the URL and setting the app state accordingly, without having to request new content from the server. State and URL become looped, so any state change should be reflected in the URL.


##### State Routing vs. Hash Routing

Two ways exist to store routes in an SPA URL. You can either use a hash-based URL:

`http://localhost:1234#books/dracula`

Or a state-based one:

`http://localhost:1234/books/dracula`

The state-based approach is the more recent of the two; it's part of the HTML5 History API, which offers a variety of tools for manipulating the URL and browser's history.

In both cases, a fragment is the part of a URL that carries meaning in itself, such as a reference to a page, view, or location within a page. In both the examples just shown, the fragments are “books” and “dracula”.

Although both methods have their pros and cons, hash-based routing is generally easier to implement than state-based routing. However, it’s becoming obsolete as the History API is increasingly supported by browsers. State-based routing (arguably) looks better and is slightly more readable without the hash character. State-based routing (again arguably) also allows for better search engine optimization (i.e., the ease of a user finding the app via a Google search). In this Exercise, you’ll therefore be learning how to implement state-based routing.


#### Adding a State-Based Router

Implementing a router from scratch isn’t all that straightforward, especially when it comes to state-based routers (since you first need to learn how the [HTML5 History API](https://css-tricks.com/using-the-html5-history-api/) works). The good news, though, is that some good libraries are available that can handle things for you. React Router is the most popular library for React apps. Let’s go ahead and add it to your project.

First, you need to add `react-router` and `react-router-dom` to the dependencies section of your `package.json` file:


```js
"react-router": "6.3.0",
    "react-router-dom": "6.3.0"
```

Next, you need to make a couple of changes to your `main-view.jsx` file. While looking at the following code, compare it to what’s currently in the CodeSandbox that was shared in introduction of this Exercise. Then, start to similarly modify your `mainview.jsx` code bit by bit.


```js
import { useState, useEffect } from "react";
import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=star+wars")
      .then((response) => response.json())
      .then((data) => {
        const booksFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
            image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
            author: doc.author_name?.[0]
          };
        });

        setBooks(booksFromApi);
      });
  }, []);

  return (
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/books/:bookId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : books.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <BookView books={books} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : books.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {books.map((book) => (
                      <Col className="mb-4" key={book.id} md={3}>
                        <BookCard book={book} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
```


> Note
> Not all components add UI elements to the view, and these components don’t interfere with the rules of the Bootstrap grid layout you explored in the previous Exercise. <BrowserRouter> and <Routes> and <Route> are examples of such components. This is why it’s fine to have <Routes> as a child of <Row>, as <Routes> won’t render anything specific to that component. That means that in this case, the real child UI is the <Col> that’s in your <Route>.

There’s quite a bit to consider here. First, note that you’re now passing the full array of books to `BookView` instead of to a specific book object. You’ll see why in a moment. Moreover, you've removed nearly everything you added to navigate between views (e.g., passed props such as `onBookClick()` and `onBackClick`have been removed). You also imported some components from `react-router-dom`: `Routes`, `Route`, `Navigate`, and `BrowserRouter`.

In the code just shown, each `<Route/>` component has a `path` prop that expresses what URL it should match, as well as an `element` prop that tells the component what to render if it matches up with the URL. One thing to note is that the path to display a single book view contains a `URL param` named `bookId`, that allows `Route`s to match dynamic URLs, like `/books/dracula` or `/books/insurgent`. You’ll soon learn how you can access these `URL params` in order to display the correct content.

In the UI that the example code renders, the first thing you’ll notice is that `MainView` for unauthenticated users now displays only the login view (`LoginView`), rather than the login view and the signup view (`SignupView`) side by side. The reason for this is because in the next step, you’ll be implementing a navigation component to allow users to better navigate between these views in your SPA.


> Non-authenticated Users
> To prevent non-authenticated users from accessing MainView and BookView, a <Navigate> component is rendered inside their respective <Route>s. If there’s no user, this component will redirect traffic to the login page.

Since you’ve removed the `onBookClick()` function (the one you called in the `onClick` prop as a prop to `BookCard`), you can no longer navigate to a single book (if you’ve implemented `prop-types`, you should be told that `onClick` is missing on your `BookCard` component).

![Error message stating onBookClick is not a function](images-md/misc/TypeError-onBookClick_1751556697392.png)


###### Figure 1. If you try clicking the “Open” button to see a single book view, you’ll get an error like this in your CodeSandbox.

Let’s change this in your `book-card.jsx` file:


```js
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const BookCard = ({ book }) => {
  return (
    <Card>
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        <Link to={`/books/${encodeURIComponent(book.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string
  }).isRequired
};
```


> encodeURIComponent()
>
> You’ll notice that encodeURIComponent is being called with book.id. This isn’t always needed, as usually /books/${book.id} would be enough. However, the key property you use to populate the id contains non-alphanumeric characters that don’t work well when used as URL params. encodeURIComponent is used to replace these non-alphanumeric characters with URL-friendly characters. For more information, here’s some relevant documentation.

If you were to try opening a book card now, you’d simply get another error explaining that there’s also an issue in your `book-view.jsx` that needs to be addressed before the routing can work. As such, in your `book-view.jsx` file, you also need to make some changes so that the correct book is rendered:


```js
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./book-view.scss";

export const BookView = ({ books }) => {
  const { bookId } = useParams();

  const book = books.find((b) => b.id === bookId);

  return (
    <div>
      <div>
        <img className="w-100" src={book.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{book.title}</span>
      </div>
      <div>
        <span>Author: </span>
        <span>{book.author}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
```

Compare the code just shown with the version in CodeSandbox to observe and learn the differences. You can see that `useParams()` is used to access the `bookId` URL param that was mentioned earlier. To render this data properly, you need to look at all the `books` to find the one whose id matches. You need to do it this way because React Router will only give you access to the parameter inside the component that gets rendered (to be specific, the one you list in `element` prop in the `<Route />`). This is why you needed the full array of `books` in order to perform the `.find()` operation on it to get the targeted book.

The new code also wrapped the “back” button with a `Link` that redirects the user back to the main view.

And there you have it!


> Code Check!
> If you want to check out our sample code repo in CodeSandbox, you can open the demo in your browser using the following link:
>
>
> Codesandbox: 3.7 State-Based Routing Demo

Great work! Now you’ve learned how client-side routing works using React Router. Awesome!

Now that your views are routed, it’s time to learn how to navigate between views.


#### Navigation Between Views

Using the Books app again as a demo, you’ll now learn how to apply client-side app routing for navigating between views in an SPA. The process will be broken down into steps that you’ll (eventually) need to take to apply navigation in your own project. You’ll notice that these steps encompass a lot of the knowledge that you’ve gathered over the course of this Achievement. Let’s get to it!

Step 1. Create a new folder called “navigation-bar” in the “components” folder. In the new folder, create a new `navigation-bar.jsx` file.

Step 2. In the `navigation-bar.jsx` file, create a navigation bar using the [React-Bootstrap Navbar component](https://react-bootstrap.github.io/components/navbar/). You can use one of the simpler code samples from the linked Navbar documentation as a baseline. Your component will be returning the `<Navbar>...</Navbar>`. If you’re getting lost you can also use the code sample shown here:

Step 3. Change the component so it takes a `user` and `onLoggedOut` as props. Use the `user` prop to hide the signup and login links (if they exist) and to display home and logout. Use the `onLoggedOut` prop to be called when logout is clicked.

If you’ve followed steps 1 to 3 correctly, your `navigation-bar.jsx` code should look like this CodeSandbox:


> Note
> You won’t be able to see any evidence of your navigation component in the app’s UI yet, because you haven’t properly imported it into the project.

Now, you need to turn your focus to `main-view.jsx`:

Step 4. Import your `NavigationBar` component into the main view.

Step 5. Add the `NavigationBar` component to the top of `<BrowserRouter></BrowserRouter>`. It has to be at the top, because any components used from `react-router-dom` package (e.g. `Link`) has to be inside a Router component (such as BrowserRouter). Here, this is referring to `Link` elements that you added in step 3.

Step 6. Pass the `user` and `onLoggedOut` props to `<NavigationBar>` where `onLoggedOut` will be assigned a function that will call `setUser(null)` (and for your myFlix client app, it will also call `setToken(null)` and `localStorage.clear()`).

If you've followed steps 4 to 6 correctly, your `main-view.jsx` code should correspond to what you see next. You’ll notice there’s now a navigation bar in the main view!

That’s it. Well done.


#### Spotlight on AI

In this Spotlight on AI section, you'll learn how to:


- Employ AI tools to tackle complex developer problems
- Evaluate AI’s effectiveness at solving complex developer problems
- Explain the ethical considerations for employing AI tools for development work on professional codebases

Building a complex component can be challenging, especially if it’s part of a larger app architecture. Revisiting previous tasks and examples can help you get started, but sometimes that isn’t enough to guide your approach to building a new component. Coding-compatible AI tools can be a great companion when you’re faced with this challenge!

One of the most promising use cases for AI in many domains is its ability to help provide templates and structure to kick off your work. When AI takes on this role, it can help you with that initial push to get into coding mode and start stirring your problem-solving and creativity muscles. This is a realistic use case for using AI to help you solve complex developer problems.

Here’s one of your mentors using ChatGPT to generate some base component code:


Use this demo to help guide your approach to using AI as an assistant while working on your user Profile view in this task. Consider incrementally prompting the AI as you work through each of the task’s steps. A helpful method would be to break a component down into smaller chunks of functionality and then work through these step-by-step.

Consider starting with the following prompt:

`I’m creating a React function component that will be a user's "profile view”. The profile view needs to display user information for logged-in users that will be pulled from a /users endpoint. Please provide some starting code.`

If your component will be receiving props, make sure to add them to the prompt too!

Remember, you can’t simply copy-paste the code from the AI tool. You should just use the structure and suggestions provided by the AI to help you adapt and refine your code to align with the rest of your codebase and meet your project requirements.


##### Submitting Evidence

If you decide to use AI to help you with your task, be sure to provide your instructor with evidence demonstrating your collaboration with the AI and your experience of it. Deliverables for this should include:


- A summary of your approach and samples of your prompts to the AI.
- An evaluation of the AI’s effectiveness in helping you solve the problem at hand. For example, did it understand what you wanted? Was it able to provide helpful starting code? How much did you need to adjust and adapt the suggested code?
- A suggestion of how AI can be used to help learn new programming skills. Did it help you get “unstuck” when working on this task?
- Any ethical constraints you can see related to using AI in this way and on professional development projects.


#### Summary

That was a lot to cover in one Exercise! You took a deep dive into client-side authentication, learning how to allow users to access different views within the Books app (and eventually the myFlix app). You also explored how to ensure your URLs reflect any change of state in your app, and how to guarantee users can easily navigate between different views using a navigation feature.

In the next Exercise, you’ll learn about a new design pattern, Flux, as well as Redux, which is an open source JavaScript library that follows Flux. First of all, though, you have a task to complete! You’re going to implement routing and navigation in your own app, adding a new view for authenticated users!


#### Resources

To help you complete the following task, we've provided a series of videos to walk you through the process of tidying and styling the user profile view. Though these four videos focus solely on the user profile view, the guidance for structuring your code and work is transferable across other parts of the app. Note also that the code in these videos will be slightly outdated, but the general process for approaching this task remains similar.

![Tidy Up Your Profile Page Code](images-md/misc/550a1ce45fdde722299ca4bb5e7bb912_1751556697891.webp)


- 1. Tidy Up Your Profile Page Code
- 2. Add Bootstrap
- 3. Wrap Favourite Movies in a Grid
- 4. Style Favourite Movies with Bootstrap & CSS

If you’d still like to learn more about the topics covered in this Exercise, then we recommend taking a look at the following resources. Note that this reading is optional and not required to complete the course:


- HTML5 History API
- React Router Documentation

Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

For this task, you’re going to apply everything you’ve learned in this Exercise and add routing to your source code. The task will be divided into several parts. You’re also going to add some final features to your app to ensure it functions as it should. For example, you’ll provide users with a profile view where they can alter their information and see their favorite movies. We recommend referring to your [Achievement 3 project brief (PDF)](https://images.careerfoundry.com/public/courses/fullstack-immersion/full-stack-project-briefs/A3-Project-Brief-2022.pdf) for a recap of what your app should consist of!

Your project structure should look like this (as far as the source code is concerned):


```js
myFlix-client
     - package.json
     - src
       - index.scss
       - index.jsx
       - index.html
       - components
           - login-view
             - login-view.jsx
           - main-view
             - main-view.jsx
           - movie-card
             - movie-card.jsx
           - movie-view
             - movie-view.jsx
           - signup-view
             - signup-view.jsx
           - profile-view
             - profile-view.jsx
           - navigation-bar
             - navigation-bar.jsx
```

Part 1: Implement State-Based Routing & Navigation

First, you’ll implement state-based routing for your React SPA, so that users can navigate between the different views and obtain unique URLs to share views with others. This will also mean creating a navigation bar for users to switch between different views.

Directions:


1. Create a new GitHub branch off of the main branch.
1. Use React Router to enable routing in your app:


Install react-router and react-router-dom packages by running npm install react-router react-router-dom --save.
Refactor the code in render() method in main-view.jsx to use a BrowserRouter, and add routes for your views.
Replace buttons that use onMovieClick and onBackClick with React Router links. This includes MovieCard, and MovieView in main-view.jsx.
Remove anything related to setSelectedMovie, including the state selectedMovie, since it will no longer be used.
1. Commit the changes to your branch.
1. Add a navigation bar at the top of the page.


For unauthenticated users, provide links to the Login/Signup page
For authenticated users, provide links to Home (your MainView), Profile (a view you’ll create in just a moment), and Logout.
1. Commit the changes to your branch.

Part 2: Create a User Profile View

In this part of the task, you’ll create a new view, a Profile view, so that users can view and alter their information, including their list of favorite movies.


> Bonus: Spotlight on AI
> You're welcome to use AI as a coding assistant to help you with this part of the task, as you learned in the "Spotlight on AI" section of the Exercise.

Directions


1. Add a user Profile view (linked to the main navigation menu for authenticated users). As per your project brief, this view should:


Display user information. You can obtain the logged in user information by using the /users endpoint and then filtering the returning list by comparing the usernames;
Allow a user to update their user information (username, password, email, date of birth);
Allow a user to deregister;
Display a user's favorite movies as a list. For this you’ll need to filter the movies array with something like let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id)). With this, favoriteMovies is just a regular array of movie objects which could, for example, be displayed as movie cards (the MovieCard components would need to be passed to the ProfileView component and rendered there);
1. Add a “Favorite” button to your MovieCard and/or MovieView components, so that logged in users can select a movie to store in their list of favorites;
1. Allow a user to remove a movie from their list of favorites.
1. Test that all the links in the navigation bar are working correctly. For example, can a logged in user navigate to their profile?
1. Apply Bootstrap to your app’s new views and features so that they’re consistent with the rest of your app.
1. After pushing to your branch, create a zip file of your project repository on your computer. Be sure you've zipped the version from your branch!
1. Create a pull request, and send both the link to your pull request and the zip file of your repository to your tutor to review.
1. Once accepted, and before you start the next task, merge the pull request into the main branch.

Bonus: Similar Movies

If you implemented the “similar movies” list in your `MovieView` back in Exercise 3.4: React Lifestyle Methods, you’ll need to refactor your code. You’ll have to move the logic of producing and rendering "Similar Movies" to inside of `movie-view.jsx`, because you only have access to the targeted movie ID inside `movie-view.jsx`.

As a result, you’re going to move the code that renders the “similar movies” list into `movie-view.jsx`, however, this won't be straightforward (hint: passing function props). Keep in mind that the logic of producing the `similarMovies` array itself will still remain in `main-view.jsx`, you’ll just have to pass it as a prop to `MovieView`. It’s there that the rest of the rendering work will be done.

If you didn’t implement the “similar movies” list in 3.4, it’s not too late. Feel free to add it to your project now in `movie-view.jsx`!

Don't forget to import `MovieCard` into `movie-view.jsx` so that the similar movies feature can use this component!

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](images-md/icons/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c_1751556698453.svg)


- Routing views, Nav bar, user Profile view attempted; BUT
- 1-2 of these submission requirements havn’t been implemented, are largely incomplete, or contain major errors so that the app doesn’t function as intended

![](images-md/icons/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87_1751556698620.svg)


- Routing views, nav bar, and user profile view have been implemented and the app functions as intended; BUT
- Repository contains minor syntax errors or omissions that must be addressed to meet project requirements and coding best practices

![](images-md/icons/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4_1751556698652.svg)


- Routing views, nav bar, and user profile view have been implemented successfully; AND
- The app functions as intended, meets the project requirements, and follows best practices for coding and structuring React apps

---

# Task instructions: How to Implement State-Based Routing and Navigation in React

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
