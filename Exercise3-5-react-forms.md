
## Client-Side Programming & React


# 3.5: React Forms


- Learning Goals
- Introduction
- Implementing Forms
- Creating a Login Form
- Authentication Measures
- Persisting a Login Session
- Creating a Signup Form
- Summary
- Resources
- Task
- Forum


#### Learning Goals


- Create forms with React
- Execute frontend form validation with React
- Apply authentication logic to a React form


#### Introduction

Good to see you again! In the previous Exercise, you learned about class components and reviewed function components. You also read up a bit on component lifecycle methods. Finally, you explored how to use Hooks to connect a React app to an API and started to render real data in React components. Exciting stuff!

In this Exercise, you’ll learn about some important React components: forms. Forms aren’t a new UI pattern for you, but they’re an important way of facilitating user input through React components. So, you’ll build some views containing forms to practice. Most importantly, you’ll also learn how to apply form validation and authenticate users. Let’s get started!


#### Implementing Forms

Now that you’ve used Hooks to connect an API to a React app, you can display data within your components. So, let’s move on to creating a different type of view—one that requires data input from its users. Components that require input from users usually need form elements. These elements are created to expect certain inputs and match what would be expected on the backend and what’s stored in your app’s database.

In the next section, you’ll create two new components for your `books` app:


- LoginView to display a form asking for the user’s username and password;
- SignupView to display a form asking the user to create a new account.


> Code Along!
> Reopen your CodeSandbox from the last Exercise and continue coding along with the following demo!


#### Creating a Login Form

Start by making a new file under `src/components/login-view/login-view.jsx`. Then, create a new `LoginView` function component with two form fields and a submit button.


```js
export const LoginView = () => {
  return (
    <form>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
```

The following component will then be displayed in `MainView` when no user is logged in:


```js
const [user, setUser] = useState(null);

  if (!user) {
    return <LoginView />;
  }
```

Notice that a `state` variable has been added to keep track of whether a user is logged in. When no one is logged in, `LoginView` is displayed. When there is, it’s business as usual. If you’ve been following the `books` app demo project, this is what `MainView` should look like at this point:


```js
import { useState, useEffect } from "react";
import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
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



  if (!user) {
    return <LoginView />;
  }

  if (selectedBook) {
    return (
      <BookView book={selectedBook} onBackClick={() => setSelectedBook(null)} />
    );
  }

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onBookClick={(newSelectedBook) => {
            setSelectedBook(newSelectedBook);
          }}
        />
      ))}
    </div>
  );
};
```

Once you have this code running, you’ll be presented with a simple login form. The form will ask for `username` and `password` and will have a button to submit the form (which won’t work yet).


> Code Check!
> If you’ve been following along with the CodeSandbox demo, you can check out in detail what your code should look like here: 3.5 LoginView Component CodeSandbox. Use this code to troubleshoot if you’ve encountered any issues!


##### Verify Login Data

Now that you have the login form, let’s talk about how to allow users to submit and verify their login details so that they can access your app.

You’ll start by updating `LoginView` so when the form is submitted, the Open Library [Login API](https://openlibrary.org/dev/docs/restful_api#login) will verify `username` and `password`:


```js
import React from "react";

export const LoginView = () => {
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      access: username,
      secret: password
    };

    fetch("https://openlibrary.org/account/login.json", {
      method: "POST",
      body: JSON.stringify(data)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
      <button type="submit">
        Submit
      </button>
    </form>
  );
};
```

In this last bit of code, you can see a callback for the `onSubmit` event of form was added. This callback tells the Login API to validate `username` and `password`. But something’s missing—can you tell what it is?

If you write this code in your own CodeSandbox, you’ll get an error stating that `username` and `password` aren’t defined!

![An error message displayed in CodeSandbox explaining that username and password are undefined](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.5/username-password-notdefined.png)


###### Figure 1. Error notifications from CodeSandbox will let you know if any parts of your code are undefined.

This means you’ll need to assign the value of the form fields to two new state variables so you can use them here. This is known as `binding`.

In HTML, form elements typically maintain their own state and update it based on user input. In React, mutable state is usually kept in the component’s state. You can combine the two by making the component state the “single source of truth” and also by keeping the state up to date on subsequent user input. To achieve this, you’ll set both the `value` and `onChange` properties of the form field to use a state variable:


```js
<input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
```

Both `username` and `setUsername` should come from `useState()` (make sure you import `useState` into login-view.jsx):


```js
const [username, setUsername] = useState("");
```

Note that the previous line needs to go just after the `export const LoginView` line in your code.

Now, do the same for the `password` input. Make sure you’re importing `useState` in your import statement!

Once you’ve made these changes, test the login form with the following credentials:


- username: 167OLdP5BUfLZGxP
- password: K39eKYhPMV9DDWhJ

With your browser `Network` tab open (right-click → Inspect → Network), try logging in with your username (display name) and password and you’ll see the requests being sent to the Login API. Try it with an incorrect username or password to see the different responses.


> Login Credentials
> You can use these credentials throughout the rest of the Achievement to test your demo Books app as you build it. Store them in an easily retrievable spot on your device!
> 
> If you want to create your own credentials, head to the Open Library 
> signup page to create a free account. You’ll need to verify your login information via email, and will then be asked to log in to the Internet Archive (Open Library) portal to finish the verification. Use this Internet Archive API Key page to retrieve your access and secret keys—you can use them as username and password respectively.

The last piece you need to build is a way for `LoginView` to notify `MainView` that the login was successful. To do so, you’ll pass a prop from `MainView` with a callback function that will update the current user. Go back to `MainView` and update the following:


```js
if (!user) {
    return <LoginView onLoggedIn={(user) => setUser(user)} />;
  }
```

Then, let’s update `LoginView` to first take this prop:


```js
export const LoginView = ({ onLoggedIn }) => {
```

And to call it when the login request succeeds:


```js
fetch("https://openlibrary.org/account/login.json", {
      method: "POST",
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert("Login failed");
      }
    });
```

Now, when a user logs in successfully, they’re taken to the list of books in `MainView`!


> Code Check!
> Head to the CodeSandbox: 3.5 React Forms Login Verification to check and troubleshoot your code.

Fantastic job! You’ve implemented the login form and user verification. Let’s move on to implementing validation for your login form.


##### Form Validation

In Exercise 2.10: Data Security, Validation & Ethics, you secured your API by implementing server-side form validation; this means users can only log in or register if they enter data in the correct format. Upon submitting a `POST` request, your users will be told if they’ve submitted data in an incorrect format based on the HTTP response from the server.

To enhance the user experience, you can add client-side form validation into your frontend. The client-side version of form validation checks the user’s information and tells them if they’ve inputted errors before the request reaches the server.

The UI will alert the user that they need to fix something before the form can be submitted. In this section, you’ll implement validation for the login form you just created.

Let’s begin by specifying that both `username` and `password` are required fields:


```js
<form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
```

As you can see, you just need to add the `required` attribute to the `input` elements. Try submitting the form without entering any data; you should see a warning saying “Please fill out this field.”


> There are other built-in attributes you can use such as minlength, maxlength, and pattern. Learn more about them by checking out the Mozilla page on client-side validation.
> 
> To get more practice with form validation, try adding a minLength attribute to the username’s input!


##### Logout

At this stage, you might be wondering how to allow users to log out. This is done by adding a new button in your app’s `MainView` as well as adding an `onClick` handler, which resets the user state variable.

For example, you could add a button like this in your `main-view.jsx` file:


```js
<button onClick={() => { setUser(null); }}>Logout</button>
```

![MainView featuring a new logout button](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.5/logout-button-mainview.png)


###### Figure 2. Adding the previous code will create a shiny new logout button directly in MainView!


> Troubleshooting
> Not sure where to put the code? Check out the placement of the various lines of codes in your other components, and imitate what you’ve added there in terms of structuring your files. 
> 
> Most importantly, be very careful with your syntax and indentation. For example, remember that a component can only return one root element, so you need to “wrap” your elements. 
> 
> If you don’t, you might see an error like the one in Figure 3!
> 
> 
> 
> Figure 3. If you’re not careful with your syntax, you’ll receive an error that will need correcting!
> 
> Take a look at CodeSandbox: 3.5 React Forms Validation and Logout to check and troubleshoot your code.


#### Authentication Measures


> Note! 
> The content in this section isn’t relevant to the Books demo app you’ve been following along with in this Exercise. However, you’ll need to apply this code and logic to your myFlix app’s login component in the task, so this section will walk you through the process!

Let’s pause for a moment to review the authentication and authorization logic you implemented in the previous Achievement: basic HTTP authentication for logging in users and JWT token-based authentication for all subsequent requests against your API endpoints.

With JWT authentication, when the client makes a request to the app’s server-side, the server generates a web token. This token represents an encoded version of some claim—the client’s identity and what they’re authorized to access, for example—and sends this token back to the client. The client stores this JWT and sends it alongside every subsequent request to the API. The server then validates it in order to verify the client’s identity and process its requests.

On the client-side, you need to ensure you’re storing this token for your authenticated user and sending it alongside each request to the server. This will ensure that the currently logged-in user can access the different views in your SPA.

So, when the time comes for you to work on your myFlix app, the login function in `LoginView` will also need to be updated to send the `token` to `MainView`:


```js
const data = {
      Username: username,
      Password: password
    };

    fetch("YOUR_API_URL/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
```

Note the two main changes in this piece of code:


1. .then((response) => response.json()): This transforms the response content into a JSON object that your code can use to extract the JWT sent by the myFlix API.
1. onLoggedIn(data.user, data.token);: You then pass the user and token back to MainView so they can be used in all the subsequent API requests.

Finally, in `MainView`, you’ll need to store the `token` as a state variable in addition to `user`.


```js
const [token, setToken] = useState(null);

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }
```

It’s important to note that state variables re-render (update) the UI every time their value changes whereas regular variables don’t. In this case, you want all of the movies to load when the user logs in. However, `token` is initially blank, meaning no movies are loaded. To change this, you’ll set it to the token you get back from the login API. At that moment, the UI will update and load the list of movies using the token.

And by passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API.


```js
useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixmoviedb.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, [token]);
```

Notice that you’ll need to add `token` to the second argument of `useEffect()`. This is known as the dependency array, and it ensures fetch is called every time `token` changes (for example, after the user logs in). An `if` statement has also been added to check for `token`, as there’s no reason to execute the fetch call if there’s no token yet.

Since you’ve now added a token check, make sure to also nullify `token` when the logout button is clicked:


```js
<button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
```


#### Persisting a Login Session


> Note!
> Just like the previous section, this section won’t be relevant to your Books demo app but will be used in your myFlix project.

While working on earlier tasks, you probably noticed that every time your app is loaded (via a page refresh, for example) the user has to reauthenticate, even if they had just logged in. The reason for this is that the `user` object and `token` are stored in state variables, which are ephemeral. This means they’re temporarily stored in memory while the app is running and are cleared as soon as the tab is closed or reloaded.

To persist the authentication state between executions of the app, you’ll need to use a mechanism to save the `user` object and `token` whether the app is running or not. Luckily, modern browsers support `localStorage`, which allows data storage across browser sessions.

This means you can update the `LoginView` so that after a successful login, the `user` object and `token` will be stored using `localStorage`:


```js
...
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
        ...
```

Now, you can use whatever is in the `localStorage` as the default value of `user` and `token` states in `MainView`:


```js
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


 useEffect(() => {
   if (!token) return;

   fetch("..../movies", {
     headers: { Authorization: `Bearer ${token}` },
   })
     .then((response) => response.json())
     .then((movies) => {
       setMovies(movies);

     });
 }, [token]);

  // rest of the code
}
```

So, when you reload the page, the `user` and `token` will be initialized with whatever is in `localStorage`. If it’s empty, both will be initialized with `null`.

`null` will also represent the state when no user logged in (for both `token` and `user`). In this case, `useEffect` will skip the fetching process because there’s no token (no user logged in). This is because of the line `if(!token) return ;`.

Also, remember to update your logout button to clear any values that were stored in `localStorage`:


```js
<button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
```

With these changes, the user will stay authenticated between page loads! Cool, right?


#### Creating a Signup Form

In order for users to log in, they need to be registered users of your app; for that, you need to provide an option them to sign up! Let’s now walk through the steps to add a signup component to the Books demo app you’ve been working on throughout this Exercise. Note, however, that Open Library doesn’t have a signup endpoint. So while you can practice creating the component, you won’t be able to hook it up with the API.

Similar to the login form process, start by creating a new function component `SignupView` under `src/components/signup-view/signup-view.jsx`. Then, you’ll follow these steps:


1. Create a function component with a form and a submit button.
1. Display SignupView on MainView along with LoginView.
1. Add input fields to the signup form that match your backend validation logic.

Let’s have a go, starting with the form and the submit button!


> Try it!
> The following code should just be used as a guide to check your work. Go ahead and create a SignupView component on your own first!


```js
export const SignupView = () => {

  const handleSubmit = (event) => {};

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
};
```

Now, in the `MainView` component, let’s display your newly created `SignupView` along with the existing `LoginView`. Make sure that `SignupView` is imported in main-view.jsx:


```js
if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }
```


> Tip!
> Something not working? Remember to import your new SignupView components into your MainView component!

This will give the user the option to either log in or sign up once the app loads. Note that, for now, your signup option is just a button—you’ll change that in a moment.

![MainView displaying the login function, with spaces to enter a username and password and a submit button](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.5/login-signup-options.png)


###### Figure 4. The login form in MainView.

Let’s imagine that the fields needed to create a new account are similar to your myFlix requirements: `username`, `password`, `email`, and `birthday`. So, go ahead and add one `input` for each field as well as state variables to access their values:


```js
import{ useState } from "react";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
```

Note how the `types` were used to help the browser display the correct element; for example, the `input` for `birthday` has a date picker as well as built-in validation.

![MainView displaying the login and signup functions, with spaces to enter a username, password, email address, and birthdate](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.5/login-signup-forms.png)


###### Figure 5. The login and signup forms in MainView.

Finally,  `handleSubmit` needs to make an API call to the signup URL passing the form data:


```js
const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("SIGNUP_URL", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };
```

If the call succeeds, an `alert` dialog will be displayed with the message “Signup successful.” The page will then be reloaded so the user can log in with their newly created account. In this case, however, this function won’t work because the Open Library API doesn’t have a signup URL. When the time comes to implement the signup form for your myFlix app, you can replace `SIGNUP_URL` with your API address.


> Note!
> In a later Exercise, you’ll learn about client-side routing and how you can add links so the user can navigate between different views. This will allow you to display the LoginView and the SignupView independently rather than side by side.


#### Summary

You’ve made quite a bit of progress in this Exercise. Great job! You learned how to implement a login flow and a signup flow in a React app, including how to handle user authentication and validating form inputs. Forms are a critical part of development with React, so this will serve you well in any role you land as a web developer. All of this information and practice was gearing you up for the task, which will see you develop login and signup flows for your own app!

So, what are you waiting for? Let’s get started!


#### Resources

If you’re curious to read more about the topics covered in this Exercise, then we recommend taking a look at the following resources. Note that this reading is optional and not required to complete the course.


- How to Use HTML5 Form Validations with React
- Using the reportValidity Method
- Form Validation Refresher from Intro to Frontend Development
- Mozilla Documentation: localStorage

Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

In this task, you’ll continue building your React app for your myFlix API from Achievement 2. Mainly, you’ll be implementing a few new views that will require you to create React forms and apply validation and authentication. Refer to your [Achievement 3 project brief](https://images.careerfoundry.com/public/courses/fullstack-immersion/full-stack-project-briefs/A3-Project-Brief-2022.pdf) for help with designing your myFlix app to ensure it meets the requirements.

Your project structure should resemble the following (as far as the source code is concerned):


```js
myFlix-client
    - package.json
    - src
      - index.html
      - index.jsx
      - index.scss
      - components
          - login-view
            - login-view.jsx
          - signup-view
            - signup-view.jsx
          - main-view
            - main-view.jsx
          - movie-card
            - movie-card.jsx
          - movie-view
            - movie-view.jsx
```

Part 1

First, follow these directions to revert your authentication hack from the last Exercise.

Directions


1. Create a new branch off your myFlix API repository from Achievement 2.
1. Re-enable token-based authentication on your /movies endpoint.
1. Create a pull request.
1. Merge your changes with the main branch.
1. Update your app in Heroku.

Part 2

Now, it’s time to create and integrate some forms for your myFlix app!

Directions


1. Create a new GitHub branch off of the main branch.
1. Add a login view to your myFlix API, allowing your users to log in to the app. Refer to your API and business logic to make sure you’re asking your users for the right information in the login form.
1. Add a logout button to your main view so logged in users can log out.
1. Apply form validation and authentication logic to your login form.
1. Ensure the login details are stored in localStorage so the login session persists until the user logs out.
1. Create a signup view for your app. Refer to your API and business logic to make sure you’re asking your users for the right information in the signup form.
1. Integrate the login and signup view with MainView so they’re displayed as the first screen for non-authenticated users. Upon login, users should see both the list of movies and the button to log out.
1. Make sure to send the authentication token along with the fetch requests in main-view.jsx to get all movies from your authenticated /movies endpoint on the backend.
1. Push to your branch, then go to your repository and create the pull request.
1. Create a zip file of your project repository on your computer. Be sure you've zipped the version from your new branch!
1. Create a pull request, and send both the link to your pull request and the zip file of your repository to your tutor to review.
1. Once your submission is approved, merge the branch into the main branch.

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](https://cdn.careerfoundry.com/assets/rubrics/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c.svg)


- Creation of new form component files attempted; BUT
- Form component files unsuccessfully integrated into app; OR
- Forms incomplete or contain major errors, e.g., no validation or authentication measures applied

![](https://cdn.careerfoundry.com/assets/rubrics/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87.svg)


- Creation of new form component files attempted; AND
- Form component files successfully integrated into app; BUT
- Forms contain minor syntax errors

![](https://cdn.careerfoundry.com/assets/rubrics/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4.svg)


- Creation of new form component files successful;
- Form component files successfully integrated into app and the app functions as intended; AND
- Forms contain no syntax errors

