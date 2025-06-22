

## Client-Side Programming & React


# 3.2: Building with JavaScript


- Learning Goals
- Introduction
- Introduction to React
- What is the Build Process?
- Setting Up Your React Development Environment
- What are Build Tools?
- Parcel: A Build Tool
- Creating a New Repository
- Configuring Parcel for Your myFlix App
- Building An App
- Summary
- Resources
- Task
- Forum


#### Learning Goals


- Discuss the suitability of React for your app
- Prepare a product for execution using build tools


#### Introduction

Welcome back! In the previous Exercise, you learned about JavaScript frameworks and libraries, and the differences between them both. Now that you’re familiar with the benefits of using a framework or library to build the client-side of your myFlix app, it’s time to learn why you’ll be using React to build your app. You’ll also make a start on one of the most important web development steps: the build process.

In this Exercise, you’ll dive deep into the component-based nature of React. You’ll explore what the build process consists of, closely looking at some of the individual tasks involved. Then you’ll learn why the build process is necessary, and be presented with a few tools that can help you along the way. You’ll also learn how one tool in particular, Parcel, can help to expedite the process of building your myFlix app. Let’s go ahead and get started!


#### Introduction to React

React is a JavaScript library for building user interfaces. It uses modularized code that comes in the form of “components.”

Let’s take a look at React’s benefits:


- It’s declarative: Code written in React is easy to read and, therefore, easy to maintain.
- It’s component-based: To build with React, you create reusable components. This allows you to increase the scope of your web app with little to no performance issues (it’s super fast!) or concerns about entropy.
- It works well with data: The data you display to your users can change over time without having to reload the page.
- It’s compatible with other tools: For example, React Native, a framework for building native apps using React, and Redux, a library for managing app states. You’ll learn more about these tools later on in this course.
- It has a wide user base and plenty of online resources.
- It's built, used, and supported by Facebook: React’s documentation is well maintained, and you won’t have to wait several weeks for bug fixes!
- It’s relatively small.

If you visit the React website, you’ll see that it’s called a library. However, it acts a lot like a framework. For example, React doesn’t have a global variable you can call whenever you want (such as jQuery’s $), and you wouldn’t just pick a specific element and use it in your existing app. React is also pretty opinionated about your app structure, so you need to adopt its way of doing things from the get-go if you want to fully reap its benefits. Confusing, right? For the purpose of this course, you'll be using React like a framework.


##### Using React for myFlix

Let’s take a look at why React is the most suitable framework for your myFlix app. You’ve already established that using a framework will give myFlix the flexibility to scale (display more data) and change in scope (grow). With these points in mind, React stands out as the most suitable option for a couple of reasons:


1. It’s component-based, which means it will be able to manage the scope of your project very well. You’ll be able to add new features and functionality in a constrained, structured, and modular way.
1. If you consider the purpose of your myFlix app—displaying data about movies to users—the way in which React handles data makes it a pretty good match. After all, you don’t want your users to have to manually refresh the UI based on changes in the data (i.e., once the movie data has been loaded, you’d like the UI to reflect it without much hassle).

React is also user-friendly, readable, and has comprehensive documentation and tutorials so you can start using it without too much guesswork. It’s also the most popular JavaScript framework available right now, which means you’ll be able to find plenty of resources online should you need them.

![Comparing React, Angular, and Vue January to September 2022](images-md/misc/react-ang-vue-trend-comparison_1750632154363.png)


###### Figure 1. Source: Google Trends

Knowing your way around React and being able to demonstrate React skills in a portfolio is definitely a professional asset, as the demand for developers with React skills is growing in line with its popularity.

With its associated ecosystem of tools, React is also a good springboard for your first foray into areas such as native app development. Using React Native, for instance, you can build portfolio-enhancing native apps with complex functionality. In fact, you’ll be doing just that in Achievement 5 of this course!


> You now have the final piece of the MERN tech stack you’ll be using for your myFlix app: MongoDB, Express, React, and Node.js.


##### Component-Based App Structures

In order to make web apps easy to read and write, developers tend to organize their code into reusable components. These packaged pieces of logic can be reused throughout an app for repeated features and tasks.

Imagine you’re writing the code for your myFlix app’s main view, which will contain a list of movie items, which in turn will contain the title of each movie, respectively. There will be as many movie items as there are movies.

Instead of writing the code for each movie item over and over again, you could use React to create a reusable component. This reusable component would encapsulate the movie item logic into an element (a component), usually in its own file; you can then reuse this logic in various places without having to rewrite it.

By naming the component semantically (e.g., `MovieCard`), the code is kept accessible, efficient, and usable. Rather than wild herds of `div`s living everywhere in your app, you’ll have self-explanatory `MovieCard` components! (You may remember semantic code from your Intro to Frontend Development course, when you made the HTML and CSS for your portfolio website semantic).

![MainView with several MovieCards, and subsequently a list of movies](images-md/misc/moviecards-in-mainview-oscars_1750632154762.png)


###### Figure 2. MovieCard (movies) list.

In this case, there are `MovieCard` components rendered within `MainView` that contain Oscar nominees for Best Picture in 2022. There were 10 nominees, and therefore there are 10 components, one for each of the Best Picture nominee movie titles. If the decision had been made that each card should contain a title and an image, then every card component would render the title and the image for each movie.


#### What is the Build Process?

You already know from earlier in this course that HTML, CSS, and JavaScript can be read directly by browsers, like Firefox or Google Chrome. If you were to write a file containing these three languages (to display a list of movies, for example), you’d be able to open that file in your browser without any extra steps.

The more code you add to your codebase, however, the more likely it is that you'll need to process this code in various ways before it can ultimately be read by the browser. You might, say, use "Sassy CSS" (SCSS) instead of regular CSS for convenience. But browsers don’t know how to read SCSS, so you’d need to transform any SCSS into CSS before deploying your app.

In addition, the highly modularized nature of the JavaScript ecosystem (one file for one module, view, etc.) can take a toll on the load time of your app. Likewise, code files often contain more information than they actually need (to ensure they can be understood by other developers), which can further contribute to performance issues.

So, there are a number of tasks to complete during the development process that help with the organization, readability, and maintenance of your code. But these steps don’t always translate smoothly when it comes to executing your code. Thus, the need to process code has emerged, and this step is what’s known as the build process.

The most common operations in the build process are as follows:


- Transpilation: Some languages, or versions of languages, can’t be directly interpreted by the browser. Transpiling fixes this by rewriting them in a way that the browser can understand.
- Bundling files: Bundling files refers to regrouping code into a smaller number of files to improve an app’s performance in the browser.
- Minification: Minification is the process of removing all unnecessary characters from a file in order to make the file as small as possible and faster to load.
- Auto-prefixing CSS: Auto-prefixing is the process of automatically adding the correct prefixes to CSS syntax to make sure it can be understood by different browsers.


> If some of these concepts sound familiar, it’s because you already touched on minification and reducing the number of files back in Achievement 1 of this course (in the context of performance optimization).

You can perform these operations manually by running the appropriate commands in the command line. But to streamline the build process and develop at a faster pace, it's better to roll them into a single step using a build tool—a single tool that will perform all of the operations at once with a single command.

Think of the build tool like the music conductor of the build process. The build tool instructs all of the orchestra's musicians, or individual tools, to work in tandem to complete the build process. You’ll be exploring build tools in more detail later in this Exercise, but before you do, let’s pause and take a closer look at the processes just outlined.

![A conductor leading an orchestra](images-md/misc/conductor-orchestra_1750632154997.png)


###### Figure 3. Build tools can be thought of as orchestral conductors.


##### Transpilation

Transpilation involves transforming code from one programming language to another. Sometimes, whatever’s going to be executing the code (i.e., the runtime environment) can’t read the code as is, so this extra step is required to change the code into a language the processor can understand.

![A code pane on the left with ES6 code next to a code panel on the right with the same code but in ES5](images-md/misc/transpile-javascript_1750632155307.png)


###### Figure 4. Screenshot of the online Babel JavaScript transpiler.

One example of transpilation you’re likely to be familiar with is JavaScript’s ES6. You might remember from your first Immersion Exercise that ES6, or ES2015, was finalized in 2015 and made significant improvements to JavaScript—improvements that rendered many libraries obsolete. Prior to ES6, developers needed a third-party library to use promises; now, they're supported natively. To this day, however, not all browsers fully support ES6 syntax, including a few mobile browsers and Internet Explorer. For this reason, ES6 has to be transpiled into ES5 JavaScript so that all browsers can understand it.

Despite this, most developers prefer to write ES6 JavaScript. This is because ES6 offers a lot of handy features for writing clean and concise code. For example, the following JavaScript code is performing an operation to capitalize the content within an array.


```js
['a', 'b', 'c'].map(function (letter) {
  return letter.toUpperCase();
});
```

This is ES5 JavaScript, which means it can be directly executed by any browser. It is, however, a little verbose, so let’s try rewriting it using an “arrow” function—a handy feature from ES6 that you first learned about in Achievement 1:


```js
['a', 'b', 'c'].map(letter => letter.toUpperCase());
```

This is much easier to read—for you, at least. But not so for every browser. The arrow function syntax is a feature of ES6, so it needs to be transpiled before it can be read by some browsers. For this, you can use the [online Babel transpiler](https://babeljs.io/repl). Enable the es2015 option under PRESETS on the side menu and paste the code above into Babel’s left-hand pane. Does it return the following in the right-hand pane?


```js
"use strict";

['a', 'b', 'c'].map(function (letter) {
  return letter.toUpperCase();
});
```

This looks a lot like the first bit of code: it’s 100 percent ES5 compliant. Following transpilation, the potentially unsupported arrow function has been replaced by a traditional function. Babel also added a `"use strict;"` instruction to ensure the JavaScript is executed in a safe manner—this avoids some silent errors and prohibits certain error-prone syntaxes. The code is now readable by all browsers!

Another example of ES6 to ES5 JavaScript transpilation in action involves the `import()` statement used in ES6 code. With transpilation, it becomes the ES5 compliant `require()` statement that you first encountered in Achievement 2. For example, `import { test } from './test';` would become `var _test = require("./test");`.


> There are a number of other languages besides ES6 that require transpilation—for example, JSX, a React-based syntax that allows HTML and XML to cohabit with JavaScript code, must be transpiled into JavaScript; TypeScript must be transpiled into JavaScript; and SCSS must be transpiled into CSS.

You’ll use Babel to do all your transpilation in your build process, but you won’t have to do it manually. Your build tool will use Babel to convert ES6/JSX code to browser-readable code. You’ll learn more about the build tool that you’re going to use as you continue the Exercise, but keep in mind that this build tool uses Babel as a dev dependency, and will automatically configure Babel for you. Keep in mind that once configured with Babel, your project will follow the (build process) steps described earlier.


##### Bundling Files

JavaScript development is, by necessity, modularized. A project will contain numerous files with varying responsibilities and dependencies. Here's an example:


```js
// sum.js
export default function sum(a, b) {
  return a + b;
}
```

And in another file:


```js
// index.js
import sum from './sum';
sum(1, 2);
```

There are two problems associated with this approach: 1) browsers don't know how to deal with modularized code (they only load what they're specifically instructed to load), and 2) additional queries take time. This is where bundling is useful.

Bundling files means grouping them into as few files as possible. This is usually done with a build tool. The build tool looks at an “entry file” within the project (`index.js` in the earlier example), then determines what that file requires to run (its dependencies) and concatenates (combines) the two (or more) files into a single, new file called the “bundle file,” “build file,” or “output.”

Though bundling can be done manually, using a build tool provides one significant advantage: the build tool will first construct a dependency tree that maps the dependencies of the entire project, and only then will it bundle the files. This generally makes the final file more optimized, as the build tool won’t make the mistake of adding the same dependency twice.


##### Minifying Code

Minification is the process of removing data from a code file that's not needed by the browser and simplifying the code as much as possible: for instance, removing additional spaces and code comments, or replacing variable names with single letters.

Minifying code helps to optimize an app’s performance because smaller, lighter files load faster than regular ones. For a look at just what the minification process involves, try playing around with [this online JavaScript Minifier](https://www.minifier.org/). Write or copy-paste some code in the input field, click the “Minify” button, and see what happens to the code!

![Pane with original code on the left and pane with minified code on the right](images-md/misc/minification_1750632155496.png)


###### Figure 5. Minified code.


##### Auto-prefixing CSS

Do you remember the concept of “auto-prefixing” from way back in your Intro to Frontend Development Course? Here’s a quick recap:

Non-standard or experimental CSS features often need to be “prefixed” by the browsers displaying them before the browsers can fully support them. In order to write CSS code that'll be properly interpreted, even on old browsers, you have to write both the regular rule (e.g., `display: flex;`) and the prefixed version. To make matters more complicated, you also need one prefix per browser vendor.


```js
display: -webkit-box;
display: -ms-flexbox;
display: flex;
```

As you can probably imagine, auto-prefixing is a tedious and error-prone task when done manually. For this reason, it's often automated and handled by a build tool as part of the build process.


#### Setting Up Your React Development Environment

Now that you’ve explored how you’ll build your app, let’s walk through a few components you’ll need to prepare in order to set up your React developer environment. Think of this section as a step-by-step checklist. You’ll be looking at setting up the following components:


- CLI / Terminal / Shell.
- Node.js and Node package managers.
- Git.
- Web browsers.
- Code editors.


##### 1. Command Line Interface / Terminal / Shell

As you’ll remember from earlier on in this course, every operating system comes with its own command line interface (CLI) tool. In this Achievement, you’ll often use the CLI tool for your corresponding OS. If you need a refresher on some of the different commands you can use with your CLI, revisit the [“Using the Terminal” section of Exercise 2.1](https://careerfoundry.com/en/steps/intro-to-server-side#using-the-terminal). These commands should work for both macOS and Linux users. You’ll also find Windows-specific commands there that you can run on Windows PowerShell. For Windows 10 and 11 users, continue with Windows Powershell from [Setting Up Your Development Environment section of Exercise 2.1](https://careerfoundry.com/en/steps/intro-to-server-side#setting-up-your-development-environment). If you haven’t set one of these up for yourself yet, you can find instructions for both approaches [in this installation PDF](https://images.careerfoundry.com/public/courses/fullstack-immersion/A2/E1/2.1%20Instructions%20for%20BASH%20for%20Windows%20Users.pdf).


##### 2. Node.js and Node Package Managers

A prerequisite for coding with React is having Node and a Node package manager installed. While you likely already have Node installed on your system (as you used it for the previous Achievement), just in case you’re working in a new environment, you can always check if it’s already installed by running `node -v` in your terminal (this is a good command to keep in mind if you’re ever working on a different machine than normal in your future career). If, for whatever reason, it’s not installed, revisit the [“Installing Node” section in Exercise 2.1](https://careerfoundry.com/en/steps/intro-to-server-side#installing-node).

As for package managers, if you have Node installed, then npm should already be installed; however, if you want to use Yarn instead of npm, you can [follow the instructions on Yarn's website here](https://yarnpkg.com/en/docs/install#mac-stable). Just be sure to select the correct operating system.


##### 3. Git

Git is another tool you’ll be using again in this Achievement. Like Node, you likely still have it installed, but if you need a refresher on what Git is and how to install GitHub Desktop, revisit [Exercise 1.9: Git & Version Control](https://careerfoundry.com/en/steps/git-and-version-control#working-with-git) from your Intro to Web Development course. Keep in mind that GitHub Desktop is officially only available for Windows and macOs; however, [you can find some alternatives here for Linux OS](https://git-scm.com/download/gui/linux).


##### 4. Web Browsers

When working with React, it's highly recommended that you use either Chrome or Firefox. It will simply make your life easier as a developer!


##### 5. Code Editors

Prior to this Achievement, you had some freedom choosing which code editor to use for your projects. Starting in this Achievement, however, it's recommended that you begin using Visual Studio Code (VSCode), as it’s one of the easiest code editors to use with React (download via the [VSCode website](https://code.visualstudio.com/)). While you aren’t required to switch to VSCode if you’ve been using a different code editor, do note that the screenshots and instructions throughout this Achievement will assume you’re using VSCode, so you may run into some areas that may not work the same as indicated in the text.

Once you’ve downloaded and installed VSCode, make sure to change the indentation to your preferred size (Setting it to “2” and using “Spaces” for indentations rather than “Tabs” is recommended). You can follow the instructions mentioned in the best solution for this [StackOverFlow Question](https://stackoverflow.com/questions/34174207/how-to-change-indentation-in-visual-studio-code?rq=1) for setting up your indentation.

VSCode comes with handy built-in tools and utilities such as:


- Automatic Error-Highlighting: VSCode highlights JavaScript syntax errors in a file by adding a red marker ~ close to where it thinks the error exists (for instance, the right bracket is missing in the first line in Figure 6). It will also highlight the name of the file with errors in the left sidebar and display the number of syntax errors it contains, as shown with the “server.js” filename (currently displaying “2”):

![Error-highlighting in VSCode](images-md/misc/vscode-errors_1750632155782.png)


###### Figure 6.


- Code-Formatting Utility: VSCode has a built-in formatting utility (e.g., auto-indenting) that makes your code look nice, tidy, and professional. You can tell VSCode to automatically format your code whenever you save your file.
- Integrated Terminal: VSCode comes with an integrated terminal, which uses your OS's terminal (whether you use macOS/Win/Linux) by default. This can speed up the development process for some developers, especially for those who use a single monitor setup or who don't like using Alt+Tab or Command+Tab to switch between their terminal window and the code editor. To toggle between the integrated terminal, press Ctrl + back-tick.
- Auto-Formatting: You can enable the "Format on Save" built-in feature, which allows VSCode to auto-indent your code lines whenever you save the code.


> Tip: Enabling VSCode Auto-Formatting
> 
> 
> Go to File → Preferences → Settings (Windows) /  Code → Preferences → Settings (Mac).
> Look for "Format on Save" in the search box, and tick the relevant checkbox. Then close the settings tab.
> 
> 
> You can also use the context menu. Just right-click anywhere within the editor, and select “Format Document.”

These are just a handful of the extra features beyond what’s already available by default for JavaScript developers in VSCode, and they can make you much more efficient in your work!

Code Editors Plugins/Extensions

Some developers prefer to augment their code editors with external plugins and extensions. If you open up the Extensions settings in VSCode (File → Preferences → Extensions (Windows); Code → Preferences → Extensions (Mac)), you’ll be shown a large list of extensions you can use to enhance your experience. Be careful, though, as you don’t want to bloat VSCode with extensions—this can cause inconsistencies and editor crashes. Make sure you only install extensions with high popularity and ratings. You can also manually search for specific extensions by typing in the search bar.

Keep in mind that one of the main reasons VSCode works so well for JavaScript developers is that it already includes a wide set of built-in tools, so that you may not need to install any additional extensions.


#### What are Build Tools?

So far in this Exercise, you’ve learned about some key operations that make up an app’s build process and why these operations are likely to be automated using a build tool, including those that could be done manually. But what exactly is a build tool? As mentioned earlier, a build tool is like the conductor of an orchestra—it runs the build process and delegates tasks to specific instrument players (the individual tools used for each task). A build tool groups the separate operations that make up the build process into one single step, thus preventing the development process from getting out of control. It harnesses other tools to prepare a production-ready version of your code.

Though it may feel counterintuitive to be considering the production version of your app right now, the build process usually marks the first step at the beginning of a new project. Setting up your build tool early on means you can develop and implement features incrementally and iteratively by immediately viewing the end result in your browser.

Now that you understand what a build tool is, let’s take a look at the tool you’ll be using for your Achievement project: Parcel!


#### Parcel: A Build Tool

![The Parcel homepage](images-md/misc/parcel-home_1750632156049.png)


###### Figure 7.

Your task at the end of this Exercise will be to set up Parcel to build the code for your myFlix app. It will load JavaScript, JSX, and SCSS files and output everything as a browser-friendly version in order to render the app. Parcel requires minimal configuration, has fast bundle times, is well-documented and actively maintained, and works automatically with a variety of files. It also offers some very useful features, such as building and serving your code, and refreshing the browser every time the code changes.

How it works is easy: you tell Parcel which file in your project is the entry file (usually “index.html”); then, Parcel bundles all the files contained within that file into a single file before serving it back, ready to be viewed in a browser.

What happens behind the scenes is also pretty straightforward: Parcel takes an entry file, lists all of its dependencies (and any dependencies of those dependencies), then builds a dependency tree of all the files. For each of the mapped files, Parcel detects their format and performs the necessary build operations on them (e.g., transpiling and/or minifying). As a final step, Parcel bundles everything into as few files as possible.


> Note
> Automatic transform: Parcel performs code transformations using Babel by default.


##### Live Reloading Your Code

As just outlined, Parcel builds your code, serves it, and refreshes the browser every time your code changes. This important step in the development process is known as live reloading. What this means in practice is that each time you make a change to your code, the build system automatically triggers a page refresh in your browser. This can dramatically increase your development speed as you no longer need to switch back and forth between your code editor and your browser—the latter is updated automatically.

![Diagram outlining the Parcel live reload process](images-md/misc/parcel-live-reload_1750632156364.png)


###### Figure 8. Source: LogRocket


#### Creating a New Repository

For this Achievement, you’ll create a new GitHub repository separate from the one you used for the backend implementation of your myFlix app. Open GitHub Desktop. In the File menu, select New Repository... to bring up this form:

![Create a new repository](images-md/misc/create-repo_1750632156605.png)


###### Figure 9.

In the Name field, type “myFlix-client”—this will be the new local project folder that GitHub Desktop will create for you. Then, click Choose... and select the folder where you want the “myFlix-client” folder to be created. Avoid selecting the `C:\` drive if you’re on Windows or the root directory `/` if you’re on MacOS. It’s better to have your projects created within another folder like “/Users/Sally/myProjects” for Mac users or “C:\Users\Sally\careerfoundry” for Windows users. These are folders you’ll have created if you followed the initial instructions in Exercise 2.1—if you have such folders, go ahead and select them for the Local path. Keep the rest as is, then click Create repository.

Now, click the blue Publish repository button:

![Publish Repository button.](images-md/misc/publish-repo_1750632156835.png)


###### Figure 10.

This will bring up the final window. Make sure that the online repository name is “myFlix-client” and that the Keep this code private box is unchecked. Finally, hit Publish repository:

![Final public repository window.](images-md/misc/publish-repo-final_1750632157127.png)


###### Figure 11.

If you open GitHub in your browser, you’ll find your newly published repository.

It’s now time to initialize your “package.json” file. This is necessary as you’re going to need it to install Node modules for this project. Open your terminal, navigate to the your “myFlix-client” project folder and run the following command:


```js
npm init
```

This will prompt you to fill in details for your “package.json” file. You can keep everything as its default. Once done, you’ll see `package.json` pop up in the editor’s file explorer. Click the file to view it, and remove `"main": "index.js"`, then save.

Before committing changes on GitHub Desktop, open your code editor and create a new “.gitignore” file, then paste the following into it:


```js
node_modules
.cache
.parcel-cache
```

Now, head back to GitHub Desktop and commit your changes with a descriptive message, for instance, “created and initialized package.json and .gitignore." Finally, push them to your online repository.


#### Configuring Parcel for Your myFlix App

Parcel is going to transpile and bundle everything in your myFlix app. Since you're going to write React code—and, more specifically, JSX files (which you’ll learn about in more detail in the next Exercise)—you’ll want Parcel to instruct Babel to transpile any JSX it finds into JavaScript. In addition, you’re going to write SCSS instead of regular CSS, so you’ll want Babel to transpile those files, too. Finally, for the sake of readability and organization, you’ll be writing your React code in separate files, which Parcel will bundle into a single JavaScript file.

Let’s set this up to ensure Parcel completes the correct operations during the build process for your myFlix app. Remember, Parcel will act like a "conductor," guiding the various tools used for specific build operations.


> Note that, for now, you’ll be using Parcel in development mode. In development mode, Parcel only transpiles and bundles your code. If you were in production mode, it would also minify your code.


##### Installing the Right Dependencies

It’s essential that you install the correct dependencies for your project. This includes dependencies and development dependencies. Dependencies are what your app needs for both development and production, while development dependencies are only necessary during development.

In order to use Parcel in your myFlix project, you first need to install it globally, as this will make Parcel available for any React project on your local computer. To install it globally, go to your terminal (macOS) or PowerShell (Windows) and enter:

`npm install -g parcel`

Now, make sure that you’re still inside the “myFlix-client” project folder in your terminal, then run the following commands to install packages and dependencies you need for React app development:

`npm install --save react react-dom`

React and ReactDOM are required because you’ll be using them to build your myFlix app. You’ll be learning a lot more about them in the next Exercise.


> Installing Parcel as a local developer dependency
> When packages like Parcel are installed globally, version incompatibility could occur when accessed by other users or at a later date. This is because other users might have a newer or older version of Parcel that’s incompatible with the app’s build when trying to run it or test it. 
> 
> Therefore, you can alternatively install Parcel as a local developer dependency. This will force anyone accessing the app to use the same version of Parcel, since the version will be locked into the “package.json” and “package-lock.json” files in the project directory.
> 
> For the purpose of getting started though, you’ll just need to install Parcel globally.


##### Creating your First Files

It’s time to create some files! You’ll need main files for your client-side JavaScript, your CSS, and your HTML. Each of these files will be hosted in a new “src” folder in the new “myFlix-client” directory. Go ahead and create each of the following files using the code provided:

1. The “myFlix-client/src/index.jsx” file.

This file contains the code needed to create a small, working React app, so you can begin building from the ground up!


```js
import { createRoot } from 'react-dom/client';

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div>Good morning</div>
    </div>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);
```

2. The “myFlix-client/src/index.scss” file.

At this point, the content placed in this file is only really there for you to test your build, so go ahead and add some dummy content.


```js
$color: steelblue;

.my-flix {
  color: $color;
}
```

Although this style file isn’t particularly helpful, it's a good way of checking that the build process has worked. That’s because SCSS will fail to directly render in the browser unless the build process has successfully transpiled the SCSS into CSS.

3. The “myFlix-client/src/index.html” file.


```js
<!DOCTYPE html>
<html>
  <head>
    <title>myFlix</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="index.jsx"></script>
  </body>
</html>
```

This file represents the entry point of your app. Parcel will begin gathering dependencies from here and bundling them. Notice there’s no SCSS included; it should, instead, be imported from the “index.jsx” file. This approach works fine because Parcel will notice there's a SCSS file to be included, transpile it, and include it in the resulting HTML. What matters is that the file is mentioned somewhere along the dependency tree. Rather than the classic “index.html” → “index.css” structure, here you have “index.html” → “index.jsx” → “index.scss.”


#### Building An App

Now that you have your three entry files in your “src” folder (“index.html,” “index.scss,” and “index.jsx”), you can ask Parcel to build your project.

How to instruct Parcel to build your project:

Navigate back to your “myFlix-client” folder. Then use the following terminal command:

`parcel [path to index.html]`

Make sure to replace `[path to index.html]` in the command with the correct path. Since you’re currently in your “myFlix-client” folder, the path would be `src/index.html`.


> NOTE!
> For some computers, Parcel v2 doesn't work when you run parcel src/index.html, instead returning Error - module not found @parcel\fs-search\fs-search.win32-x64-msvc.node. 
> 
> The package is failing due to a missing library on the computer. Fs-search requires Microsoft Visual C++ 2015 Redistributable (x64).
> 
> You can install Microsoft Visual C++ 2015 Redistributable x64
> 
> NOTE!
> You might get an error stating  @parcel/core: Failed to resolve 'process'. If this is the case, go ahead and install it globally by running npm install -g process then try to run your app again.

With this command, Parcel will begin crawling through your project, starting at the “index.html” file, then gathering the files it depends on (and the same for each dependency, and so on). Once that’s done, Parcel will create new files, which will be written to a new “dist” directory. It’s fine for you to take a look at them, but please don't make any changes as they’ll be overwritten by Parcel's next build.

Your “index.html” file is almost the same as it was before the build; Parcel has only modified it slightly so that it loads a script with a hashed name (“/src.78399e21.js” or similar). This hash-based name is designed to avoid the file caching in the browser—each time the build is performed, the hash will change, telling the browser to load the new file.

Right next to the “index.html” file within the “dist” directory, you should see three new files:


- The “.js” file
- The “.css” file
- The “.map” file

The “.js” File

This is your bundled JavaScript file. As it contains React as a project dependency, it will be a relatively large file.


> TIP!
> When running Parcel in production mode, your “.js” file will be minified.

The “.css” File

This is your bundled CSS file, and it should only contain a single rule. You can tell it’s been transpiled because it's a plain CSS file (as opposed to a non-transpiled source code SCSS file).

The “.map” File

This is your source map file, meant for the browser to map the built code using the unbuilt code for easier debugging.

You’ll notice that Parcel installs more dependencies based on the files it finds (e.g., Sass for the “.scss” file). These will be installed in the “node_modules” directory, just as if you'd installed them yourself.

Now that you’ve built your project, let’s take a look at it! To do so, open your browser and navigate to “[http://localhost:1234”](http://localhost:1234%E2%80%9D) to see the rendered result. Do you get the following greeting?

![The words "Good Morning" in blue print on an otherwise white browser screen.](images-md/ui/browser-build-test_1750632157311.png)


###### Figure 12.

You can repeat this step to see how your project changes as you develop it throughout this Achievement.


#### Summary

In this Exercise, you learned the component-based architecture of React. You also explored the ins and outs of the build process, beginning with a look at some operations that are common to all build processes, including transpilation, minification, bundling, and auto-prefixing. You then learned how parts of the build process can be expedited using individual tools, notably Babel for transpiling, before examining what the build process would look like for an app such as myFlix.

Next, you took an in-depth look at the web app bundler Parcel, and how to configure it to build your myFlix app. In the next Exercise, you’ll dive straight into React and start creating your first views and components. But first, you’re going to apply your new knowledge to build your myFlix app, using Parcel.


#### Resources

If you’re curious to read more about the topics covered in this Exercise, then we recommend taking a look at the following resources. Note that this reading is optional and not required to complete the course.

VSCode:


- Visual Studio Code for Javascript Developers

Babel:


- babel-parser
- babel-traverse
- babel-generator

Build Tools:


- Parcel
- Webpack

Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

In this task, you’ll use build tools to build your myFlix app. In particular, you’ll set up your myFlix-client directory with the relevant files, and use Parcel to complete the necessary build operations for your project.

Your project structure should look like this (in terms of source code):

myFlix-client
├── .gitignore
├── package.json
├── src
│   ├── index.html
│   ├── index.scss
│   └── index.jsx

For details on your project, check out the [Achievement 3 project brief](https://images.careerfoundry.com/public/courses/fullstack-immersion/full-stack-project-briefs/A3-Project-Brief-2022.pdf) for myFlix’s frontend code. You’ll need to refer to it throughout the rest of the Achievement to guide your project.

Directions


1. Implement all the instructions in the “Creating a New Repository” and “Configuring Parcel for Your myFlix App” sections.
1. Test your project using Parcel: parcel [Path to index.html]. Make sure to use the actual path to “index.html” instead of [Path to index.html] (relative to the current directory you’re inside).


You can create/update your README file with this information. Documenting while working on the project can help you over the long term. (If you don't have the file in your project folder, simply create a new file and name it “README.md”—then commit the change and push it. Git will automatically understand that this is the README file of your project and will display its content on your GitHub repository’s main page).
1. In GitHub Desktop, make sure that all changes done are committed and pushed to the main branch of your online repository.
1. Create a zip file of your project repository on your computer.
1. Upload the zip file and share the link to your repository here, then submit both items to your tutor for review. Feel free to share additional thoughts or ask questions along with your submission.

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](images-md/icons/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c_1750632157477.svg)


- myFlix-client directory has been set up using the project structure outlined in the task directions; AND
- “package.json” file has been created with most or all of the required dependencies; BUT
- index files and/or README file missing or contain invalid content

![](images-md/icons/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87_1750632157507.svg)


- myFlix-client directory has been set up using the project structure outlined in the task directions; “package.json” file has the correct dependencies installed; 3 index files have been created; the project has been successfully built using Parcel; BUT
- README file or index files contain invalid content

![](images-md/icons/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4_1750632157538.svg)


- myFlix-client directory has been set up using the project structure outlined in the task directions
- “package.json” file has the correct dependencies installed
- Repo is configured with a README and 3 index files have been created, each with valid content
- The project has been successfully built using Parcel and, when the user opens “http://localhost:1234/” in their browser, a “Good morning” message appears

Questions for this task

Student Submissions

Check out recently submitted work by other students to get an idea of what’s required for this Task:

EVALUATION COMPLETE

![](images-md/avatars/41717_1750632157570.jpg)

Jorge Armando Cortes Montiel  Evaluated Submission for Task 3.2

May 13, 2025 at 05:42 PM

Hello Oliver,

It's great to hear from you. Thank you for submitting your exercise. My name is Jorge, and I'll be your tutor from now on.

It looks like you have some code from the next lesson, and it is looking good, so I'll proceed to approve this task and wait for your next submission.

Please let me know if you have any questions or if you need any help to speed up your progress.

Talk to you soon, Oliver, and keep up the excellent work. ✌🏼


- Plant 1
    Created with Sketch.
- Plant 2
    Created with Sketch.
- Plant 3
    Created with Sketch.
- Plant 4
    Created with Sketch.

Approved

![Lauren, Sarah, Korina, CareerFoundry Student Advisor](images-md/misc/student_advisors_july_2020_1750632157899.jpg)

Student Advisors

How was Jorge Armando’s feedback throughout this exercise?

Does this feedback help you understand what you did well and how you can improve?

How motivated do you feel after receiving the feedback from your tutor/mentor?

Did your mentor or tutor respond within the expected timeframe? (24hrs for tutors; 48 hrs for mentors)

![](images-md/avatars/67730_1750632158021.jpg)

Oliver Oliverio  Submitted Something for Task 3.2

May 13, 2025 at 11:47 AM

submitting exercise 3.2

![](images-md/avatars/51945_1750632158123.jpg)

Vivek Maskara

Oct 06, 2024 at 04:28 PM

Hi Oliver,

Looks like the error that you are getting might be due to node and parcel version mismatches. Couple of tips to help debug:


- Check your node version and install > 18.19 or above if you are on a lower version.
- Check parcel version and on their NPM page check for version compatibility with Node. It will tell you what version of Node you should be using.

But, I would recommend scheduling a call with your mentor to debug this further.


- Plant 1
    Created with Sketch.
- Plant 2
    Created with Sketch.
- Plant 3
    Created with Sketch.
- Plant 4
    Created with Sketch.

A Little More

![](images-md/avatars/67730_1750632158235.jpg)

Oliver Oliverio  Submitted Something for Task 3.2

Oct 04, 2024 at 03:18 PM

Getting error when running `parcel ./src/index.html`


```js
olivero54@Olivers-MacBook-Pro CF_4_myFlix-Client % parcel src/index.html
(node:80035) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
Server running at http://localhost:1234
⠹ Building index.scss...
DEPRECATION WARNING: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.

More info: https://sass-lang.com/d/legacy-js-api

@parcel/resolver-default: Auto installing polyfill for Node builtin module "process/"...

  /opt/homebrew/lib/node_modules/parcel/node_modules/react-error-overlay/lib/index.js:1:4450
  > 1 | s[o]:process.cwd();if("string"!=typeof a)throw new TypeError("Arguments to path.resolve must b
  >   |      ^^^^^^^ used here

  📝 Learn more: 
     https://parceljs.org/features/node-emulation/#polyfilling-%26-excluding-builtin-node-modules

⠋ Building index.js...
node(80035,0x300407000) malloc: Incorrect checksum for freed object 0x128093400: probably modified after being freed.
Corrupt value: 0x313a5a2c30303036
node(80035,0x310847000) malloc: Incorrect checksum for freed object 0x10a8b9200: probably modified after being freed.
Corrupt value: 0x6530396230336535
node(80035,0x16fef7000) malloc: Incorrect checksum for freed object 0x1290bbc00: probably modified after being freed.
Corrupt value: 0x127aa
node(80035,0x310847000) malloc: *** set a breakpoint in malloc_error_break to debug
node(80035,0x300407000) malloc: *** set a breakpoint in malloc_error_break to debug
node(80035,0x16fef7000) malloc: *** set a breakpoint in malloc_error_break to debug
zsh: abort      parcel src/index.html
olivero54@Olivers-MacBook-Pro CF_4_myFlix-Client %
```

I'm also trying to bundle with webpack but getting this error too:


```js
olivero54@Olivers-MacBook-Pro CF_4_myFlix-Client % npm start

> cf_4_myflix-client@1.0.0 start
> webpack serve --mode development


✘ node v22.9.0, and webpack v5.95.0 are not yet supported in the Community edition of Console Ninja.
We are working hard on it for you https://tinyurl.com/3h9mtwra.

Estimated release dates:
  - Community users: around 24th November, 2024 (subject to team availability)
  - PRO users:       priority access is available now

[webpack-cli] Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
 - options has an unknown property 'contentBase'. These properties are valid:
   object { allowedHosts?, bonjour?, client?, compress?, devMiddleware?, headers?, historyApiFallback?, host?, hot?, ipc?, liveReload?, onListening?, open?, port?, proxy?, server?, app?, setupExitSignals?, setupMiddlewares?, static?, watchFiles?, webSocketServer? }
```

Not sure what's going wrong.  I'm going to go straight to `npx create-react-app project` or `npx create-next-app@latest [project-name] [options]`


#### Forum

The Forum is a place to ask questions about the Exercise and share resources with other students. To share feedback on the Exercise content directly with the CareerFoundry team, please click on the “Give us feedback!” button at the end of the Exercise.


