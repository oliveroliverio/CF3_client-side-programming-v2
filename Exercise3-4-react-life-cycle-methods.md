


## Client-Side Programming & React


# 3.4: React Lifecycle Methods


- Learning Goals
- Introduction
- Class Components
- Hooks
- PropTypes
- Summary
- Resources
- Task
- Forum


#### Learning Goals


- Compare how to use class components and function components throughout a React app
- Describe the React component lifecycle
- Use Hooks in function components to interact with the React component lifecycle
- Render data from an API in React components


#### Introduction

Welcome back! In the previous Exercise, you explored the basics of the React framework, including components (such as the Javascript functions known as function components), props, state, and the virtual DOM. You also set up the overall structure of your myFlix app. Well done!

Now, you’ll dive a bit deeper into what makes React so powerful: the many ways in which you can create React components. Remember, everything in React is a component, and these bits of code allow you to build your app’s UI.

This Exercise will touch on function components once again—but you’ll start by looking at another way of creating components: class components. This will also include an introduction to component lifecycle methods.

Afterwards, you’ll hook up your React client with an API using React Hooks, allowing you to render data throughout your React components. There’s a lot of cover, so let’s get going!


#### Class Components

Although function components are now the most popular method of creating components, class components are still widely used. This is especially true in older apps containing “legacy” code.

In the following code, a simple `Hello` component is written as a class component. Given a prop `name`, the component displays the text: “Hello, name”:


```js
import React from 'react';

export class Hello extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

Let’s dissect this code to better understand what it means.

Starting with the first line: `import React from 'react';`. This line isn’t part of the component itself but rather a requirement for creating a class component. It imports React into the file and allows you to create new instances of the generic `React.Component` component in the next line. Think of this generic `React.Component` component like a blueprint for creating new class components.

Moving on to the next line: `export class Hello extends React.Component {`. This line creates and exports the `Hello` component. The `class` keyword states that the component is a class component (as opposed to a function component).


> Tip!
> Refer to these links for more about JavaScript classes and React.Component.

Next up in the same line: the component’s name,`Hello`, followed by the `extends` keyword paired with what you’re extending from—in this case, `React.Component`. This line tells React to create a new `Hello` component using the generic `React.Component` as a blueprint.

Finally comes the `render()` function, which you’ll notice is inside the component. This function returns the visual representation of the component using JSX.


> Follow Along!
> You can fork this CodeSandbox: 3.4 Class Components Demo so you can follow along.


##### Props and State

Like function components, class components can also access props and state, though in a different manner. When using class components, props are accessed via `this.props`, where `this` is an internal variable available to every class in JavaScript and the component state is accessed via `this.state`.

To illustrate how to use state with class components, let’s update `Hello` to show the current time of day:


```js
import React from "react";

export class Hello extends React.Component {
  constructor() {
    super();
    this.state = { currentDate: new Date() };
  }

  render() {
    return (
      <h1>
        Hello, {this.props.name}! The time is:
        {this.state.currentDate.toLocaleTimeString()}
      </h1>
    );
  }
}
```

In this example code, the starting value of the `Hello` state is initialized with an object containing the current date: `{ currentDate: new Date() }`. This initialization happens because `this.state` is set inside a method. Methods are functions inside a class. In this case, the method is called `constructor()`. React will use this `constructor()` method to create the component; the code inside it will be the first part to be executed for a component.

Keep in mind that the component hasn’t been drawn on the screen yet, which means the `constructor()` method will be executed before the `render()` method. This is why `constructor()` is the place to initialize a state’s values.


> Tip!
> If constructor() is the starting point, you may be wondering how you were able to create the Hello without adding this method earlier. The answer is that React will include it as a default even if you haven’t explicitly added it to your class component. Adding a constructor() to a component’s class definition is just a way to further customize how a component is initialized.

What about `super();`, which is called in the first line inside `constructor()`? This `super();` is related to object-oriented programming. It often means to call the `constructor()` of the parent class (i.e., the class you added after the `extends` keyword, in this case, `React.Component`).

Although you haven’t learned about object-oriented programming in this course, it shouldn’t be a problem for now. All you need to know is that `super();` initializes your component’s state, and without it, you’ll get an error if you try to use `this.state` inside `constructor()`.

Now that you know how to access state in a class component, let’s learn how to change it—for example, by adding a button to refresh the time. To change a state, you might be tempted to execute the code `this.state.currentDate = new Date()`, but that won’t work. React wants you to use the `this.setState` method. This method always takes an object, and this object contains the new value that you want to assign to a specific state. Based on this, the right way to update the current date is: `this.setState({ currentDate: new Date() })`. Take a look at the following code to see what’s changed:


```js
import React from "react";

export class Hello extends React.Component {
  constructor() {
    super();
    this.state = { currentDate: new Date() };
  }

  render() {
    return (
      <h1>
        Hello, {this.props.name}! The time is:
        {this.state.currentDate.toLocaleTimeString()}
        <button
          onClick={() => {
            this.setState({ currentDate: new Date() });
          }}
        >
          ⟳
        </button>
      </h1>
    );
  }
}
```

Now, every time this new button is clicked, the current time will be changed and the UI will be updated accordingly.


##### Lifecycle Methods

Each class component in React has a three-phase lifecycle: Start, Render, End.

![Simple component timeline with start, render, and end](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.4/start-render-end.png)


###### Figure 1.

Each phase has a method that lets you run a piece of code at specific points within the component’s lifecycle:


1. Component construction: constructor()
1. Component has been mounted: componentDidMount()
1. Component will be unmounted: componentWillUnmount()
1. Component has been updated: componentDidUpdate()

Let’s continue working on the `Hello` component to understand when and how to use each of the lifecycle methods. The goal here will be to change  `Hello` so the current time is updated automatically.


##### Component Creation/Construction

Recall from the previous Props and State section that React uses the `constructor()` method to actually create components. Creating a component doesn’t render it or add anything to the DOM. In other words, nothing is yet visible to users in their browsers.

Let’s update the timeline to add the `constructor()` method into the mix:

![Simple timeline with constructor, render, and end](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.4/constructor-render-end.png)


###### Figure 2.

Because the `constructor()` method is the starting point of any class component, the original “start” from Figure 1 has been replaced with `constructor()`. You already know that the `constructor()` method isn’t required to create a component (only the `render()` method is required), so why go through this extra step and use the `constructor()` method to create your component? Well, if you don’t use the `constructor()` method, you can’t include any extra code to be executed at the point where the component is created. For instance, if you wanted to initialize the state of your component with default values, you’d need to add this in the `constructor()` method.

Let’s revert `Hello` to its initial form so we can make changes to support the time updating automatically.


```js
import React from "react";

export class Hello extends React.Component {
  // code executed right when the component is created
  constructor() {
    super();
    this.state = { currentDate: new Date() };
  }

  render() {
    return (
      <h1>
        Hello, {this.props.name}! The time is:
        {this.state.currentDate.toLocaleTimeString()}
      </h1>
    );
  }
}
```


##### Component Has Been Mounted

When a component is “mounted,” it means that it’s fully rendered and has been added to the DOM, making it visible in the browser. Sometimes, you may want to execute some code right after the component is mounted. To do so, you can use the `componentDidMount()` method, which would come right after the `render()` method in the timeline:

![Simple timeline with constructor, render, componentDidMount, and end](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.4/componentDidMount.png)


###### Figure 3.

As recommended by React, `componentDidMount()` is a good place to add code for performing async tasks such as scheduling functions to be executed later, making ajax requests (e.g., loading data from an API), or adding event listeners.

In order to keep the `Hello` component updated with the current time, you can use `setInterval`, a JavaScript function that allows you to schedule a function to continuously run at any given interval. In this case, you’ll want to refresh the current time "every second." Let’s check out how the code would look:


```js
import React from "react";

export class Hello extends React.Component {
  // code executed right when the component is created
  constructor() {
    super();
    this.state = { currentDate: new Date() };
  }

  // code executed right after the component is added to the DOM.
  componentDidMount() {
    setInterval(() => {
      this.setState({ currentDate: new Date() });
    }, 1000);
  }

  render() {
    return (
      <h1>
        Hello, {this.props.name}! The time is:
        {this.state.currentDate.toLocaleTimeString()}
      </h1>
    );
  }
}
```

Once you add `componentDidMount`, you’ll see the current time update live!


##### Component Will Be Unmounted

There may be times when you’ll need to clean up your code to ensure everything in your app is under control. For example, the `setInterval()` call you just added should only be active while `Hello` is on the screen, and it should be removed (i.e., unmounted) when no longer needed. This prevents the call from running in the background, wasting precious CPU resources, or—more dangerously—draining battery life if the app is running on a phone.

Use the `componentWillUnmount()` method to run a piece of code right before the component is unmounted:


```js
import React from "react";

export class Hello extends React.Component {
  // code executed right when the component is created
  constructor() {
    super();
    this.state = { currentDate: new Date() };
  }

  // code executed right after the component is added to the DOM.
  componentDidMount() {
    const interval = setInterval(() => {
      this.setState({ currentDate: new Date() });
    }, 1000);

    this.setState({ interval });
  }

  // code executed just before the moment the component gets removed from the DOM.
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <h1>
        Hello, {this.props.name}! The time is:
        {this.state.currentDate.toLocaleTimeString()}
      </h1>
    );
  }
}
```

As you can see in the previous example code, the `setInterval()` function returns a number that can be used with its companion function `clearInterval()` to stop the timer and clean up any allocated resources. This number is stored in the component state so it will be available throughout the component’s lifecycle.

To refer back to the original lifecycle timeline in Figure 1, the “end” represents a component’s removal from the DOM. Thus, the `componentWillUnmount()` method should come directly before it (right before the component is removed from the DOM):

![Simple timeline with constructor, render, componentDidMount, componentWillUnmount, and end](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.4/componentWillUnmount.png)


###### Figure 4.


##### Component Has Been Updated

Once a component has been mounted, its state or props may undergo occasional changes. Just as you might want to run a piece of code right before it’s unmounted, you may also want to run a piece of code right after its state or props change. For example, let’s add a sound effect every time the current time is updated:


```js
import React from "react";

const beep = new Audio(
  "https://cdn.freesound.org/previews/560/560188_6086693-lq.mp3"
);

export class Hello extends React.Component {
  // code executed right when the component is created
  constructor() {
    super();
    this.state = { currentDate: new Date() };
  }

  // code executed right after the component is added to the DOM.
  componentDidMount() {
    const interval = setInterval(() => {
      this.setState({ currentDate: new Date() });
    }, 1000);

    this.setState({ interval });
  }

  // code executed right after state or props are updated
  componentDidUpdate() {
    beep.play();
  }

  // code executed just before the moment the component gets removed from the DOM.
  componentWillUnmount() {
    clearInterval(this.state.interval);
    beep.pause();
  }

  render() {
    return (
      <h1>
        Hello, {this.props.name}! The time is:
        {this.state.currentDate.toLocaleTimeString()}
      </h1>
    );
  }
}
```


> Tip!
> Modern browsers don’t let web pages play audio automatically, and instead require users to interact with them first. So, if you don’t hear anything at first, just click anywhere on the page.

If you look closely at the example code, you’ll notice that a new `beep` variable was added. This variable is an `Audio` object that points to a sound file. Inside `componentDidUpdate()`, `beep.play()` is being called, so the beep plays every second.

Also, notice that the audio is paused when the component is removed—or unmounted—from the screen.

Important to mention here is that any changes to the state and props will also prompt a render cycle (the `render()` method). So, whenever the `componentDidUpdate()` method is triggered, the `render()` method will be triggered as well. The following chart illustrates the full cycle:

![Simple timeline with constructor, render, componentDidMount, componentDidUpdate, componentWillUnmount, and end](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.4/componentDidUpdate.png)


###### Figure 5.

The `render() -> componentDidUpdate()` cycle in the flowchart represents a state/prop change.

And with that, you’ve finished the introduction to class components. Well done for sticking with it! Now, let’s return to function components, specifically how you can manage data through them in an SPA.


> Bonus Task
> Once you’ve finished your main task for this Exercise, you’ll notice a bonus task in which you can play around with class components!


#### Hooks

Before diving into the details, the main bit to know is that Hooks are how function components interact with the component lifecycle you just covered in the last section.

As you learned in previous Exercises, function components need more than just `props` to do their job. For example, the `MainView` component you’ve been working on also needs a way to store its own information, called `state`. You may recall that function components achieve this through `useState`, a special type of function provided by React. This special type of function allows components to “hook into” React features—that’s why these functions are called `Hooks`.


> Tip!
> Hooks are more restrictive than regular functions. You can only call Hooks at the top level of your components (or other Hooks). You can’t call Hooks inside loops, conditions, or nested functions.

There are three basic Hooks:


1. useState: Lets you add a state variable to your component.
1. useEffect: Runs a callback function whenever any of its dependencies change. It allows you to perform side effects such as loading data or acting on DOM elements (replaces the lifecycle methods).
1. useContext: Lets you read and subscribe to context  from your component. It allows you to pass data down a component tree without having to manually pass props through every nested component.

React provides many additional Hooks; if you’re interested to learn more, check out the Resources section at the end of this Exercise.


##### Loading Data from an API

As React recommends, `useEffect()` is a good place to add code for performing async tasks such as making network requests or adding event listeners. For example, let’s say you want to fetch a list of books from an API instead of keeping a hardcoded list in the `MainView` component from the previous Exercise. You can add that code inside the `useEffect()` Hook! Likewise, maybe you want to add key bindings (i.e., event listeners for events such as `keydown`, `keyup`) for a browser game you’re coding. Such event listeners should go inside of the `useEffect()` Hook as well!

To practice this Hook, let's replace the hardcoded books list with a list of books from the [Open Library API](https://openlibrary.org/developers/api). This means you’ll need to perform a network request. For this, you’ll be using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).


> Code along!
> To start, open the CodeSandbox project you were working on in the last Exercise (or fork this one: 3.4 Books App React Demo).

In `main-view.jsx`, set the initial value of books to an empty list by deleting the hardcoded books:


```js
const [books, setBooks] = useState([]);
```

Next, add a `useEffect()` Hook after `const [selectedBook, setSelectedBook] = useState(null);`, and, inside it, query the [Open Library Search API](https://openlibrary.org/dev/docs/api/search) using `fetch()`:


> NOTE!
> You can search for anything you like—the following example uses Star Wars! Just be sure to refer to the URL format specified in the Open Library Search API documentation.


```js
useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=star+wars");
  }, []);
```


> TIP!
> Passing an empty dependency array ([ ]) as a second argument to useEffect() tells React that your callback doesn’t depend on any value changes in props or state, so it never needs to rerun. This is equivalent to the componentDidMount() method you saw earlier in this Exercise. This isn’t handled as a special case—it follows directly from how the dependencies array always works.

Don’t forget to import `useEffect` along with `useState()` at the start of the file:

`import { useState, useEffect } from "react";`

After adding these code snippets, you may notice that nothing happens. That’s because `fetch()` returns a `promise`, a special object that represents the eventual completion (or failure) of an asynchronous operation. Meaning the actual value (or error) will be returned later on, and the only way to access it is by attaching a callback to the `promise` via its function, `then()`:


```js
useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=star+wars")
      .then((response) => response.json())
      .then((data) => {
        console.log("books from api:", data);
      });
  }, []);
```

If you open the browser console, you should see an entry with the actual `json` response from the API.

![A `json` response from the API in the console.](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.4/console-json-response.png)


###### Figure 6. A json response from the API in the console.


> TIP!
> You can find the console either in the Console tab of CodeSandbox or by opening the UI window in a Chrome tab using the URL. Then, right-click, select Inspect, and navigate to the Console tab.
> 
> 
> Figure 7. The books from api object showing the data fetched from the API.

So, you’ve successfully connected to the API, but your app still says “The list is empty!”. This is because you haven’t yet written the code to populate `books` state with the list of books obtained from the API.

Now that you know how to access data from the API, let’s populate the components in your app:


```js
useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=star+wars")
      .then((response) => response.json())
      .then((data) => {
        const booksFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
            image:
`https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
            author: doc.author_name?.[0]
          };
        });

        setBooks(booksFromApi);
      });
  }, []);
```

This newly added piece of code takes the `json` response and extracts the information you need for each book (`id`, `title`, `image`, and `author`), based on the required [Open Library response format](https://openlibrary.org/dev/docs/api/search). Once you have the list, use the `setBooks` call from the `useState()` Hook to update the state of your component. As a result, its UI will also be updated.

Now, you should see the list of books from the API in the preview window. This means the data has been successfully fetched from the API and is being rendered in each `BookCard` component in `MainView`. If you click on one of the `BookCard` components, the API has also populated the `BookView` components with the data you want to display. Awesome!

![A list of books from the API in the preview window](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.4/books-list-API-fetch.png)


###### Figure 8. If your screen looks like this, your data in being successfully rendered in MainView!


> Code Check!
> You can check your code by comparing your forked CodeSandbox to this version


#### PropTypes

You already know that props act as the API for your components. But, so far, there’s been nothing to enforce this. Take the following example of the `BookCard` component:


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

There are two props in this code: one object (`book`) and one function (`onBookClick`). If either of these isn't passed through the props, however, there will be no warning, and you'll face a runtime error (i.e., the page will “crash”). You might then receive an error message similar to Figure 9, telling you that the component is trying to call the `onClick` function (like your `onBookClick` function), which hasn’t been defined yet:

![Warning message in the console indicating that the `onClick` function is undefined](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.4/propType-onClick-error.png)


###### Figure 9. You’ll get a warning message like this if your function is undefined.

What’s important to understand here is that if the `BookCard` component hadn’t received the `book` prop, you would notice it immediately in the browser. This is because the `BookCard` component uses the `book` prop without any user interaction.

With the `onBookClick` function, however, the error would remain hidden until a user clicks on a book. This is how bugs are deployed in production—as they say, test your app or your users will!

To avoid this type of bug, you can use PropTypes. As props transmit data between components in a React app, PropTypes validates the data types based on the app’s configuration.

To use PropTypes, you first need to install the `prop-types` module in your CodeSandbox. Open the `package.json` file and add the following line to the “dependencies” section:


```js
"prop-types": "^15.8.1"
```

Now, let’s look at how PropTypes can be used in your `BookCard` component:


```js
// Here you import the PropTypes library
import PropTypes from "prop-types";

// The BookCard function component 
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

// Here is where we define all the props constraints for the BookCard
BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onBookClick: PropTypes.func.isRequired
};
```

Here, you set the static `PropTypes` property on `BookCard` to an object that contains special values provided as utilities by `prop-types`. These values help specify what the `BookCard` props should look like.


1. The props object must include a book object (shape({...}) means that it’s an object).
1. The book prop (object) may contain a title key; if it does, then it must be of type string.
1. The props object must contain onBookClick and it must be a function.

Based on this, if the `onBookClick` function isn't passed as a prop to the `BookCard` component, it will immediately display a warning in the console upon running the app. Try omitting the `onBookClick` prop you passed in `main-view.jsx` to `<BookCard />` to see the error message. It should look like this:

![A warning message saying that the `onBookClick` function wasn’t passed as a prop ](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.4/propType-onBookClick-undefined.png)


###### Figure 10. This warning message will appear if your function didn’t pass as a prop.

To resolve this error, make sure that the prop name you passed into `BookCard` in `MainView` matches the prop name inside the `BookCard` view.

Also, notice that whenever `.isRequired` is chained after the type, the associated key/field must be present and must not be equal to `null` or `undefined`. While this makes sense, note that there’s a flaw in how PropTypes was designed—it treats `undefined` the same as `null` when you want to use `isRequired` on a property.


> TIP!
> The null vs. undefined debate is a major defining aspect of JavaScript. Want a refresher? Revisit the section on primitive data types in Exercise 1.2: JavaScript Basics Part 1 .

Now, let’s look at the `book` key. Notice that, according to the code, `book` may contain the `title` key. This is because `isRequired` hasn’t been specified for it yet. Also, the `book` object actually has more properties than just a title. Let’s go ahead and add all the book properties; for example, if the `book` object should have a `title`, `image`, and `author`, the PropTypes specification would look something like this:


```js
BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string
  }).isRequired,
  onBookClick: PropTypes.func.isRequired
};
```

This specification is just an example. Yours might look completely different! Just make sure that you represent the `book` object your component expects. While you’re at it, add PropTypes for your other components as well (and any other components you create in the future).

Note that PropTypes provides specifications for more than just `string` and `shape`. For more information on what other specifications you can use, check out the [PropTypes documentation](https://www.npmjs.com/package/prop-types) (specifically, the “Usage” section).


##### Other PropTypes Quirks

First off, there’s another PropType similar to `shape` called `exact`. Just like `shape`, it can be used to define how objects look; however, `shape` is more flexible as it allows extra keys that aren’t specified to be added to the object. If you look back at the `book` PropType specification in the previous example, the following `book` object would still be accepted if passed to the `BookCard` props:


```js
{
  title: '...',
  image: '...',
  author: '...',
  rating: 8
}
```

If you were to use `exact` instead of `shape` in this example, however, the console would raise a warning (because it has keys that haven’t been specified in PropTypes). Which one should you choose? This will ultimately depend on the requirements of the product you’re working on. At the very least, for your current project, using `shape` is just fine.

You can nest different types within each other; for example, `shape` (object) could contain a property that’s also set to have an object `shape` as shown in the `genre` sub-property in `book` object:


```js
BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string,
    genre: PropTypes.shape({
      name: ...
      ...
    })
  }).isRequired,
  onBookClick: PropTypes.func.isRequired
};
```

Another quirk: not everything needs to be specified with `isRequired`. Again, this depends on the requirements of the app you’re working on. For your project, you can make things either flexible or strict—just be careful!

If you want a prop to be optional, make sure you check for that property's presence before using it. For example, if you made `image` optional, you’d need to add a conditional that checks whether `book.image` is present before using `{book.image}` inside `BookCard`. This is done to avoid raising errors in case `image` was set to `null` in the API.

`prop-types` can help you catch errors when passing props, which is great as it means you don’t have to rely on your users catching errors in the browser!


#### Summary

You've made quite a bit of progress in this Exercise. Great job! To kick things off, you learned about class components and lifecycle methods. This was followed by a deep dive into other advanced React concepts, notably, Hooks. As you learned, Hooks are how you can tap into the component lifecycle with function components.

You then applied your new knowledge to load data from an API and render it in the components that make up a React app. To wrap up your tour of React, you took a look at PropTypes, a handy feature you’ll use to check that your components’ data types are, in fact, valid. All of this was gearing you up for the task, which will see you connect your app with your backend from the last Achievement!

So, what are you waiting for? On to the task!


#### Resources

If you’re curious to read more about the topics covered in this Exercise, then we recommend taking a look at the following resources. Note that this reading is optional and not required to complete the course.


- React Documentation: Hooks
- Using the Effect Hook
- React Hooks: useState (using the state hook)
- React 16 Lifecycles Explained
- PropTypes Documentation

Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

In this task, you’ll continue building your React app for your myFlix API from Achievement 2. Specifically, you’ll connect your app with your API so you can start rendering real data in your components! Refer to the wireframes in your [Achievement 3 project brief](https://images.careerfoundry.com/public/courses/fullstack-immersion/full-stack-project-briefs/A3-Project-Brief-2022.pdf) for help with designing your myFlix app. Please note that every component should use `prop-types`.

Part 1: Allow Requests to Your API

As you’ll remember from the last Achievement, your myFlix API has authentication applied to it. In order to render data in your React app, you’ll need to address this by temporarily adjusting your `/movies` endpoint.

Directions


1. Create a new branch in your myFlix API GitHub project repository. If you need help creating a GitHub branch using GitHub Desktop, you can look at the directions in Exercise 1.10: Code Quality, Testing, and Web Hosting. You’ll complete the same process you did when creating your gh-pages branch back then.
1. Remove passport.authenticate('jwt', { session: false }), from your  /movies endpoint.
1. Create a pull request, commit to your main branch, and push changes to GitHub through GitHub Desktop.
1. In the terminal, navigate to your myFlix API project folder, and run git push heroku main to update Heroku.


> GitHub Branches
> For all tasks in this Achievement, you’ll create a new GitHub branch from your “myFlix-client” repo. In the development world, it's generally best practice to make changes to a branch and then merge that branch with the main branch after successful verification.

Part 2: Render Data in Your Components

In the second part of this task, you’ll work on a new branch of your React app to replace the hardcoded data in your app with data from your API. You’ll also add some new features to improve your app’s user experience and ensure your SPA meets the project requirements as outlined in your brief.


1. Create a new branch for your React app in your GitHub project repository.
1. Replace the hardcoded movies array with an empty array as the initial value.
1. Next, populate movies state using setMovies, with the movies array you fetched from your myFlix API (as instructed in the “Loading Data from an API” section of this Exercise).
1. Make sure your API data is being fed into the different components of your app correctly.
1. Use PropTypes for your updated components. (Tip! Don’t forget to import the PropTypes from the prop-types package for your app!).
1. Create a zip file of your project repository on your computer. Be sure you've zipped the version from your new branch!
1. Create a pull request, and send both the link to your pull request and the zip file of your repository to your tutor to review.
1. Once your pull request is approved, and before you start the next task, merge your pull request with your repository main branch.


> Troubleshooting: CORS
> 
> If you don’t see any movies displayed, open the DevTools on your browser and check for errors. You may see the following error message about Cross-Origin (or “CORS”):
> 
> Access to XMLHttpRequest at 'http://myherokuapi.com/movies' from origin 'http://localhost:1234' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
> 
> If you see this message, it means you haven't allowed “localhost:1234” to connect to your app published on Heroku. In the previous Achievement, you configured CORS for your API. Back then, you were presented with two options:
> 
> 
> Allow all origins using the middleware app.use(cors());. (If you did this, you shouldn’t have gotten this error).
> Select a number of origins that are allowed to connect to your API, for which the code would’ve looked something like this:
> 
> 
> let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];
> 
> app.use(cors({
>  origin: (origin, callback) => {
>    if(!origin) return callback(null, true);
>    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
>      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
>      return callback(new Error(message ), false);
>    }
>    return callback(null, true);
>  }
> }));
> 
> If you’re getting CORS errors whenever you run your React app, you must have implemented the second option. In this case:
> 
> 
> Open your myFlix API project in your code editor (the one you completed in Achievement >2).
> In your index.js file, look for the allowedOrigins array: let allowedOrigins = [....]. Once you find it, add 'http://localhost:1234' to the “allowedOrigins” array.
> Save your changes. Then, in GitHub Desktop, switch to the repository you used in Achievement 2. Commit and push your saved changes to your GitHub repository.
> Navigate to your myFlix API project folder. While inside the folder, run the command git push heroku main to publish the same commits on Heroku.
> 
> 
> If you need a refresher, refer back to the Cross-Origin Resource Sharing (CORS) section of Exercise 2.10, where you configured CORS for your API.

Bonus Task 1: Class Components

In this Exercise, you also learned about class components. For some hands-on practice, [open and fork the CodeSandbox for this clock app](https://codesandbox.io/s/3-4-clock-app-react-components-kqjt6d). In it, you can practice the concept of class versus functional components. This project contains two components that provide the exact same functionality. One is a class component, the other is a function component. Try to study how `useEffect` is used to provide the same utility of both class-component lifecycle methods—`componentDidMount` and `componentWillUnmount`—in one function.

Then, [open and fork the CodeSandbox for this additional counter app](https://codesandbox.io/s/3-4-counter-app-react-components-2onl94), where you can practice with two types of Hooks: `useState` and `useEffect`. Here, `useEffect` is used to replicate what `componentDidMount` and `componentDidUpdate` can do in class components. For more on `useEffect`, head over to the [official documentation on using the Effect Hook](https://reactjs.org/docs/hooks-effect.html).

Bonus Task 2: Similar Movies

Using what you’ve learned about components, props, and Hooks, display “similar movies” on each `MovieView` component. These similar movies can have the same genre as the movie displayed in the current `MovieView`. This will require a bit of independent problem solving, but you can refer to the following suggestions for help:


- Use the .filter() method for filtering an array based on genre name. You can read more about the filter() method here.
- Before rendering the list of similar movies, try adding some spacing that separates <MovieView /> from similarMovies. You could use elements like <hr /> or <br /> followed by a heading, something like this:

![Similar Movies written in code with various elements used for spacing](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.4/bonus-similarmovies-h2.png)


###### Figure 11. Possible spacing option using a variety of elements and a heading.


- Loop over the array using .map(), rendering the list of similar movies right after <MovieView… /> in main-view.jsx.
- There, you can reuse your MovieCard component yet again. Render a <MovieCard /> for each movie in the .map() loop, similarly to how you rendered movies list as  <MovieCards/ > back in the previous Exercise. Note that you must pass both required props: onMovieClick and movie, as well as the key={xxxxx._id} attribute-value to avoid getting the related error.
- Generally, here’s how the code should look:

![Correctly written code to display similar movies](https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/3.4/bonus-similarmovies-code.png)


###### Figure 12. Check your code to see how it stacks up!

Now, whenever you open `MovieView`, a list of similar movies should render!

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](https://cdn.careerfoundry.com/assets/rubrics/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c.svg)


- MainView not fetching movie data from the myFlix API and still using a hardcoded movie array in movies state; OR
- Pull request shared and includes attempt to connect API to React app; BUT
- MainView not able to fetch and render movie data from myFlix API

![](https://cdn.careerfoundry.com/assets/rubrics/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87.svg)


- Pull request shared and includes attempt to connect API to React app; AND
- MainView is able to fetch and render movie data from myFlix API; BUT
- Slight syntax errors are preventing the movie data from rendering correctly in the React app’s UI

![](https://cdn.careerfoundry.com/assets/rubrics/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4.svg)


- Pull request shared and includes attempt to connect API to React app;
- MainView is able to fetch and render movie data from myFlix API; AND
- Movie data renders correctly in the React app’s UI.

Questions for this task

Student Submissions

Check out recently submitted work by other students to get an idea of what’s required for this Task:


- 
- Write
- Preview


```js
`code`
```

