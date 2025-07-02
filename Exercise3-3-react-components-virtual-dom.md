
## Client-Side Programming & React


# 3.3: React Components & the Virtual DOM


- Learning Goals
- Introduction
- Your React App
- Single-Page Applications
- Creating Components
- Component Data: State and Props
- Component’s State
- Component Props
- Handling Events
- The Virtual Dom
- Summary
- Resources
- Task
- Forum


#### Learning Goals


- Distinguish between states and props of React components
- Create React components using JSX
- Create connected React views for a single-page application (SPA)
- Integrate child and parent components effectively


#### Introduction

Welcome back! In the previous Exercise, you began learning about React and why it’s the most suitable framework for your myFlix app. In particular, you looked at how React makes it easier to increase an app’s scope over time, and also learned about the framework’s modular approach to development. You then touched on some other benefits, including React’s comprehensive documentation, useful ecosystem of tools, active developer community, and readability. All these benefits have made React the de facto standard for building modern web apps.

Now, it’s time to take things one step further and use React to start building your myFlix app. The original intention behind React was to provide a tool for building user interfaces, one that would provide a solid foundation for the creation of component-based web apps. Ultimately, that makes it a great choice for developing your myFlix app!

In this Exercise, you’ll explore React’s syntax before getting to work building the first views and components for myFlix. By the end of this Exercise, you can expect to have some of myFlix’s key functionalities up and running. Without further ado, let’s get started!


#### Your React App

Throughout this Achievement, you’re going to implement the frontend for the API you designed in Achievement 2. Before diving into the specifics of React, let’s take a moment to review the general structure of your app. According to the guidelines in your [Achievement 3 project brief](https://images.careerfoundry.com/public/courses/fullstack-immersion/full-stack-project-briefs/A3-Project-Brief-2022.pdf), your app should be built using React, have several views, and follow a predefined set of functional and technical requirements.

A view is the presentation of a piece of content on the frontend, usually consisting of an interactive graphical interface and (optionally) charts, tables, forms, or other UI components. The view is what’s displayed to the user in their browser when they use an app.

By the end of this Achievement, you’ll have finished the frontend for your app, which will consist of one main view that will switch between the following subviews:


- A Login view;
- A Signup (user registration) view;
- A Movie view;
- A Profile view.

Each view that was just listed will be treated as a separate component in React. Here’s an illustration of how the components will be arranged:

![React components nested within the MainView component of your single-page application](images-md/misc/myflix-mainview_1750639485725.png)


###### Figure 1. Each view is represented by a separate component in React. The “MainView” component will represent the main view of the app, with each subview component within that main view.


#### Single-Page Applications

How is it, though, that you can fit all these subviews into a single main view? It all comes down to the type of app that myFlix is—in this case, a single-page application. A single-page application, or SPA, is a web app that houses all of its UI parts and components within a single page. This is in contrast to traditional websites that consist of multiple pages.

A good example of a traditional website is the portfolio website you developed in your Intro to Frontend Development course. Your portfolio website consisted of multiple pages (“index.html,” “about.html,” “contact.html,” and “works.html”), and switching between pages required the browser to reload the target page once it was fetched from the server, as shown here:

![Animation of a computer making different requests to the server to load the home, about, and contact pages of a portfolio page](images-md/misc/server-requests_1750639485981.gif)


###### Figure 2. Each time you click a button to go to a new page within your portfolio site, a request is sent to the server, and an entirely new page is sent back and displayed within the browser.

If you were to build that same portfolio site as an SPA, you’d create a single page (let’s call it the “main,” or “root,” view) that included the navigation bar and footer. From there, you’d have subviews such as “home-view,” “about-view,” “contact-view,” and “work-view.” Rather than reloading the entire page each time you wanted to look at a different part of your site, only the subviews would be switched out. This can be done by adding JavaScript code that switches between the views based on a user’s actions (e.g., a mouse click). The following animation shows how your portfolio site would work if it had been developed as an SPA:

![Computer making a request to the server for a single-page application, then switching out individual subviews](images-md/misc/server-requests-spa_1750639486316.gif)


###### Figure 3. In an SPA, one overarching view represents the app’s main view, and the individual subviews (which, in this case, would be your “About” page, “Contact” page, etc.) are switched out whenever the user clicks a button.

Once the app is loaded into the client-side, it then switches between subviews without the need to download them from the server.

Having every view or subview downloaded on the user’s first visit doesn’t mean that the app won’t ever contact the server again—there will still be cases where you need to make requests to the server, usually to acquire data. Imagine, for example, an app with a login screen. When a user tries to log in, the app sends a request message containing the user’s credentials to the server asking for user authentication. The server then sends back a response confirming whether the user has been logged in successfully. If successful, the client-side can switch to the “home-view” or some other user-only view; otherwise, the app will display an error message.

Why is all this information about SPAs so important? Well, that’s how React works! And as you’re going to be building the frontend of your app in React, this means you’ll be building it as an SPA. It’s important that you understand how an SPA differs from a plain HTML page, as this will help you visualize how your app will work.


#### Creating Components

A React component encapsulates the logic and styling for a piece of a UI. Components allow you to split a UI down into its individual parts, making it easier to build, maintain, and scale. Components are similar to JavaScript functions, in that they’re independent and reusable pieces of code. Just like functions can be composed of other functions, components can contain several more components within themselves. This helps in creating more complex design and interaction elements. As an example, let’s break down the Facebook index page into components:

![Annotated Facebook login page, which has several different components](images-md/misc/sample-components-facebook-home_1750639486574.png)


###### Figure 4. Source: Facebook

The main component is the `Page` component, encompassing the whole window view. Within that component, three nested components are displayed side by side: the `Title`, `Footer`, and `Login` components. As you can see, the different sections of the UI can be expressed by different components that come together to create the full `Page` component. These individual components can then be reused elsewhere throughout the Facebook app, should they be relevant to other features.


> Naming Components
> React’s documentation states that component names must begin with a capital letter; otherwise the names will be confused with HTML elements.

Before you continue working on your “myFlix-client” directory, you first need to learn how to create components in React and how to combine these components to create a more complex UI. This Exercise will run through a demo project to help you learn about components and their syntax.


> Code along!
> The demo will use CodeSandbox, an online editor for quick prototyping. It's similar to REPL, in that you can fork existing projects and then manipulate the code to suit your needs, rendering the UI side by side. 
> 
> You’ll need to follow along with the demo in the Exercise to familiarize yourself with the syntax you’ll need to use for your own project. So, head to the 3.3 React Components & the Virtual DOM sandbox. The first thing you’ll want to do is “fork” this sandbox so you can start coding along with the demo in your own version (just like when you worked with REPLs in earlier Exercises!). On the page, click on the Fork button. You’ll then be asked to create a free account. You can also choose to sign in with GitHub.

In your new React demo directory, you can see that some files have already been created. The directory is in the same state as your own project directory, with a “.jsx”, a “.scss”, and an “.html” file. The demo picks up where you left off in the last Exercise, so you can directly apply what you learn from this demo to your own project in this Exercise’s task.

In fact, the demo app is structured just like your myFlix app. The demo project that’s been prepared for you is for an online education platform sharing resources about JavaScript. The main view of this project is a “home” page, where students can explore different resources on JavaScript. From this main view, students can see a list of card components displaying basic information about different books/resources. They can click on these cards to access more information about each of the books/resources.

Now that you’ve learned a bit more about the demo app, it’s time to create the first component. The first component will be `MainView`, which will house all the other components (as demonstrated in Figure 1). However, the first step is to prepare your directory following industry-standard protocols for React apps.


##### Prepare Your Directory

To create your `MainView` component, create the following files and folders:


1. Create a “components” folder (or “directory”) within your “src” folder. To do so, right-click on the “src” folder, and select Create Directory.
1. Inside your new “components” folder, create another folder called “main-view”. This new folder will contain everything related to the MainView component.
1. Within “main-view”, create a new file called main-view.jsx. To do so, right-click on the “main-view” folder, and select Create File.

Once finished, your folder structure should look like this:


```js
- src
    - components
      - main-view
        - main-view.jsx
    - index.html
    - index.jsx
    - index.scss
  - package.json
```

Because of React’s component-based nature, you’ll want to always set up and organize your folder structure in this way, giving each component its own folder.


> NOTE!
> The folder structure just mentioned is the industry standard for development using React. Make sure you follow it!


##### Creating a MainView Component

For your project in this Achievement, your `MainView` component will act as the main homepage of your myFlix SPA. From this homepage, users will be able to access information about different movies, create a profile, and so on. The `MainView` component of the demo app will follow this same structure, only in this case users will be able to access information about different JavaScript resources.

It’s time to create the `MainView` component for the demo app! Open the newly created “main-view.jsx” file and write the following code:


```js
export const MainView = () => {
  return (
    <div>
      <div>Eloquent JavaScript</div>
      <div>Mastering JavaScript Functional Programming</div>
      <div>JavaScript: The Good Parts</div>
      <div>JavaScript: The Definitive Guide</div>
      <div>The Road to React</div>
    </div>
  );
};
```

Let’s dissect the code to better understand what it means.

Starting from the top, you’ll see the line `export const MainView = () => {`.

Here, the `export` keyword exposes the `MainView` component. Exposing a component makes it available for use by other components, modules, and files—in other words, you’ll be able to `import` the component into other files. You learned how to `import` and `export` Node modules back in [Exercise 2.2: Node.js Modules](https://careerfoundry.com/en/steps/node-modules#node-modules). This is the same concept, only with React components!


> Differences in Syntax: Export
> Sometimes, you may see the export keyword included on a separate line, like so:
> 
> const MainView = () => {
>   ...
> }
> export MainView;
> 
> Instead of being included with the const MainView = () => {...} line, the export MainView element has been given a line of its own. This is a different way to write the syntax, but it has no effect on the results!

After the `export` keyword comes `const MainView = () => {...}`. This creates the `MainView` component. The `const` keyword states that the identifier `MainView` can't be reassigned.

Then a function is assigned to `MainView` that returns the visual representation of the component—in other words, the function renders what will be displayed on the screen. Inside this function is JSX, though it looks like HTML code. JSX is similar to HTML—to the point that you could use plain HTML instead of JSX here if you wanted (barring a few exceptions). You’ll look at JSX more closely in the next section.


> Differences in Syntax: Functions
> This example used arrow function syntax, which is a succinct alternative to a traditional function expression. You can use either syntax to define your components:
> 
> function MainView() {
>   ...
> }
> export { MainView };
> 
> You can read more about arrow functions in the Mozilla docs.

After adding this code, you now have a `MainView` component in your app. However, you haven’t used it anywhere yet, which is why nothing happened. Before getting into this next step, let’s go over a couple of concepts to be aware of when creating React components: root elements and JSX syntax.

A Component Can Only Have One Root Element

A critical rule to remember is that a component can only have one root element when returning a chunk of UI. For instance, the following code will raise an error because there are two root elements: the outermost `<div></div>` and the newly added `<button>`.


```js
export const MainView = () => {
  return (
    <div>
      <div>Eloquent JavaScript</div>
      <div>Mastering JavaScript Functional Programming</div>
      <div>JavaScript: The Good Parts</div>
      <div>JavaScript: The Definitive Guide</div>
      <div>The Road to React</div>
    </div>
    <button>Test</button>
  );
}
```

To fix this, you need to surround the `<div>...</div>` and the `<button>Test</button>` with yet another `<div>` or `<span>`, grouping them together so they’re seen as part of the same overarching element. This is done in the following code:


```js
const MainView = () => {
  return (
    <div>
      <div>
        <div>Eloquent JavaScript</div>
        <div>Mastering JavaScript Functional Programming</div>
        <div>JavaScript: The Good Parts</div>
        <div>JavaScript: The Definitive Guide</div>
        <div>The Road to React</div>
      </div>
      <button>Test</button>
    </div>
  );
}
```

Instead of a `<div>` or `<span>`, you can also use a piece of built-in React markup: `<React.Fragment></React.Fragment>`. This markup acts the same as if you were creating a new `<div>` or `<span>`, as can be seen in the following code:


```js
import React from "react";

export const MainView = () => {
  return (
    <React.Fragment>
      <div>
        <div>Eloquent JavaScript</div>
        <div>Mastering JavaScript Functional Programming</div>
        <div>JavaScript: The Good Parts</div>
        <div>JavaScript: The Definitive Guide</div>
        <div>The Road to React</div>
      </div>
      <button>Test</button>
    </React.Fragment>
  );
}
```


> NOTE!
> For this code to work, you need to import React with import React from "react";. This is needed to let the build process know where it can find the <React.Fragment> component.

As the built-in React markup can be long and unwieldy, you can also use the shorthand, `<></>`, which would look like this:


```js
import React from "react";

export const MainView = () => {
  return (
    <>
      <div>
        <div>Eloquent JavaScript</div>
        <div>Mastering JavaScript Functional Programming</div>
        <div>JavaScript: The Good Parts</div>
        <div>JavaScript: The Definitive Guide</div>
        <div>The Road to React</div>
      </div>
      <button>Test</button>
    </>
  );
}
```

Any of these methods will produce the same result. If you’re following along in CodeSandbox, feel free to try out the different methods to get a feel for how they look. Once finished, however, for the sake of the example, make sure you revert the code in your “main-view.jsx” file back to the following before moving on:


```js
export const MainView = () => {
  return (
    <div>
      <div>Eloquent JavaScript</div>
      <div>Mastering JavaScript Functional Programming</div>
      <div>JavaScript: The Good Parts</div>
      <div>JavaScript: The Definitive Guide</div>
      <div>The Road to React</div>
    </div>
  );
}
```

JSX Syntax

JSX is a special JavaScript syntax that lets you do more with JavaScript code. JSX looks a lot like HTML, and it can be transpiled by Babel into vanilla JavaScript code. You can see this for yourself using the [Babel repl tool](https://babeljs.io/en/repl) (paste something like `<div>Hi</div>` in the editor on the left-hand side). The key thing to remember about JSX is that a browser can’t understand it directly, hence the need for a compiler like Babel. This means there are two things you need Babel to compile for you: your ES6 code (e.g., your `import` and `export` statements), and your JSX code.

You can think of JSX code as if it’s regular HTML code, although there’s a few common guidelines to be aware of when adding it:

Embedding Expressions: You can embed expressions (e.g., `1+1`) and JavaScript variables into JSX code so long as you surround them in curly braces `{` and `}`, for example:


```js
const MyComponent = () => {
  let name = "John";
  let num = 5;
  let obj = {x: 32, y: 64};
  return (
    <div>
      <p>Hello {name}!</p>
      <p>{5 + num}</p>
      <p>{Math.random()}</p>
      <p>{obj.x}</p>
    </div>
  );
}
```

Assigning Classes: You can assign classes to elements by adding them to the attribute `className` (as opposed to `class`). Say, for example, that you wanted to add the `box` and `selected` classes to a JSX element. You could do so like this:


```js
<div className="box selected">JSX is cool!</div>
```

Instead of via the regular HTML syntax:


```js
<div class="box selected">JSX is cool!</div>
```

Nesting Elements: You can nest elements in JSX the same as you would in HTML. If an element doesn’t have any children, you can write it like this:


```js
<div />
```

Rather than:


```js
<div></div>
```

This is similar to how you’d write an `<img>` element in normal HTML.

Including Other Components: If you create a component called `MainView`, you can use it in your app by including the `<MainView />` element in your code. You’ll explore this further in the upcoming sections, but for now, this is all you need to know to create a basic component.


##### Importing the MainView Component

As you’re already aware, `src/index.html` represents the entry point of your app. That’s why you supply it to the `parcel` command when you run it. The file contains the following code:


```js
<!DOCTYPE html>
<html>
  <head>
    <title>Your-App-Name</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="index.jsx"></script>
  </body>
</html>
```

Notice that this entry file also includes the `index.jsx` file (`<script type="module" src="index.jsx"></script>`), which means that `src/index.jsx` is the place where React code is bootstrapped. This is where you’ll import and use your `MainView` component.

To import components into other JavaScript or JSX files, use the following syntax:


```js
import { ComponentName } from '[path to the component file]';
```

For example, to import `MainView` (which exists in `src/components/main-view/main-view.jsx`) to `src/index.html`, the code would be:


```js
import { MainView } from './components/main-view/main-view';
```


> Keep in mind that the thing you’re trying to import must be exported first (which is the case with MainView), otherwise you’ll get an error.

The first `./` indicates that the path will start relative to the folder containing the file you add this line of code to—in this case the “src” folder. You don’t need to include the file extension when importing from JavaScript or JSX files in React; that’s why you won’t find `.jsx` after the filename `main-view` in the import statement.


> Note
> MainView must be enclosed in curly braces because it was exported using the “named export” method. The alternative would be the “default export” method, where the default keyword is added in main-view.jsx. If you want to learn more about when to use named export or default export, take a look at "Named Export vs Default Export"

Next, add the import statement to `index.jsx`, right after `import { createRoot } from "react-dom/client";`:


```js
import { createRoot } from "react-dom/client";

import { MainView } from "./components/main-view/main-view";

import "./index.scss";
```

Now that you’ve imported `MainView` into `src/index.jsx`, let’s use it! Go ahead and replace the UI returned by the `App` component:


```js
<div>
  <h1>Hello React!</h1>
</div>
```

With:


```js
<MainView />
```

The final `src/index.jsx` code should look like this:


```js
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";

import "./index.scss";

const App = () => {
 return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
```


> TIP!
> As src/index.jsx is the file that contains the first React code to be executed, wouldn’t this make the App component created in it the “real” root component rather than MainView? Well, yes it does. However, the MainView component is where most of the UI coding will be. It’s better this way because src/index.jsx will only have one job, which is to bootstrap the React code and nothing else.

The short format has been used when adding `MainView` (`<MainView />`, as opposed to `<MainView></MainView>`), as there are no nested elements in it right now.

You should now see a list of JavaScript books in the preview window on the right-hand side.

![List of JavaScript books in preview window](images-md/misc/js-books-list-mainview_1750639486769.png)


###### Figure 5. Preview window showing list of JavaScript books.

Throughout the rest of this Exercise, you’ll develop more components for your demo project. For example, each of the `div` elements in your `MainView` containing a book title will become a reusable “child” component of the parent `MainView` component. This “child” will be your reusable `BookCard` component. When a student clicks on the book card, a “BookView” will open (a subview of your main view), where they can see more details about the book.


> Note
> The architecture of these components and how they’re connected is exactly like what you’ll need to build for your Achievement project, so working through the demo yourself will provide you with plenty of practice to prepare you for your project tasks!

Before moving on to creating the `BookCard` component, let’s take a look at another important React concept: how data flows throughout a React app.


#### Component Data: State and Props

So far, you’ve created a component that displays a static hardcoded piece of UI and a list of five books. The list can’t be dynamically changed or controlled in its current shape, but you don’t need to worry about that in this app. It would make sense to have a “books” array somewhere in the component that can be filled with data fetched from an API. So where should this `books` variable exist within the `MainView` component? Well, React is designed to have a component’s data reside in two places: the component’s state and props.


#### Component’s State

In React, you can think of a component’s state as a set of variables with special rules. These special variables serve two purposes for a component:


1. They temporarily store data so that it can be used later on, like a normal variable;
1. They represent what the UI should look like. In other words, if you look at the values stored in the component state, you should be able to tell what the component’s UI will look like.

When using React, the UI isn’t modified directly from the code. For instance, you won’t code commands like “show or hide the card,” or “enable or disable the button,” like you did back in Achievement 1. Instead, you describe the UI based on the current state of the component (“empty books list”, “one card for each book”, etc.), and then trigger the state changes in response to user input and API calls. Basically, the UI is a function of its state. With that in mind, let’s explore how you can use the component’s state to store a list of books.


##### useState

You can create and initialize a new state for a component with `useState`, a special function provided by React. To demonstrate `useState` in action, let’s take a look at how you can use `useState` in `MainView` to store a list of books. The following is code that will replace some of the code you currently have in your `main-view.jsx` file (a breakdown of what’s changed is after the code).


```js
import { useState } from "react";

export const MainView = () => {
  const [books, setBooks] = useState([]);

  return (
        // same code from before containing your book titles
  );
};
```

First, you call the `useState()` function (imported from React) with an empty array. This is the initial value of your `books` variable. The `useState()` function returns an array of paired values that you destructure (break down into variables) using the `const [books, setBooks]` syntax.

The statement `const [books, setBooks] = useState([]);` can technically be viewed as a shortened form of:


```js
let books = [];
const setBooks = function(newBookList){
  books = newBooksList;
};
```


> TIP!
> To learn more about array destructuring, check out the MDN array destructuring documentation.

This assigns the current state value to the `books` variable (what was initially given to `useState()`—in your case, an empty array). A method that updates the `books` variable is assigned to `setBooks`.

Currently, your state has been initialized with an empty list of books. The UI, then, will be based on what’s in the `books` state. If the list is empty, you’ll see nothing on the screen, because the `map` loop will be given an empty array. In this type of scenario, it’s useful to display a message like “The list is empty.”

Let’s adjust the code with this in mind, to see how you can use `MainView`'s state to control its UI:


```js
import { useState } from "react";

export const MainView = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "Eloquent JavaScript" },
    { id: 2, title: "Mastering JavaScript Functional Programming" },
    { id: 3, title: "JavaScript: The Good Parts" },
    { id: 4, title: "JavaScript: The Definitive Guide" },
    { id: 5, title: "The Road to React" }
  ]);

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {books.map((book) => {
        return <div>{book.title}</div>;
      })}
    </div>
  );
};
```


> The map() method in the code just shown maps each element in the books array to a piece of UI. So, after its execution, you have one <div>{book.title}</div> for each book. If you’re curious about the map() method, you can visit the Array.prototype.map() JavaScript documentation.

Notice how the state’s value has been used in a conditional statement to calculate the UI of the `MainView` component. If the state of `books` is an empty array, the message “The list is empty” will be displayed (try putting back `const [books, setBooks] = useState([]);`); otherwise a list of books will be rendered.

This is just one example of calculating the UI based on its state. It doesn't need to have a bunch of if-else statements. At times, you may not care when the array is empty—or, you may want to display some special piece of UI when the array has only one book. Be creative! It’s up to you how you want to tie the state to your UI.

To summarize, you started with a static list of books, which was hardcoded into the JSX. You then created a state variable, `books`, to manage the list of books, and moved the books’ definitions to the state variable. Doing this means the UI isn’t aware of where the data is coming from—its only concern is to render the UI from `books`. Setting it up this way will come in handy in the next Exercise, when you’ll update the code to fetch books from an API.


##### key Attribute

Next, you need to add the `key` attribute. In a local build, your console will raise a warning with the code you have so far:

![Screenshot of warning in console that a unique key prop is needed](images-md/misc/console-warning_1750639486988.png)


###### Figure 6. Warning appearing in console about the need for a “key” attribute.

This warning is raised when you have a list of elements of the same type rendered next to each other (in this case, your book titles). This can be avoided by adding the `key` attribute to the element being rendered. The value of the `key` attribute must be guaranteed to be unique. For this activity, you can use the `id` property of each book as the value because each book has a unique `id`.


```js
<div key={book.id}>{book.title}</div>
```

React wants you to do this because the `key` attribute helps it better distinguish between the similar elements in your list. As a result, it will be much easier for React to find the element that needs to be changed or removed from the DOM. This increased efficiency means your application will have better performance.


> Code Check! 
> How’s your CodeSandbox looking? Check out Figure 7 to see where you might need to tweak your syntax if you’re encountering errors.
> 
> 
> 
> Figure 7. Up-to-date CodeSandbox syntax.


#### Component Props

In React, you often need to pass data from a component’s state to one of its child components. This can be done using props (more on this soon). In this section, you’ll be creating a child component called `BookCard`. This component will represent a single book in the books list displayed in `MainView` and can be reused to render as many `BookCard`s as there are book titles. Each book is currently represented by a `div` element containing the book’s title. You’ll be replacing this `div` element with the new `BookCard` component.

The goals here are to learn how to pass data from a parent component (e.g., `MainView`) to a child component (e.g., `BookCard`) and to get a grasp on how to integrate a child component into the parent component.

Let’s get to it! Create a new folder called “book-card” inside the “components” folder, then create a file named `book-card.jsx`. Within that file, add the following code:


```js
export const BookCard = () => {
  return <div>some title</div>;
};
```

This code should be familiar to you. You’ve now created a `BookCard` component! However, it hasn't been put to use yet. So, let’s import it into the `MainView` component so that you can use it there. Add this import statement to `MainView`, somewhere after the existing import statements at the top:


```js
import { BookCard } from "../book-card/book-card";
```

Voila! This is how you import one component into another. In this case, a child component (`BookCard`) into a parent component (`MainView`).

You’ll use the `BookCard` component in a similar way to how you used `MainView` in `index.jsx`. Now, replace `<div key={book.id}>{book.title}</div>` with `<BookCard />`.

The following is the updated `MainView` component, where the imported component `BookCard` is used:


```js
import { useState } from "react";
import { BookCard } from "../book-card/book-card";

export const MainView = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "Eloquent JavaScript" },
    { id: 2, title: "Mastering JavaScript Functional Programming" },
    { id: 3, title: "JavaScript: The Good Parts" },
    { id: 4, title: "JavaScript: The Definitive Guide" },
    { id: 5, title: "The Road to React" }
  ]);

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookCard />
      ))}
    </div>
  );
};
```

When running the code, you’ll notice that you don’t get the desired result. The “BookCard” text has been returned, rather than the unique book titles being mapped onto each `BookCard` component.

![Console returning “BookCard” text, but not unique book titles](images-md/misc/books-list-not-unique_1750639487245.png)


###### Figure 8. Console not returning unique book titles.

To resolve this, you need to pass the `book` object from each iteration of the `map()` function to `<BookCard />`. This is done by adding a custom attribute before `/>` and setting its value to `book`. For example, `book={book}`:


```js
{books.map((book) => (
        <BookCard book={book} />
      ))}
```

You don’t have to use the name `book` if you find it confusing to use the same name as the `book` object you’re passing as a value. It could, for example, be `bookData={book}` instead. This kind of attribute is special, as it’s how you can pass data to a child component. In React, this type of attribute is referred to as props.

Passing the data is only half the story, though. You still need to extract that data within the `BookCard` component in `book-card.jsx` so you can use it instead of the “some title” filler text. You can get the passed data by accessing the `props` argument:


```js
export const BookCard = (props) => {
  return <div>{props.book.title}</div>;
};
```

It’s also very common to destructure the `props` argument so that its properties can be accessed directly:


```js
export const BookCard = ({ book }) => {
  return <div>{book.title}</div>;
};
```


> Tip! Destructuring Objects
> So, what’s going on here? The props object is being destructured. 
> 
> export const BookCard = (props) => {
>    const { book } = props;
>    return <div>{book.title}</div>;
> }
> 
> As this is new to you, you may want to take a moment to review the documentation on object destructuring.

Something you need to be aware of is the fact that `book` in `props.book.title` or in the destructured version `{ book }` is the name of the prop used in `<BookCard … />`. If you had `bookData` as the prop name, you’d use `props.bookData.title`.

![Console showing bookData example prop name](images-md/misc/bookData-prop_1750639487498.png)


###### Figure 9. bookData example prop name.

In the destructured version, you’d use `{ bookData }`. For this, reference `bookData.title` to access the book's title.

![Destructured example for prop name bookData](images-md/misc/bookData-prop-destructured_1750639487780.png)


###### Figure 10. Destructured bookData example prop name.

Keep in mind that this is true assuming that the prop that got passed from `MainView` is also named `bookData` for both cases:


```js
return (
  <div>
    {books.map((book) => (
      <BookCard key={book.id} bookData={book}/>
    ))}
  </div>
);
```


> Note
> Moving forward in this Exercise, it’s best to keep all prop names as book so that you can better follow along with the upcoming instructions. It will be assumed that the prop name is book from now onwards.

Now, you should get the same output as before, only this time using a custom child component `BookCard`. On the surface, it might not seem all that practical—after all, you did all this to get the exact same result as before. While it may have been simpler without using a custom component, this wouldn’t be the case if the child component were more complex than a singular `div` element. Throwing everything directly into the main component would quickly get messy!

The advantage of having granular components doesn’t stop there. Having the UI consist of granular components makes it easier for you to reuse these smaller components in different parts of your UI.

To recap, the most basic way components communicate with each other is via props, which are like “knobs” that you can adjust to alter the behavior of the components. Props allow you to work on both parent and child components independently, as long as parent components pass all the props expected by the child component.


#### Handling Events

The next step will be to create a new component that will allow users to see more details about each book. To that end, you’ll practice adding a click event listener to `<BookCard />` rendered inside `MainView`. When the card is clicked, this new component (`BookView`) will display more details about a single book.

Click for sound
  @keyframes VOLUME_SMALL_WAVE_FLASH {
    0% { opacity: 0; }
    33% { opacity: 1; }
    66% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes VOLUME_LARGE_WAVE_FLASH {
    0% { opacity: 0; }
    33% { opacity: 1; }
    66% { opacity: 1; }
    100% { opacity: 0; }
  }

  .volume__small-wave {
    animation: VOLUME_SMALL_WAVE_FLASH 2s infinite;
    opacity: 0;
  }

  .volume__large-wave {
    animation: VOLUME_LARGE_WAVE_FLASH 2s infinite .3s;
    opacity: 0;
  }
0:04
        @media (prefers-reduced-motion: no-preference) {
          @keyframes w-control-bar-fade-in {
            0% {
              opacity: 0;
              transform: translateX(50%) translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateX(50%) translateY(0px);
            }
          }
        }
      
      #wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset{font-size:14px;}
#wistia_chrome_65 #wistia_grid_94_wrapper div.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper span.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper label.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper fieldset.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper button.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper img.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper a.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper svg.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper p.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper a.w-css-reset{border:0;}
#wistia_chrome_65 #wistia_grid_94_wrapper h1.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper h2.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper h3.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper p.w-css-reset{margin:1.4em 0;}
#wistia_chrome_65 #wistia_grid_94_wrapper a.w-css-reset{display:inline;}
#wistia_chrome_65 #wistia_grid_94_wrapper span.w-css-reset{display:inline;}
#wistia_chrome_65 #wistia_grid_94_wrapper svg.w-css-reset{display:inline;}
#wistia_chrome_65 #wistia_grid_94_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_65 #wistia_grid_94_wrapper ol.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_65 #wistia_grid_94_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_65 #wistia_grid_94_wrapper ul:before.w-css-reset{display:none}
#wistia_chrome_65 #wistia_grid_94_wrapper ol:before.w-css-reset{display:none}
#wistia_chrome_65 #wistia_grid_94_wrapper li:before.w-css-reset{display:none}
#wistia_chrome_65 #wistia_grid_94_wrapper ul:after.w-css-reset{display:none}
#wistia_chrome_65 #wistia_grid_94_wrapper ol:after.w-css-reset{display:none}
#wistia_chrome_65 #wistia_grid_94_wrapper li:after.w-css-reset{display:none}
#wistia_chrome_65 #wistia_grid_94_wrapper label.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_65 #wistia_grid_94_wrapper button.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_65 #wistia_grid_94_wrapper img.w-css-reset{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset button::-moz-focus-inner{border: 0;}
      #wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree {font-size:14px;}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree div{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree span{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree label{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree fieldset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree button{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree img{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree a{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree svg{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree p{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree a{border:0;}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree h1{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree h2{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree h3{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree p{margin:1.4em 0;}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree a{display:inline;}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree span{display:inline;}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree svg{display:inline;}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree ol{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree ul:before{display:none}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree ol:before{display:none}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree li:before{display:none}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree ul:after{display:none}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree ol:after{display:none}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree li:after{display:none}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree label{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree button{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree img{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-tree  button::-moz-focus-inner{border: 0;}
      #wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-max-width-none-important{max-width:none!important}
      #wistia_chrome_65 #wistia_grid_94_wrapper .w-css-reset-button-important{border-radius:0!important;color:#fff!important;}
    #wistia_grid_94_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
#wistia_grid_94_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
#wistia_grid_94_above{position:relative;}
#wistia_grid_94_main{display:block;height:100%;position:relative;}
#wistia_grid_94_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_94_center{height:100%;overflow:hidden;position:relative;width:100%;}
#wistia_grid_94_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_94_top_inside{position:absolute;left:0;top:0;width:100%;}
#wistia_grid_94_top{width:100%;position:absolute;bottom:0;left:0;}
#wistia_grid_94_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
#wistia_grid_94_bottom{width:100%;position:absolute;top:0;left:0;}
#wistia_grid_94_left_inside{height:100%;position:absolute;left:0;top:0;}
#wistia_grid_94_left{height:100%;position:absolute;right:0;top:0;}
#wistia_grid_94_right_inside{height:100%;right:0;position:absolute;top:0;}
#wistia_grid_94_right{height:100%;left:0;position:absolute;top:0;}
#wistia_grid_94_below{position:relative;}


###### Figure 11. Video showing working BookView component

More data about each book needs to be available, so that more details are rendered in the `BookView` once each `BookCard` is clicked on. So, let’s update the array of books in `MainView` to include the image and the author of each book:


```js
const [books, setBooks] = useState([
    {
      id: 1,
      title: "Eloquent JavaScript",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
      author: "Marijn Haverbeke"
    },
    {
      id: 2,
      title: "Mastering JavaScript Functional Programming",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51WAikRq37L._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
      author: "Federico Kereki"
    },
    {
      id: 3,
      title: "JavaScript: The Good Parts",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg",
      author: "Douglas Crockford"
    },
    {
      id: 4,
      title: "JavaScript: The Definitive Guide",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51HbNW6RzhL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
      author: "David Flanagan"
    },
    {
      id: 5,
      title: "The Road to React",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/41MBLi5a4jL._SX384_BO1,204,203,200_.jpg",
      author: "Robin Wieruch"
    }
  ]);
```

You’ll notice that this new information isn’t immediately rendered in `MainView`, because so far your code specifies that you only want the book title rendered on each book card.

Now, let’s create our `BookView` component to display this new information. Create a new folder called “book-view” in your “components” folder, and create a `book-view.jsx` file within this folder. In this new file, add the code necessary to create a component that expects a prop (in the example code, it will be named `book`). The prop represents the `book` object, which will be passed in `MainView` once you import and use the new component there. The component will render whatever properties in the `book` object are passed as a prop.

![Diagram of MainView showing process of BookView appearing once BookCard is clicked](images-md/diagrams/component-events-diagram_1750639488007.png)


###### Figure 11. MainView - BookCard - BookView process.

Try to create the component with these specifications before reviewing the following code snippets. Does your `book-view.jsx` file code look like the following code?


```js
export const BookView = ({ book }) => {
  return (
    <div>
      <div>
        <img src={book.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{book.title}</span>
      </div>
      <div>
        <span>Author: </span>
        <span>{book.author}</span>
      </div>
    </div>
  );
};
```

By this point, you should have created the component and imported it into `MainView` (if not, try it now). Now, you need to implement the following logic:


- When clicking a book card, the app should display the clicked book’s details instead of the “book-card” list that’s already displayed.

However, you also need a way to identify whether there was a user click or not. This can be emulated by adding a new state variable into `MainView`’s state object. Let’s call it `selectedBook`:


```js
const [selectedBook, setSelectedBook] = useState(null);
```

The initial value of `selectedBook` state is going to be `null`. This tells the app that no book cards were clicked. However, if a user were to click on a book card you would need to update the `selectedBook` state to refer to the book object that was clicked, thus inducing the app to render that book’s details. This process reflects a key principle that you came across earlier this Exercise: in React, the UI is the function of its state.

To determine whether to render a specific part of the UI (`BookView`) in the `MainView` component, you’ll add a new state (`selectedBook`) as a flag, as shown in the following code (this is what `MainView` should look like):


```js
import { useState } from "react";
import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";

export const MainView = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Eloquent JavaScript",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
      author: "Marijn Haverbeke"
    },
    {
      id: 2,
      title: "Mastering JavaScript Functional Programming",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51WAikRq37L._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
      author: "Federico Kereki"
    },
    {
      id: 3,
      title: "JavaScript: The Good Parts",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg",
      author: "Douglas Crockford"
    },
    {
      id: 4,
      title: "JavaScript: The Definitive Guide",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51HbNW6RzhL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
      author: "David Flanagan"
    },
    {
      id: 5,
      title: "The Road to React",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/41MBLi5a4jL._SX384_BO1,204,203,200_.jpg",
      author: "Robin Wieruch"
    }
  ]);

  const [selectedBook, setSelectedBook] = useState(null);

  if (selectedBook) {
    return <BookView book={selectedBook} />;
  }

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
```

Adding `selectedBook` as a flag is similar to how the `books` state is used to determine when to render the list of books or a text message. The code examples that have been provided hopefully give you an idea of how you should think when designing applications in React.

Now, if you click on any book card, nothing happens. `selectedBook` will always have `null` value, so the `BookView` associated with the clicked book will never be rendered (because `if (selectedBook)` will be evaluated as false as long as `selectedBook`’s value is `null`). This is due to the fact that it hasn’t listened for user clicks.


##### Listening for Click Events in React

Listening for click events in React can be done by using a special attribute: `onClick`. This attribute accepts a function, and this function will be the callback function once the element is clicked. You can see this in the following code, specifically with the newly added `<button onClick={() => {alert('Nice!')}}>Click me!</button>` element that’s been included in your existing `return` statement:


```js
export const MainView = () => {

  // same code


  return (
    <div>
      <button
        onClick={() => {
          alert("Nice!");
        }}
      >
        Click me!
      </button>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
```

Testing this code should give you the expected result—that is, a new button reading “Click me!”. When clicked, an alert message containing “Nice!” will appear.

Click for sound
  @keyframes VOLUME_SMALL_WAVE_FLASH {
    0% { opacity: 0; }
    33% { opacity: 1; }
    66% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes VOLUME_LARGE_WAVE_FLASH {
    0% { opacity: 0; }
    33% { opacity: 1; }
    66% { opacity: 1; }
    100% { opacity: 0; }
  }

  .volume__small-wave {
    animation: VOLUME_SMALL_WAVE_FLASH 2s infinite;
    opacity: 0;
  }

  .volume__large-wave {
    animation: VOLUME_LARGE_WAVE_FLASH 2s infinite .3s;
    opacity: 0;
  }
0:07
        @media (prefers-reduced-motion: no-preference) {
          @keyframes w-control-bar-fade-in {
            0% {
              opacity: 0;
              transform: translateX(50%) translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateX(50%) translateY(0px);
            }
          }
        }
      
      #wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset{font-size:14px;}
#wistia_chrome_68 #wistia_grid_115_wrapper div.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper span.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper label.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper fieldset.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper button.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper img.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper a.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper svg.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper p.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper a.w-css-reset{border:0;}
#wistia_chrome_68 #wistia_grid_115_wrapper h1.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper h2.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper h3.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper p.w-css-reset{margin:1.4em 0;}
#wistia_chrome_68 #wistia_grid_115_wrapper a.w-css-reset{display:inline;}
#wistia_chrome_68 #wistia_grid_115_wrapper span.w-css-reset{display:inline;}
#wistia_chrome_68 #wistia_grid_115_wrapper svg.w-css-reset{display:inline;}
#wistia_chrome_68 #wistia_grid_115_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_68 #wistia_grid_115_wrapper ol.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_68 #wistia_grid_115_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_68 #wistia_grid_115_wrapper ul:before.w-css-reset{display:none}
#wistia_chrome_68 #wistia_grid_115_wrapper ol:before.w-css-reset{display:none}
#wistia_chrome_68 #wistia_grid_115_wrapper li:before.w-css-reset{display:none}
#wistia_chrome_68 #wistia_grid_115_wrapper ul:after.w-css-reset{display:none}
#wistia_chrome_68 #wistia_grid_115_wrapper ol:after.w-css-reset{display:none}
#wistia_chrome_68 #wistia_grid_115_wrapper li:after.w-css-reset{display:none}
#wistia_chrome_68 #wistia_grid_115_wrapper label.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_68 #wistia_grid_115_wrapper button.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_68 #wistia_grid_115_wrapper img.w-css-reset{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset button::-moz-focus-inner{border: 0;}
      #wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree {font-size:14px;}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree div{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree span{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree label{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree fieldset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree button{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree img{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree a{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree svg{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree p{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree a{border:0;}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree h1{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree h2{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree h3{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree p{margin:1.4em 0;}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree a{display:inline;}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree span{display:inline;}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree svg{display:inline;}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree ol{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree ul:before{display:none}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree ol:before{display:none}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree li:before{display:none}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree ul:after{display:none}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree ol:after{display:none}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree li:after{display:none}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree label{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree button{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree img{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-tree  button::-moz-focus-inner{border: 0;}
      #wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-max-width-none-important{max-width:none!important}
      #wistia_chrome_68 #wistia_grid_115_wrapper .w-css-reset-button-important{border-radius:0!important;color:#fff!important;}
    #wistia_grid_115_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
#wistia_grid_115_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
#wistia_grid_115_above{position:relative;}
#wistia_grid_115_main{display:block;height:100%;position:relative;}
#wistia_grid_115_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_115_center{height:100%;overflow:hidden;position:relative;width:100%;}
#wistia_grid_115_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_115_top_inside{position:absolute;left:0;top:0;width:100%;}
#wistia_grid_115_top{width:100%;position:absolute;bottom:0;left:0;}
#wistia_grid_115_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
#wistia_grid_115_bottom{width:100%;position:absolute;top:0;left:0;}
#wistia_grid_115_left_inside{height:100%;position:absolute;left:0;top:0;}
#wistia_grid_115_left{height:100%;position:absolute;right:0;top:0;}
#wistia_grid_115_right_inside{height:100%;right:0;position:absolute;top:0;}
#wistia_grid_115_right{height:100%;left:0;position:absolute;top:0;}
#wistia_grid_115_below{position:relative;}


###### Figure 12. Video showing a successfully working “Click me!” button.

To sum up, pass a callback function to the `onClick` attribute, as this function contains the logic you want to be executed whenever a click is registered.

It seems straightforward, doesn’t it? Based on what you’ve learned so far, all you need to do is change the `selectedBook` state when you click `BookCard`, right? Let’s test this idea. First, delete the button to clean up the code a little bit, then update the `BookCard` usage in `MainView`:


```js
export const MainView = () => {

  // same code


  return (
    <div>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={() => {
            setSelectedBook(book);
          }}
        />
      ))}
    </div>
  );
}
```


> Note
> setSelectedBook() is the setter function that was created in the line const [selectedBook, setSelectedBook] = useState(null);.
> Remember, useState creates two things:
> 
> 
> A state initialized with whatever passed to useState();
> A function that allows you to change the value of this state if you decide to do so later on.

When testing the app, it seems that nothing’s happening when clicking any of the book cards. That’s because there’s a problem that needs to be overcome: the `onClick` event attribute only works as an event listener with React elements (i.e., JSX elements), but not with components. Elements in this case means regular divs, buttons, p’s, and so on.

If `onClick` were to be added to a component (e.g., `<BookCard onClick={() => {...}}/>`), React would interpret it as a prop (yes, you can pass functions as props). This means that you need a way to add `onClick={() => { setSelectedBook(book); }}` to the `div` element in `BookCard`’s render method (in place of the note “[WE NEED TO ADD onClick HERE]” in the following code):


```js
export const BookCard = ({ book }) => {
  return <div [WE NEED TO ADD onClick HERE]>{book.title}</div>;
};
```

However, you can’t just do it like this:


```js
export const BookCard = ({ book }) => {
  return (
    <div
      onClick={() => {
        setSelectedBook(book);
      }}
    >
      {book.title}
    </div>
  );
};
```

Why not? Because `BookCard` has no idea what `setSelectedBook` is. Also, in React, the only component that can directly change a state is the component that owns that state, in this case, `MainView`. No worries, there’s a two-step solution:


1. To change the state, pass a function from the MainView component to <BookCard /> as a prop that executes setSelectedBook(book). This way, setSelectedBook will be identifiable by its owner (MainView). Also, MainView will correctly change its own state once the function is called.
1. Call the passed function from the BookCard component within the callback of the onClick event listener.

Let’s go through the first step. The easiest way to pass functions as props is to pass an arrow function that includes the logic inside it. For example:


```js
<BookCard
          key={book.id}
          book={book}
          onBookClick={(newSelectedBook) => {
            setSelectedBook(newSelectedBook);
          }}
        />
```

Here, you’ve passed a function as a prop called `onBookClick`. It has a function with one parameter that represents the book to be set to `selectedBook` state.

As for the second step, open the `book-card.jsx` file and make sure that you extract the `onBookClick` prop using [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring), just like you did with the `book` (or `bookData`) prop in there. Then, use it in the callback function for the `onClick` event listener:


```js
export const BookCard = ({ book, onBookClick }) => {
  return (
    <div
      onClick={() => {
        onBookClick(book);
      }}
    >
      {book.title}
    </div>
  );
};
```

Again, you passed a callback function to `onClick`, then added the logic (`onBookClick(book);`) that you need to execute once a click event is registered. Note that `book` passed to `onBookClick(...);` is the prop you extracted earlier.

Now everything should work as expected. Clicking any given book card should open a book view (`BookView`) with the book’s details displayed inside it.

Click for sound
  @keyframes VOLUME_SMALL_WAVE_FLASH {
    0% { opacity: 0; }
    33% { opacity: 1; }
    66% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes VOLUME_LARGE_WAVE_FLASH {
    0% { opacity: 0; }
    33% { opacity: 1; }
    66% { opacity: 1; }
    100% { opacity: 0; }
  }

  .volume__small-wave {
    animation: VOLUME_SMALL_WAVE_FLASH 2s infinite;
    opacity: 0;
  }

  .volume__large-wave {
    animation: VOLUME_LARGE_WAVE_FLASH 2s infinite .3s;
    opacity: 0;
  }
0:06
        @media (prefers-reduced-motion: no-preference) {
          @keyframes w-control-bar-fade-in {
            0% {
              opacity: 0;
              transform: translateX(50%) translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateX(50%) translateY(0px);
            }
          }
        }
      
      #wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset{font-size:14px;}
#wistia_chrome_71 #wistia_grid_136_wrapper div.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper span.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper label.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper fieldset.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper button.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper img.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper a.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper svg.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper p.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper a.w-css-reset{border:0;}
#wistia_chrome_71 #wistia_grid_136_wrapper h1.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper h2.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper h3.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper p.w-css-reset{margin:1.4em 0;}
#wistia_chrome_71 #wistia_grid_136_wrapper a.w-css-reset{display:inline;}
#wistia_chrome_71 #wistia_grid_136_wrapper span.w-css-reset{display:inline;}
#wistia_chrome_71 #wistia_grid_136_wrapper svg.w-css-reset{display:inline;}
#wistia_chrome_71 #wistia_grid_136_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_71 #wistia_grid_136_wrapper ol.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_71 #wistia_grid_136_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_71 #wistia_grid_136_wrapper ul:before.w-css-reset{display:none}
#wistia_chrome_71 #wistia_grid_136_wrapper ol:before.w-css-reset{display:none}
#wistia_chrome_71 #wistia_grid_136_wrapper li:before.w-css-reset{display:none}
#wistia_chrome_71 #wistia_grid_136_wrapper ul:after.w-css-reset{display:none}
#wistia_chrome_71 #wistia_grid_136_wrapper ol:after.w-css-reset{display:none}
#wistia_chrome_71 #wistia_grid_136_wrapper li:after.w-css-reset{display:none}
#wistia_chrome_71 #wistia_grid_136_wrapper label.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_71 #wistia_grid_136_wrapper button.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_71 #wistia_grid_136_wrapper img.w-css-reset{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset button::-moz-focus-inner{border: 0;}
      #wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree {font-size:14px;}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree div{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree span{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree label{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree fieldset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree button{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree img{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree a{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree svg{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree p{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree a{border:0;}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree h1{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree h2{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree h3{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree p{margin:1.4em 0;}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree a{display:inline;}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree span{display:inline;}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree svg{display:inline;}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree ol{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree ul:before{display:none}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree ol:before{display:none}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree li:before{display:none}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree ul:after{display:none}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree ol:after{display:none}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree li:after{display:none}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree label{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree button{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree img{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-tree  button::-moz-focus-inner{border: 0;}
      #wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-max-width-none-important{max-width:none!important}
      #wistia_chrome_71 #wistia_grid_136_wrapper .w-css-reset-button-important{border-radius:0!important;color:#fff!important;}
    #wistia_grid_136_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
#wistia_grid_136_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
#wistia_grid_136_above{position:relative;}
#wistia_grid_136_main{display:block;height:100%;position:relative;}
#wistia_grid_136_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_136_center{height:100%;overflow:hidden;position:relative;width:100%;}
#wistia_grid_136_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_136_top_inside{position:absolute;left:0;top:0;width:100%;}
#wistia_grid_136_top{width:100%;position:absolute;bottom:0;left:0;}
#wistia_grid_136_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
#wistia_grid_136_bottom{width:100%;position:absolute;top:0;left:0;}
#wistia_grid_136_left_inside{height:100%;position:absolute;left:0;top:0;}
#wistia_grid_136_left{height:100%;position:absolute;right:0;top:0;}
#wistia_grid_136_right_inside{height:100%;right:0;position:absolute;top:0;}
#wistia_grid_136_right{height:100%;left:0;position:absolute;top:0;}
#wistia_grid_136_below{position:relative;}


###### Figure 13. User clicking on a book card with details successfully appearing.


##### Adding a “Back” Button to BookView

When opening a book view, the only way to get back to the main view is to refresh the app (or in this case, CodeSandbox), which is tedious and impractical. Remember, your app is an SPA, so pressing the browser’s built-in back button will open whatever website was displayed before running your client app, not the previous “view.” So, let’s work on a solution that draws on your existing knowledge. Let’s add a `<button></button>` to `book-view.jsx` to navigate back to the app’s main view.


```js
export const BookView = ({ book }) => {
  return (
    <div>
      <div>
        <img src={book.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{book.title}</span>
      </div>
      <div>
        <span>Author: </span>
        <span>{book.author}</span>
      </div>
      <button>Back</button>
    </div>
  );
};
```

Terrific! You have a button. Now, you need to add a new prop to `BookView` that will be used to notify `MainView` that the back button was clicked:


```js
export const BookView = ({ book, onBackClick }) => {
```

And also call the function prop `onBackClick` when the button click occurs:


```js
<button onClick={onBackClick}>Back</button>
```

Notice that this time you’re not creating an arrow function that calls `onBackClick` like before with `onBookClick`—this is a shortened version that works because `onClick` takes a function and it so happens that `onBackClick` is a function itself.

Finally, let’s add the `onBackClick` logic in `MainView` that sets `selectedBook` back to its initial state value, `null`. In `main-view.jsx`, go ahead and update the code, so that `<BookView …/>` is rendered to look like this:


```js
if (selectedBook) {
    return (
      <BookView book={selectedBook} onBackClick={() => setSelectedBook(null)} />
    );
  }
```

That should do the trick for now. As you can see, you’ve made use of the fact that assigning `null` to the `selectedBook` state will allow `MainView` to stop rendering `<BookView … />`. The reason for this is the conditional `if (selectedBook)` will return false, and thus skip returning `<BookView … />`.

Click for sound
  @keyframes VOLUME_SMALL_WAVE_FLASH {
    0% { opacity: 0; }
    33% { opacity: 1; }
    66% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes VOLUME_LARGE_WAVE_FLASH {
    0% { opacity: 0; }
    33% { opacity: 1; }
    66% { opacity: 1; }
    100% { opacity: 0; }
  }

  .volume__small-wave {
    animation: VOLUME_SMALL_WAVE_FLASH 2s infinite;
    opacity: 0;
  }

  .volume__large-wave {
    animation: VOLUME_LARGE_WAVE_FLASH 2s infinite .3s;
    opacity: 0;
  }
0:15
        @media (prefers-reduced-motion: no-preference) {
          @keyframes w-control-bar-fade-in {
            0% {
              opacity: 0;
              transform: translateX(50%) translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateX(50%) translateY(0px);
            }
          }
        }
      
      #wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset{font-size:14px;}
#wistia_chrome_74 #wistia_grid_157_wrapper div.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper span.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper label.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper fieldset.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper button.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper img.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper a.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper svg.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper p.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper a.w-css-reset{border:0;}
#wistia_chrome_74 #wistia_grid_157_wrapper h1.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper h2.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper h3.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper p.w-css-reset{margin:1.4em 0;}
#wistia_chrome_74 #wistia_grid_157_wrapper a.w-css-reset{display:inline;}
#wistia_chrome_74 #wistia_grid_157_wrapper span.w-css-reset{display:inline;}
#wistia_chrome_74 #wistia_grid_157_wrapper svg.w-css-reset{display:inline;}
#wistia_chrome_74 #wistia_grid_157_wrapper ul.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_74 #wistia_grid_157_wrapper ol.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_74 #wistia_grid_157_wrapper li.w-css-reset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_74 #wistia_grid_157_wrapper ul:before.w-css-reset{display:none}
#wistia_chrome_74 #wistia_grid_157_wrapper ol:before.w-css-reset{display:none}
#wistia_chrome_74 #wistia_grid_157_wrapper li:before.w-css-reset{display:none}
#wistia_chrome_74 #wistia_grid_157_wrapper ul:after.w-css-reset{display:none}
#wistia_chrome_74 #wistia_grid_157_wrapper ol:after.w-css-reset{display:none}
#wistia_chrome_74 #wistia_grid_157_wrapper li:after.w-css-reset{display:none}
#wistia_chrome_74 #wistia_grid_157_wrapper label.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_74 #wistia_grid_157_wrapper button.w-css-reset{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_74 #wistia_grid_157_wrapper img.w-css-reset{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset button::-moz-focus-inner{border: 0;}
      #wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree {font-size:14px;}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree div{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree span{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree label{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree fieldset{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree button{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree img{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree a{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree svg{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree p{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree a{border:0;}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree h1{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:2em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree h2{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.5em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree h3{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:1.17em;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree p{margin:1.4em 0;}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree a{display:inline;}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree span{display:inline;}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree svg{display:inline;}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree ul{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree ol{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree li{box-sizing:inherit;box-shadow:none;color:inherit;display:block;float:none;font:inherit;font-family:inherit;font-style:normal;font-weight:normal;font-size:inherit;letter-spacing:0;line-height:inherit;margin:0;max-height:none;max-width:none;min-height:0;min-width:0;padding:0;position:static;text-decoration:none;text-transform:none;text-shadow:none;transition:none;word-wrap:normal;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none;-webkit-font-smoothing:antialiased;list-style-type:none}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree ul:before{display:none}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree ol:before{display:none}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree li:before{display:none}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree ul:after{display:none}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree ol:after{display:none}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree li:after{display:none}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree label{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;float:none;outline:none}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree button{background-attachment:scroll;background-color:transparent;background-image:none;background-position:0 0;background-repeat:no-repeat;background-size:100% 100%;border:0;border-radius:0;outline:none;position:static}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree img{border:0;display:inline-block;vertical-align:top;border-radius:0;outline:none;position:static}
#wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-tree  button::-moz-focus-inner{border: 0;}
      #wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-max-width-none-important{max-width:none!important}
      #wistia_chrome_74 #wistia_grid_157_wrapper .w-css-reset-button-important{border-radius:0!important;color:#fff!important;}
    #wistia_grid_157_wrapper{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;font-family:Arial,sans-serif;font-size:14px;height:100%;position:relative;text-align:left;width:100%;}
#wistia_grid_157_wrapper *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}
#wistia_grid_157_above{position:relative;}
#wistia_grid_157_main{display:block;height:100%;position:relative;}
#wistia_grid_157_behind{height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_157_center{height:100%;overflow:hidden;position:relative;width:100%;}
#wistia_grid_157_front{display:none;height:100%;left:0;position:absolute;top:0;width:100%;}
#wistia_grid_157_top_inside{position:absolute;left:0;top:0;width:100%;}
#wistia_grid_157_top{width:100%;position:absolute;bottom:0;left:0;}
#wistia_grid_157_bottom_inside{position:absolute;left:0;bottom:0;width:100%;}
#wistia_grid_157_bottom{width:100%;position:absolute;top:0;left:0;}
#wistia_grid_157_left_inside{height:100%;position:absolute;left:0;top:0;}
#wistia_grid_157_left{height:100%;position:absolute;right:0;top:0;}
#wistia_grid_157_right_inside{height:100%;right:0;position:absolute;top:0;}
#wistia_grid_157_right{height:100%;left:0;position:absolute;top:0;}
#wistia_grid_157_below{position:relative;}


###### Figure 14. Successful implementation of Back button.


> Code Check!
> You can take a look at the complete CodeSandbox for this Exercise here.
> 
> 
> CodeSandbox 3.3 Exercise Demo


#### The Virtual Dom

Before wrapping up, let’s take a look at another React feature: the virtual DOM. The virtual DOM is arguably React’s most interesting feature. The idea behind the virtual DOM is that React creates an in-memory virtual representation of the DOM. When the app’s state changes, the virtual DOM is updated and React computes the difference between the real DOM and the virtual DOM. React then tells the browser to only update what’s changed in the real DOM (as opposed to re-rendering the entire DOM).

It’s been a while since you worked with the DOM, so let’s consider what this means in practice. Traditionally, you’d manually update the DOM based on your data (or you’d ask your chosen framework or library to do so). For a list of books, you'd tell the browser to render as many `<div>`s as there are books. If a new book were added or an existing one modified, you’d either re-render the DOM entirely (removing all the current `<div>`s and adding new ones based on the new list of books) or find the `<div>`s that need to be modified and change them.

Let’s take a look at how React’s virtual DOM changes this process (at this point, don’t focus too much on how to render something using a React app). For the sake of this example, let’s assume you’ve written an app that returns two `<div>`s, and then passes them to React to be rendered.

In the following code, you can see the initial DOM returned by your app:


```js
<div>Hello</div>

<div>How are you?</div>
```

Now, let’s say there’s a change, and your app returns this:


```js
<div>Good morning</div>

<div>How are you?</div>
```

React will update only the first `<div>` element, changing “Hello” to “Good morning,” thus minimizing the amount of changes to the real DOM. React takes care of updating what’s relevant: you tell it what the new DOM should look like and React compares it with the existing DOM. Once React’s determined the changes that need to be made—a process known as “diffing”—it then applies them.

A virtual DOM leads to significant performance improvements, as updating the entire DOM in the browser is inefficient and slow, whereas re-rendering the virtual DOM means updating only those elements that have changed.


#### Summary

Congratulations! This Exercise was a lot to take in. You took an in-depth look at React, starting with SPAs and the best way to set up your folder structure. This was followed by a closer look at some of React’s key features—notably components, state, props, JSX, and (much later) the virtual DOM—to help you better understand their implications for an SPA such as your myFlix app.

Throughout the Exercise, you put what you learned into practice, developing your first React components for the (demo) app rendering book information for JavaScript students. The app consisted of a main view (`MainView`), which rendered a list of clickable `BookCard` components displaying the titles of different books. Clicking the `BookCard` components opened a new `BookView`, which displayed further book details. To wrap things up, you implemented a Back button so that your users could return to the main view. Well done!

In the next Exercise, you’ll delve even further into components and learn how to load data into them using an API. But first, you’re going to apply everything you learned in this Exercise to your myFlix app!


#### Resources

If you’re curious to read more about the topics covered in this Exercise, then we recommend taking a look at the following resources. Note that this reading is optional and not required to complete the course.


- What is a Single-Page Application?
- Introducing JSX - React
- React Documentation: Lists and Keys
- React State vs. Props Explained
- Destructuring Assignment
- React Documentation: Virtual Dom and Internals
- React’s Virtual DOM Explained in Simple English
- React Hooks and State

Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

In this task, you’ll create the `MainView`, `MovieCard`, and `MovieView` components for your myFlix app. You’ll create these components using JSX.

The following animation shows what your app’s functionality should look like after completing the task. To help determine what information to include in each component and view for your myFlix SPA, refer to your [Achievement 3 project brief](https://images.careerfoundry.com/public/courses/fullstack-immersion/full-stack-project-briefs/A3-Project-Brief-2022.pdf) and the wireframes provided.

![Clicking a movie title and being taken to its individual movie view](images-md/misc/3.3-task-functionality_1750639488286.gif)


###### Figure 15. Successfully clicking on movie title and arriving at an individual movie view.


> Note
> For now, you’ll be adding your own mock data, but in the next Exercise you’ll be integrating your API from Achievement 2. So, when coming up with the mock data, make sure it matches the sort of data that will eventually be fed to your React components from your API. Depending on what data you stored in your database, you may have different props for MovieCard and MovieView.

Directions


1. Continue developing your “myFlix-client” directory from the previous Exercise with the correct folders and files for the components that you’ll create in this task. This includes the “components” folder, the folders and files for the two different views, and the MovieCard component (you can find a list at the start of this Exercise).
1. Write the MainView component (with at least 3 movies in the movies array state).
1. Write a MovieCard component (displaying the movie's title).
1. Write the MovieView component (displays more information about the movie. It should render the movie’s title, description, its poster image, genre, director, etc., depending on what data you know you have stored in your database).
1. Write code that lets users go to the movie view when clicking a movie card.
1. Add a button to MovieView to navigate back to MainView’s original state.
1. To check that your code runs as expected, build your project (in order to update your code). Then, open your app in the browser to test its functionality. For example, by clicking MovieCard items in the main view and navigating to the movie view, and then back to the main view.
1. Commit your changes and push them to your GitHub repository.
1. Create a zip file of your project repository on your computer.
1. Upload the zip file and share the link to your repository here, then submit both items to your tutor for review. Feel free to share additional thoughts or ask questions along with your submission.

Bonus Task

In this Exercise, you briefly learned that there are different ways to export components using ES6 syntax. You were shown how to use the named export method; but the alternative is default export. It’s worth learning about this alternative, as you’re likely to encounter its syntax as you continue your journey into the world of React. As a bonus task, try refactoring your code to export your main view using the `default` method.

To do so:

Step 1. Create a new branch of your myFlix client repository to work on the changes to your files.

Step 2. In `main-view.jsx`, move the export keyword to a separate line, and add `default` right after it.


```js
const MainView = () => {
 return (
   <div>
     <div>Eloquent JavaScript</div>
     <div>Mastering JavaScript Functional Programming</div>
     <div>JavaScript: The Good Parts</div>
     <div>JavaScript: The Definitive Guide</div>
     <div>The Road to React</div>
   </div>
 );
 };

 export default MainView;
```

Step 3. Remove the curly braces around `MainView` in your import statement in your `index.jsx` file.

`import MainView from './components/main-view/main-view';`

Be careful! While you’re allowed to export as many objects, variables, and components as you like from a single file, you can export only one item using the `default` keyword, so make sure you choose wisely. If you want to learn more about when to use named export or default export, take a look at "[Named Export vs Default Export.](https://medium.com/@etherealm/named-export-vs-default-export-in-es6-affb483a0910)"

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](images-md/icons/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c_1750639488505.svg)


- Submission contains all required “.jsx” files with an appropriate folder structure; BUT
- There are major build or syntax errors

![](images-md/icons/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87_1750639488601.svg)


- Submission contains all required files (MainView, MovieCard and MovieView), with an appropriate folder structure, and the components/views contain the correct information, including navigation features; BUT
- There are minor build or syntax errors

![](images-md/icons/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4_1750639488623.svg)


- Submission contains all required files—MainView, MovieCard, and MovieView—with an appropriate folder structure, and the components/views contain the correct information, including navigation features;
- There are no build or syntax errors; AND
- The project has been successfully built and is working as expected
