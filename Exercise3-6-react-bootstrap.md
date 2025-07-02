
## Client-Side Programming & React


# 3.6: React Bootstrap


- Learning Goals
- Introduction
- Designing Your UI
- Styling Your Components
- Using Bootstrap with a React App
- React Bootstrap Components
- React Bootstrap Grid System
- Customizing React Bootstrap
- Summary
- Resources
- Task
- Forum


#### Learning Goals


- Apply the principles of good design to a React app using UI frameworks
- Style an app using React Bootstrap features and components


#### Introduction

Welcome back! You’ve made some great progress with your myFlix app so far. In the previous Exercise, you explored some of React’s more difficult concepts, such as authentication for React apps. In the task, you continued developing more views and functionality. Nicely done!

You’re now going to slightly shift gears and focus on your app’s design. You’ll explore how to use React Bootstrap—a special version of Bootstrap just for React—to polish your app’s appearance and ensure that it’s portfolio ready.

Ready to get your design on, React-style? Let’s dive right in!


> Follow along with the Exercise!
> A pre-prepared code sandbox is available for you to fork and use throughout the Exercise. This should hopefully make it easier for you to follow along. The CodeSandbox: 3.6 React Bootstrap Starting Directory sandbox is related to the books demo app, just like in the entire Achievement so far.
> 
> However, if you’d prefer to continue with the forked books app demo project from the previous Exercise, that’s also perfectly fine.


#### Designing Your UI

Half of a frontend developer’s work is ensuring that the UIs they code resemble the prototypes received from the designers. When demonstrating your frontend development skills to recruiters, not only does your code need to be clean and functional, your project UIs need to look good, too.


##### A Note on Design Systems

Product teams often use design systems to ensure consistent styling and branding across a product, creating a uniform and coherent experience for users. A design system is essentially a library of UI components applied to one or several products. For instance, Google has its own design system—[Material Design](https://material.io/)—to make sure all Google products follow the same design principles and use UI components in the same way. This system covers both the specific components to be used for each interaction (buttons, dropdowns, menus, etc.), and how they’re implemented in a design (size, color, etc.).

For developers, a design system is a tool that’s used to implement reusable UI components in a product in a consistent way.


> Examples of Design Systems
> For more on design systems, check out the following examples:
> 
> 
> Palantir’s Blueprint
> Material Design
> Atlassian Design System

You’re not actually going to use a design system for myFlix, which gives you the freedom to explore the components you’ll use to make up your frontend UI. It is, however, recommend that you adhere to the following rules when designing your UI:


- Make sure your app is responsive;
- Use a consistent color palette (only two to three colors);
- Use a consistent font hierarchy (headers, sub-headers, main text, button text, link text, and so forth should all use the same font throughout the design);
- Leave white space on your page (i.e., blank, unused space so the view isn’t cluttered);
- Stick to common patterns and elements that your users will expect and be able to use;
- Use and style your UI elements consistently throughout your design.


> Tip!
> Before you apply styles to your components, it’s a good idea to plan and create your own mini design system or style guide to keep your app clean and consistent. It can be as simple as writing notes about the colors you plan to use, or even drawing a rough sketch of what you want the screens to look like.


#### Styling Your Components

Ideally, you should store the styling for each of your components in a separate file. This means that each component should have a `.jsx` file containing the React logic and an `.scss` file containing your UI design. Let’s use the `BookView` example from the CodeSandbox to learn how you can use CSS to style React components, and also how to prepare the correct files.

Imagine your goal is to turn your Back button from this:

![Book view with regular Back button style](images-md/misc/bookview-back-button_1751498311951.png)


###### Figure 1. Back button from demo app.

To this:

![Updated style of Back button](images-md/misc/back-button-styled_1751498312251.png)


###### Figure 2. Updated Back button style.

The first thing to do would be to create a file named `book-view.scss` inside the “book-view” folder, then add the following CSS rule:


```js
.back-button {
  padding: 4px 12px 4px 12px;
  color: whitesmoke;
  background-color: dodgerblue;
  border: none;
  border-radius: 4px;
}
```


> Do you recognize all the CSS properties being used? If you need a refresher head to the MDN’s CSS Reference page.

Next, you’ll need to import your SCSS file into your JSX file, the same way the `index.jsx` file imports the `index.scss` file.

Add `import './book-view.scss';` at the top of your `book-view.jsx` file. Also, don’t forget to add the `back-button` class to the `button` element:


```js
import "./book-view.scss";

export const BookView = ({ book, onBackClick }) => {
  return (
    <div>

      {/* Same code */}

      <button onClick={onBackClick} className="back-button">
        Back
      </button>
    </div>
  );
};
```


> Reminder!
> Just like in Exercise 3.3: React Components & the Virtual DOM, don’t forget to use className instead of class when setting CSS classes in JSX.

For small styling tweaks, you can also set CSS properties directly in JSX using the `style` attribute. In the following code, you’ll specify that you want the cursor to become a pointer when hovering on the button:


```js
<button
  onClick={onBackClick}
  className="back-button"
  style={{ cursor: "pointer" }}
>
  Back
</button>
```

Here, you set `style` to be a JavaScript object, which is why you have double curly braces `{{}}`. One pair is to let React know that you want the value to be evaluated as JavaScript, and the nested pair is to create the object.

There you have it! You now have a stylish new button.

![Book view with new Back button style](images-md/misc/bookview-back-button-styled_1751498312412.png)


###### Figure 3. Book view with new Back button style.


> Check out the CodeSandbox: 3.6 React Bootstrap Button Styling to see how the cursor becomes a pointer, and to troubleshoot your own code if needed.

As you can see, it’s totally possible to style your entire app using vanilla CSS. However, leveraging a CSS framework like Bootstrap usually helps developers create websites faster, and also ensures these websites have a responsive and consistent layout. Next you’ll learn how to integrate Bootstrap with your React app.


#### Using Bootstrap with a React App


> Important!
> Before you move on, please familiarize yourself with how React Bootstrap works and the components that it provides. This will help you as you work through your steps. You can read through the documentation on the React Bootstrap site before proceeding.

You already came across Bootstrap back in Achievement 1, where you used it to style and rewrite your project. You now have a chance to use it again—this time to style myFlix’s frontend. This will be made easier by way of an alternative version of the regular Bootstrap tool—React Bootstrap—that’s been tailored to the needs of developers using Bootstrap with React.

So how does it work? Basically, React Bootstrap replaces the JavaScript code in Bootstrap with React code. In terms of features, React Bootstrap strives to mirror vanilla Bootstrap, while also providing a native integration with React. As such, you’ll likely already be familiar with some of what React Bootstrap has to offer!

The React Bootstrap library contains a number of components and features you can use in your UI, from dropdowns and modals to pagination and forms. This Exercise will focus on a few key components you’ll likely use in your myFlix app: [cards](https://react-bootstrap.github.io/components/cards) and [forms](https://react-bootstrap.github.io/forms/overview/), to be specific. Afterwards, you’ll learn about React Bootstrap’s grid system, which makes your app responsive.

You can use the components explored in this Exercise as a starting point for your own UI elements. However, you’ll be able to customize these components to your own taste, or to meet myFlix’s particular needs. Customization will also be covered later on in this Exercise.


> Make sure you check out the available components on the official React Boostrap page.


##### Integrating React Bootstrap

Before getting started, you first need to install `react-bootstrap` and `bootstrap` into your Books app CodeSandbox. Add the lines `"react-bootstrap": "2.5.0"` and `"bootstrap": "5.2.0"` to the dependencies section of the `package.json` file. It should look like this:


```js
"dependencies": {
    "bootstrap": "5.2.0",
    "prop-types": "^15.8.1",
    "react": "18.0.0",
    "react-bootstrap": "2.5.0",
    "react-dom": "18.0.0",
    "react-scripts": "4.0.0"
  },
```

Once that’s done, you need to import the bootstrap CSS file. Add the following at the top of your “index.jsx” file. However, before the line `import "./index.scss";`:


```js
import "bootstrap/dist/css/bootstrap.min.css";
```

Now you can use React Bootstrap components and features in your app! So, let’s get started.


#### React Bootstrap Components

This section will cover two crucial design components available through React Bootstrap: cards and forms.


##### Cards

Cards are all the rage in modern UIs. You’ll find them everywhere, from your Netflix recommendations to your preferred news site. A card is a reusable and recurring component presenting users with some information. Cards are usually presented side-by-side, in a kind of “gallery” format.

Netflix is a great example of card use. Check out Figure 4, which is a snapshot of Netflix’s recommended shows menu. Each show is presented as its own card, with each card containing a slice of information about the show, such as its duration, release date, an image, a written description, and also a “+” button that allows users to add the show to their watch lists.

![Snapshot of cards being used in Netflix’s browsing menu](images-md/misc/cards-netflix-example_1751498312820.png)


###### Figure 4. Netflix uses cards to great effect to provide users with information. (Source: Netflix)

Let’s now take a look at how you can create similar card components with React Bootstrap.

![Code for a card component in React Bootstrap with a preview of how the card would look to a user](images-md/misc/bootstrap-card-code_1751498313324.png)


###### Figure 5. Source: React Bootstrap GitHub.

To practice using cards let’s keep working on the demo Books app.

So far, the recurring `BookCard` component displayed in the main view (`MainView`) for logged in users is just a list of book titles. A good place to start is to make your `BookCard` component (`book-card.jsx`) fancier by replacing your JSX elements with `Card`-related Bootstrap components:


```js
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const BookCard = ({ book, onBookClick }) => {
  return (
    <Card>
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        <Button onClick={() => onBookClick(book)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};
```


> Try It! 
> If you’d like to make the whole card clickable instead, you can add onClick={() => onBookClick(book)} to the <Card> element.

Nice work! You now have cards on your main view that display each book’s image, title, and author, along with a button to open each card into the book view (`BookView`). The previous `div` element has been replaced with the React Bootstrap `Card` element, while maintaining the logic of your nested components.

![Up-to-date code, with preview image](images-md/misc/bookview-card_1751498313495.png)


###### Figure 6. Preview image showing updated book cards.


> Note! 
> The result might look a little disappointing and not at all like the promised Netflix-like look and feel, but no worries, this will change when you apply Bootstrap’s grid system later on.


##### Forms

In [Exercise 3.5: React Forms](https://careerfoundry.com/en/course/full-stack-immersion/exercise/react-forms), you developed the login view, which requires the use of form elements that users can fill out and submit. In this Exercise you’ll refactor the login view to use React Bootstrap form components that will add a nicer look and feel to the view. Not only will the login view look nicer, it’ll also be responsive.

Here’s a look at the required form components from the React Bootstrap library that you’ll use when refactoring the login view:


- <Form>: Replaces the regular <form></form> JSX element.
- <Form.Group>: Creates each of your form fields.
- <Form.Label>: Applies your form field labels
- <Form.Control>: Includes your form field requirements for what’s inserted.


> Capitalization
> Note that the capitalization here does matter, since these are all from the React Bootstrap library and not vanilla JSX. For example, <Button></Button> in the upcoming code is a component from the React Bootstrap package. It’s not the same as the vanilla <button></button> JSX element.

The following code is the `LoginView` component example code from Exercise 3.5. However, it’s been refactored to use React Bootstrap. Note that you need to import `Form` and `Button` Bootstrap components:


```js
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {

  // Same code...

  return (
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

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
```

As you can see, the `Form.Group` elements replace the previous `label` elements, which previously housed the login form input fields.

![Console view of refactored code with Form.Group element](images-md/auth/form.group-login-styled_1751498314116.png)


###### Figure 7. Refactored code snippet.

Now that you’ve learned how to apply Bootstrap form elements to your login view (`LoginView`), go ahead and do the same to the signup view (`signup-view.jsx`).


> Head over to the Bootstrap forms documentation page to learn more about all the available options for forms and its inner components.


#### React Bootstrap Grid System

React Bootstrap offers a pretty versatile [grid system](https://react-bootstrap.github.io/layout/grid) with a wide variety of configurations and options for implementing responsive design. The grid system uses flexbox, which you first used back in your Intro to Frontend Development course, when you designed your portfolio website (and made it responsive). The main three React Bootstrap components that you’ll use to layout your app are:


- <Container>...</Container>: This component is often used page- or app-wide.
- <Row>...</Row>: Controls the vertical layout inside the Container.
- <Col>...</Col>: Controls the horizontal layout within Row. A Col column is where the actual UI resides.

To sum up, a `Container` contains rows (`Row`), with each row containing columns (`Col`). Figure 8 demonstrates the relationship between the three puzzle pieces.

![Code for the col component in React Bootstrap with a preview of how columns will be rendered](images-md/misc/bootstrap-grid-code_1751498314368.png)


###### Figure 8. Code snippet of components, with a preview. (Source: React Bootstrap GitHub)

Bootstrap follows a standard grid where each row can have up to 12 individual columns that can be grouped to define the layout of a page. You can put whatever you want in these columns, whether it be text, JSX, components, or anything else you like.

So, let’s try applying a responsive grid to your app! This section will walk you through two demos. You can follow along in your Books demo before you apply what you learn to your myFlix project in the task!

The first demo will take you through how to apply a grid to `MainView`, and the second demo will take you through how to apply a responsive grid to your `BookCard` component(s).


> Keep in mind that not all apps must follow these approaches. However, the upcoming steps will be sufficient for making your app responsive.


##### Demo 1: MainView Responsive Grid

Step 1: Adding a <Container> Bootstrap Component

Make sure that the entire app is wrapped within a `Container` Bootstrap component. For example, in your `src/index.jsx` file, you currently have `<MainView />` returned as the root component of your app. What you can do here is wrap `<MainView />` with `<Container></Container>`:


```js
return (
  <Container>
    <MainView />
  </Container>
);
```

Don’t forget to import the `Container` Bootstrap component into `src/index.jsx`:


```js
import Container from 'react-bootstrap/Container';
```


> Why Wrap the App in a Container?
> Well, as you learned earlier, Bootstrap content is organized within columns (Col). However, in order to insert these columns, you first need to have rows (Row). Next, in order to have rows, you need to have a container (Container) available. As such, you need to wrap the whole app within a <Container></Container>.

By this point, simply by wrapping the app in a container, you should see some slight changes to the main view—particularly the padding around your login and signup components.

![Screenshot of main view container](images-md/misc/mainview-container_1751498314580.png)


###### Figure 9. MainView container.

Always keep in mind that the `<Container>` won’t occupy the page’s full width by default. Its width will hover around 75 to 95 percent, depending on the full page width. However, if the full page width is too small, the `<Container>` will cover the full width of the page. It’s useful to add a temporary border to the `<Container>` so that you can visualize what’s going on and see how Bootstrap manages white space:


```js
return (
  <Container style={{border: "1px solid red"}}>
    <MainView />
  </Container>
);
```

This border will help you observe how the grid system works, especially when testing with `BookView` and the list of book cards. You can remove the border once you’ve implemented the grid system.

![Login page with border in place](images-md/misc/mainview-container-border_1751498314783.png)


###### Figure 10. Temporary border added to container.

Step 2: Adding a <Row> Bootstrap Component

`MainView` currently has a few if statements that check whether there’s a `user`, if there’s a `selectedBook`, and if `books` is empty. One option is to wrap every piece of JSX with a `Row` element, but that’s tedious and error prone (as it’s easy to miss a section that needs to be wrapped). So, what’s the alternative? It’s simple! You need to reorganize your component a little so that you only need one `Row`:


```js
import { useState, useEffect } from "react";
import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";

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

  return (
      <Row> 
        {!user ? (
          <>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            or
            <SignupView />
          </>
        ) : selectedBook ? (
          <BookView 
            book={selectedBook} 
            onBackClick={() => setSelectedBook(null)} 
          />
        ) : books.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onBookClick={(newSelectedBook) => {
                  setSelectedBook(newSelectedBook);
                }}
              />
            ))}
          </>
        )}
      </Row>
  );
};
```

Take a moment to identify what’s changed. The `MainView` component now only has one `return` statement that has a `Row` as the root element. The nested elements are conditionally rendered using the [ternary operator ?:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

Also, you can see that all the `useState()` calls were moved to the top of the component. Notice how much easier and quicker it is to identify your state variables this way? That’s why this is a best practice when coding with React!


> Try It! 
> Since you’re changing the MainView for logged-in users too, don’t forget to log in with your Open Library username and password as you work through the demo!

Step 3: Adding a <Col> Bootstrap Component

When using a grid in Bootstrap, UI content should go inside a `<Col>` component. In this example, `<BookView>` is the content, so it needs to be enclosed in a `<Col>` component (make sure that `Col` is imported with `import Col from 'react-bootstrap/Col';`).

As you learned at the start of this section, a row in a Bootstrap grid can be split into 12 shares (twelfths). It’s perfectly fine to only have one column within a row that comprises however many twelfths you decide—not all pages/views have grids of items. You’ll want to specify how many shares out of twelve you want this column to take (i.e., how many twelfths do you want your single `Col` to consist of?) You can, for example, give the column that has `BookView` in it eight shares, then center it afterwards, which will give it a nice look:


```js
<Col md={8}>
  <BookView
    book={selectedBook}
    onBackClick={() => setSelectedBook(null)}
  />
</Col>
```

Here, the `md` breakpoint is used, so if the screen width is less than 768px, each column will take the full width no matter how many shares it’s been assigned. You can learn about all the breakpoints in the [React Bootstrap documentation on grids](https://react-bootstrap.github.io/layout/grid/).

To center the columns within a row using Bootstrap utility classes, you can use the `justify-content-md-center` class:


```js
return (
    <Row className="justify-content-md-center">
      …
    </Row>
  );
```

If you open any‌ book view, you’ll notice that it appears as though the column is neither centered nor taking 8/12 of the container/row width:

![Book view with seemingly uncentered column](images-md/misc/bookview-uncentered_1751498315034.png)


###### Figure 11. Book view with seemingly uncentered column.

However, this isn’t actually the case. Things get much clearer when you apply a temporary border (use a different color) to `<Col md={8}>`:


```js
<Col md={8} style={{ border: "1px solid black" }}>
         <BookView
           style={{ border: "1px solid green" }}
           book={selectedBook}
           onBackClick={() => setSelectedBook(null)}
         />
       </Col>
```

This new border (which shows you the actual column) allows you to see that the column is actually perfectly centered, and rendered as intended:

![BookView with second border included](images-md/misc/bookview-second-border_1751498315492.png)


###### Figure 12. Book view with second border visible.

The content inside the column looks off center simply because it isn’t using the available space. If you wanted to though, you could set the image to take up the column’s full width in `book-view.jsx`:


```js
img {
  width: 100%
}
```

![Image in book view taking up 100% of the column](images-md/misc/bookview-100_25-column_1751498315916.png)


###### Figure 13. Book view with image at 100% column width.

You’ll find that the content of `BookView` takes 8/12 of the available width of the container/row if the screen width is greater than or equal to 768px. Otherwise, the content will take up the whole width. Try to keep narrowing down the viewport in the CodeSandbox. You should see something like this:

![A book view with narrowed viewport in CodeSandbox](images-md/misc/bookview-narrow-viewport_1751498316566.png)


###### Figure 14. Book view in narrowed CodeSandbox viewport.

The little white spacing that’s still present on each side of the image is from the column itself. If you look closely, you’ll see that the column’s black border is in fact right next to the container’s red border, which means that the column’s outermost boundary has expanded to the max, filling the container’s full width.


> Note!
> The column border won’t be needed from this point forward, so you can remove it if you like.

You can also wrap `LoginView` and `SignupView` with a `Col` and give them four or five twelfths:


```js
<>
          <Col md={5}>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            or
            <SignupView />
          </Col>
        </>
```

You can now omit `<></>` because `<Col md={5}></Col>` will now be the root component the  or `:


```js
<Col md={5}>
         <LoginView onLoggedIn={(user) => setUser(user)} />
         or
         <SignupView />
       </Col>
```

Now the `LoginView` and `SignupView` components render like this:

![LoginView and SignupView rendered centrally with five twelfths of the column width](images-md/auth/login-signup-centered_1751498317054.png)


###### Figure 15. LoginView and SignupView rendered with 5/12 column width.


##### Demo 2: BookCard Responsive Grid

When it comes to displaying the `BookCard` component in `MainView`, you can implement the same three steps from the Demo 1 example. You already have the `<Container>`and `<Row>` elements, so you’ll need to wrap each `BookCard` within a `Col` Bootstrap component. In this example, four cards will share the same row, so each column needs to be given three shares out of 12 (since 12 shares divided by four is three):


```js
<>
          {books.map((book) => (
            <Col key={book.id} md={3}>
              <BookCard
                book={book}
                onBookClick={(newSelectedBook) => {
                  setSelectedBook(newSelectedBook);
                }}
              />
            </Col>
          ))}
        </>
```

Note how the `key` attribute was moved from `BookCard` to `Col`.

![Image showing four books/columns per row](images-md/misc/bookcards-4cols-uneven_1751498317281.png)


###### Figure 16. Four columns (book cards) per row.

When using a grid of columns, it’s important to remember that the height of every column will match the height of the tallest item in the column/grid. This might not always seem to be the case at first glance though. A great example of this is Figure 16, where it looks like some columns are taller than others. Once again though, it’s the content inside the columns (each book card) that’s not using the full height of its containing column.

The solution is to set the book card to `height: 100%`. Fortunately, Bootstrap provides a huge array of utility classes that makes it easy to apply such quick style changes to your elements. For example, you can use [sizing utility classes](https://getbootstrap.com/docs/5.2/utilities/sizing/). The class `h-100` would be incredibly useful in this case, as it applies `height: 100%` on the element. Go ahead and add the class `h-100` onto the root component in `book-card.jsx`, which is `<Card>`:


```js
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import "./book-card.scss";

export const BookCard = ({ book, onBookClick }) => {
 return (
   <Card className="h-100">

// rest of code
```

Once done, you should see something like this:

![Book cards now fill their respective columns entirely](images-md/misc/bookcards-cols-filled_1751498318018.png)


###### Figure 17. Book cards now fill their respective columns entirely.

The cards look quite bunched together though, so you should apply `margin-bottom` on each column rendered in `main-view.jsx`. You can use [spacing utility classes](https://getbootstrap.com/docs/5.2/utilities/spacing/) this time. You can use `mb-x`—the “mb” stands for “margin bottom,” and “x” is the number representing the size of the space. The linked documentation provides all the information you need to know how the space is calculated. To keep it simple, you can just use numbers from zero to five. For example, add the class `mb-5` to the `<Col md={3}>` in `MainView`:


```js
<>
         {books.map((book) => (
           <Col className="mb-5" key={book.id} md={3}>
             <BookCard
               book={book}
               onBookClick={(newSelectedBook) => {
                 setSelectedBook(newSelectedBook);
               }}
             />
           </Col>
         ))}
       </>
```

Now it’s an evenly spaced grid:

![Evenly spaced book cards grid](images-md/misc/bookcards-cols-even_1751498318638.png)


###### Figure 18. Evenly spaced book cards grid.


> Tips!
> 
> 
> Remove the red border applied onto the <Container> in src.index.jsx.
> Earlier in this Exercise, you applied 100% width on the img element in book-view.jsx. Another way of applying the same effect could be done using the utility class w-100 on the <img /> element. w-100 stands for width: 100%.

For more guidance on applying a responsive grid to a project with React Bootstrap, check out the following video:



###### Figure 19. Applying a responsive grid to a project.

There are plenty of other components you can use to make your app look appealing. A good rule of thumb when using an external framework to style your app is to avoid writing custom CSS wherever possible. For instance, rather than writing SCSS to define your layout, try to find an existing component to position your elements. You can then customize these components to meet the design and styling requirements of your project. You’ll cover this soon!


> Code check!
> Check out the complete CodeSandbox for applying a responsive grid: 
> 
> 
> Codesandbox 3.6: React Bootstrap Responsive Grid


#### Customizing React Bootstrap

You’ll often need to customize colors, sizes, and other behaviors for your components. Fortunately, Bootstrap makes it very easy to do so with built-in Sass variables.

To enable customization, you need to change the way you import Bootstrap. Currently, you’re importing `bootstrap/dist/css/bootstrap.min.css` (which is a production-ready file that doesn’t support customization) directly into the `index.jsx`. Instead, you need to import the Sass file into `index.scss`:


```js
@import '~bootstrap/scss/bootstrap.scss';
```

Now, let’s consider an example. Let’s say you want to change the primary and the body-bg colors, which are both built-in variables for you to use. You can add the following to `index.scss` before the `@import` statement:


```js
$primary: SeaGreen;
$body-bg: Honeydew;

@import '~bootstrap/scss/bootstrap.scss';
```

And remove `import "bootstrap/dist/css/bootstrap.min.css";` from src/index.jsx.

![Green Login and Signup form after color customization](images-md/auth/login-signup-color_1751498319326.png)


###### Figure 20. Login and Signup form after color customization

To learn more about which variables can be customized head to [the Bootstrap customization docs](https://getbootstrap.com/docs/5.2/customize/sass/). The colors used in Figure 20 are `SeaGreen` and `Honeydew`, but there are many [other built-in named colors](https://www.csscolors.dev/) that you can use.


> Code Check!
> Check out the CodeSandbox here to see the customization applied to your Login and Signup form: 
> 
> 
> 3.6 React Bootstrap Customization
> 
> 
> You may see an error when you try to run the code. This is a recurring bug experienced by CodeSandbox, and can be resolved by clicking on the “Refresh” button (next to the URL in the built-in browser).


#### Summary

Nicely done. This Exercise highlighted the importance of being able to use your coding knowledge to implement aesthetic design changes in an app. You learned how to apply the principles of good design to your app. Designers you work with in the future will expect you to understand how to aesthetic-related changes, which is why it’s essential that you’re able to use a tool like React Bootstrap to apply styling to any apps that you build. Any app you develop should be both user-friendly and aesthetically pleasing, with a consistent visual style.

As you might have already guessed, in this Exercise’s task you’ll be integrating React Bootstrap into your myFlix app, and adding consistent styling across each of your views.


#### Resources

If you’re curious to read more about the topics covered in this Exercise, then we recommend you take a look at the following resources. Note that this reading is optional and not required to complete the course.


- React Bootstrap
- React Bootstrap Tutorial
- React Bootstrap Grid System
- React Bootstrap Forms
- Bootstrap Sizing Utilities
- Bootstrap Spacing Utilities



Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

In this task, you’ll add styling to myFlix with React Bootstrap. If you need a refresher of the process, a useful video walkthrough is provided in the Resources section. You can also use the wireframes in your [Achievement 3 project brief](https://images.careerfoundry.com/public/courses/fullstack-immersion/full-stack-project-briefs/A3-Project-Brief-2022.pdf) to help guide your Bootstrap styling decisions.

Directions:


1. Create a new GitHub branch off of the main branch.
1. Using the terminal, navigate to your project folder and install React Bootstrap by running npm install react-bootstrap bootstrap, then import bootstrap in src/index.scss.
1. Apply a responsive grid to your views using Bootstrap. Add a container to your index.jsx file, and then rows (Row) and columns (Col), as needed, to myFlix’s MainView.
1. Use Bootstrap to incorporate all the UI components you’ll need for your views at this stage, such as form elements, cards, and buttons.
1. Apply consistent styling across your views by customizing your Bootstrap components.
1. After pushing to your branch, create a zip file of your project repository on your computer. Be sure you've zipped the version from your new branch!
1. Create a pull request, and send both the link to your pull request and the zip file of your repository to your tutor to review.
1. Once approved, merge the pull request into the main branch (do this before you start the next task!).

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](images-md/icons/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c_1751498319495.svg)


- Pull request demonstrates successful attempt to incorporate Bootstrap into the project; BUT
- Visual styling using React Bootstrap and its components not applied successfully in all React views; AND
- Files contain major syntax errors

![](images-md/icons/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87_1751498319607.svg)


- Pull request demonstrates successful attempt to incorporate Bootstrap into the project; AND
- Visual styling using React Bootstrap and its components applied appropriately in all React views; BUT
- Files contain minor syntax errors, or some components or custom styling is missing

![](images-md/icons/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4_1751498319638.svg)


- Pull request demonstrates successful attempt to incorporate Bootstrap into the project; AND
- Visual styling using React Bootstrap and its components applied appropriately and successfully in all React views; AND
- Files contain no syntax errors, and all components and custom styling have been applied effectively and consistently

Questions for this task

Student Submissions

Check out recently submitted work by other students to get an idea of what’s required for this Task:
