## Client-Side Programming & React


# 3.1: Intro to Frameworks & Libraries


- Learning Goals
- Introduction
- What Are Libraries and Frameworks?
- Choosing the Right Framework for the Job
- myFlix’s Project Needs
- Popular JavaScript Libraries and Frameworks
- Summary
- Resources
- Task
- Forum


#### Learning Goals


- Evaluate the benefits of using frameworks and libraries
- Discuss the use of different frameworks and libraries in a variety of real-world scenarios


#### Introduction

Welcome to the third Achievement of your Full-Stack Immersion Course! In the previous Achievement, you built the complete server-side for your myFlix web app. You developed the REST API that will allow myFlix users to make requests to your MongoDB database and receive responses from the server-side. Well done!

In this Achievement, you’ll now move from the back to the front, and build the client-side of your myFlix app, bringing everything together and giving it a face to show the world. First, you'll develop the interface that users will interact with to make their requests, such as searching for movies and updating their details. Responses from the server will be rendered into the interface: movie synopses, director biographies, genres, and more. You’ll do all this using React, a popular JavaScript library for client-side projects.

To kick things off, you’ll be taking another look at JavaScript libraries and frameworks, how they differ, and the best practices for using them. By the end of the Exercise, you’ll be better equipped to make decisions regarding which framework or library to use for future projects.

Let’s get started!


> Why Web Development Is a Great Career
> As you start to work on more complex and challenging projects in your course, it's normal to experience periods of self-doubt. In this audio, one of our mentors will remind you:
> 
> 
> Why web development is an exciting and rewarding profession;
> How to navigate this new field as a career changer;
> How to deal with imposter syndrome while you're learning new skills.
> 

#### What Are Libraries and Frameworks?

Frameworks and libraries are tools used by developers to expedite their work. They contain prepackaged code written (usually) by other developers that can be used to perform a variety of tasks and even structure your entire app. In fact, virtually anything in the web-development world (both client- and server-side) can be completed with a third-party tool. The hard part is knowing when—and when not—to use them.


##### The Difference between a Library and a Framework

Before exploring the main differences between frameworks and libraries, which you touched on very briefly back in Achievement 1, be aware that the terms “framework” and “library” are often used interchangeably. Knowing what a tool does and when to use it is more important than getting the term right every time. That said, there’s one key difference between the two: how they structure their intent.

Let’s start by defining both, before diving into a few examples of how they differ from each other.

A library is a prepackaged piece of code that you can incorporate into your project as you like. Think of a library as a box of tools. Libraries range in size from just a few lines of code about very specific things to a range of functions and utilities for all manner of tweaks, features, and functionalities.

Broadly speaking, libraries are there to make your life as a developer easier. Say, for example, you want to compute the difference between two arrays of strings in your app code. You could either write the algorithm yourself or take the code for completing the computation from a library, just as you would check out a book you need from a real-world library. In this instance, using a third-party function from a library wouldn’t change your app’s structure; rather, it would allow you to implement the required computation and save you from having to write the algorithm from scratch.

A framework, on the other hand, is a predefined structure into which you enter your code. Essentially, a framework determines how your app is built (this is also known as being “opinionated”). By providing a set of universal and reusable functions, frameworks can streamline the building of a certain type of app. As a refresher, the programming language you use is like the raw lumber for creating a table, and the programming framework is the instructions (a set of standards and opinions) on how to create the table.

You’ve already encountered libraries and frameworks many times throughout this course. Let’s take a look at an example of each.

Back in Achievement 1, you used jQuery, a frontend JavaScript library, in your Pokédex app. jQuery simplifies complicated JavaScript concepts, such as Ajax and the DOM, condensing them into methods that can be called with just a single line of code. jQuery offers functionality in the following three areas:


- DOM traversal;
- Event handling;
- Ajax.

When you were developing your Pokédex app, you dipped into the jQuery library to make certain tasks more straightforward. Note, however, that jQuery never forces you to structure your code in a specific way. Instead, you can call jQuery utility functions wherever and whenever you want by calling the global variable `$`.

Next, think back to Achievement 2, when you used the web server framework Express to construct the server-side of your app. Express determined how you developed the structure of myFlix’s backend. While it would have been possible for you to use nothing but Node.js to create your API, using Express simplified your Node.js syntax, making it easier for you to write the server-side code. You also used Express to create and maintain your myFlix web server, managing HTTP requests from the client by routing requests/responses and interacting with request data. You didn’t, however, have any choice over which Express features to use or not use; rather, you had to abide by its rules from the start.

And there you have the main difference between a library and a framework: with a library, you're free to structure your code however you want. You can dip into a library and choose when and where to use its functions to complete certain tasks. In contrast, a framework dictates how your app is built and the way your code is written—acting, you guessed it, as a frame!

You can also think of this difference in terms of an inversion of control. When using a library, the developer—you, in this case—is in control. You call the functions as (and when) you want to. With a framework, however, you surrender control of which pieces of the tool you use. You have to follow the framework’s rules and adopt its structure throughout the development process; the framework calls you. In this sense, the control is inverted.

That being said, libraries and frameworks can also intersect. You can use a framework and incorporate a wide range of libraries to help you implement the ideas that the framework wants you to achieve. Express, for example, is a barebones framework that allows for a great deal of freedom regarding how to structure a backend. Express also allows for the use of helper libraries to further facilitate the job. For example, you could use the passport library to implement backend authentication.

But why look at frameworks and libraries now? In the previous Achievement, you built myFlix’s server-side. You know what your API does and what endpoints it provides, and you have quite a good theoretical understanding of what myFlix’s frontend can and can’t do. So, what next?

In this Achievement, you’ll be building myFlix’s client-side. However, instead of writing plain vanilla JavaScript, you’ll be writing JavaScript using the React library.

There are many JavaScript libraries and frameworks out there for you to choose from. You’ll be introduced to another popular one—Angular—much later in the course. But before diving into specific frameworks, let’s consider how you might decide which one to use.


#### Choosing the Right Framework for the Job

Let’s start with a quick recap of what you just learned about libraries and frameworks. Developers can use whichever libraries they want in their code, as many times as they want, safe in the knowledge that their choice of library won't affect the structure of their app.

Choosing a framework, on the other hand, requires careful consideration. This is because a framework will determine how an entire app will be built. Remember, you can always replace one library with another. But if you change your mind about a framework—and this is no exaggeration—you'll have to rewrite your entire app from the ground up.

Sadly, there’s no such thing as a one-size-fits-all framework that you can use for every app. For smaller products, you may choose vanilla JavaScript. Other times, you may choose a framework either because it's 1) the best tool for a particular project, 2) you want to learn something new (trying new tools is an essential part of a developer’s career), or 3) your product team is already using it.

To decide whether or not to use a framework—and if so, which framework to use—you first need to think about your project requirements and what you want to learn.


> Tip!
> These considerations also apply when you’re selecting a programming language. However, even if you realize early on in a project that your choice of language was, on reflection, not the best, you can still take something away from the experience. For example, you’ll have learned why it wasn't well adapted, which will help you make a better decision next time. Remember, it’s okay to make mistakes, even in a professional environment (as long as you learn from them, of course!).

So, how do you choose the right framework for the job? Choosing the right tool for a job can be daunting, especially for a junior developer. Fear not, though, as you'll soon be exploring the factors you should consider when making these types of decisions. At the end of the day, what it all comes down to is weighing your various options against your project needs.


##### Scale

From a frontend perspective, scale refers to the sheer amount of data that needs to be displayed on the client-side. Although it’s not always easy to predict at the start of a project, it’s helpful to consider how much data your app will display to users to avoid being overwhelmed by data-related problems further down the line. For instance, if your goal were to write an app displaying web-traffic statistics, you’d want to consider using a robust framework, as this would help with your app’s performance (i.e., speed). Indeed, the more data you’re looking to display, the more useful a higher-performance framework will be. Unsurprisingly, any framework with an emphasis on performance will proudly display its capabilities on its website, making your search easier!


> Server-Side Scaling
> There’s a difference between writing an app that will be used by a few business clients and an app that will be used by millions of users. Scale in this sense—the sheer number of users—concerns the server-side rather than the client-side of an app. This is because the server-side is the part of the app that processes user requests and can therefore be slowed down by many users making requests at the same time. Client-side code is executed in the user’s browser, so it won’t be affected by the number of users at any given time.


##### Scope

Closely related to scale is scope; but where scale refers to the amount of data to handle (and pure performance, later on), scope relates to how a development project will evolve over time. Most development projects start out small and straightforward, growing in complexity as new features, functionality, user views, and UI elements are added.

When discussing scope, it’s impossible to avoid mentioning entropy (the level of disorder in a system). Here, entropy refers to how a codebase, if not given restraints, can grow in an unmanageable fashion. When a codebase experiences entropy, it can reach a state where developers become afraid to make changes—the codebase’s parts become inflexible, and it becomes difficult to add anything new. As a result, developers often find themselves having to rewrite an entire app, which isn’t very efficient. As such, it’s best to start out with a defined structure and constraints in place to prevent entropy from ever occurring. As you may have already guessed, frameworks can help in this matter. This is because they enforce constraints from day one, and give developers a way to structure and organize their code so it can grow and change without whole parts breaking.

To sum up, if your codebase is likely to grow and change over time (and more often than not, this will likely be the case), then using a framework could help to prevent entropy. If, on the other hand, your codebase is unlikely to change much, then scoping and entropy will be less of a concern. When developing a product prototype or standalone portfolio piece, for example, you might not need a framework at all.


##### Documentation

If you’re leaning towards a particular framework for a project, you must be able to learn how to use it—which will depend on a few key factors.

First, how complex is the framework? And how easy is it to read? If you choose a framework that isn’t user friendly, it could cause issues not only at the beginning of a project but further down the line, as well, when you or your colleagues in the product team have to maintain it. While this alone shouldn’t determine whether or not you use a particular framework, it’s certainly something to consider.

Besides the complexity of the framework itself, you’ll want to find out how well-documented the framework is. Easy-to-follow documentation from the framework provider will save you from having to figure out the initial steps on your own and make it much easier for you to get started. After all, you wouldn’t buy an appliance that came without instructions!

Likewise, if you use a framework that has issues in its source code, you don’t want to waste time looking for a solution in the documentation only to find that it was never recorded.

In the end, just remember to check that a framework is actively maintained and compatible with the latest technologies, as well as having up-to-date documentation, before deciding whether to use it.


##### Popularity

The popularity of a framework will be key should you run into errors when implementing it in different projects. Troubleshooting, as you well know, is a fundamental part of being a developer, and learning from the problems reported by other developers is an integral part of the job. If a framework lacks a strong and active user base, there will be few others for you to learn from.

Here are some ways that you can assess the popularity of a framework:


- Stars in GitHub: A “star” acts as a way to bookmark a repository or project so you can easily refer back to it at a later date. At the time of writing, for example, React’s GitHub repository has over 196,000 stars. The more stars, the more interest there is in a particular project.
- Contributors on GitHub: This shows the number of external contributors to a GitHub project, beyond the administrators, and can indicate interest in a project.
- Tagged questions on Stack Overflow: Tags are used to indicate the topic of a question. If there are lots of questions with the same tag, such as “react”, it means that a lot of React developers are asking questions on Stack Overflow. The number of stars a question has can also be indicative of popularity.
- Google search trends: A search trend can show how interest in a topic has grown or fallen over time.
- Package downloads: The number of times a package has been downloaded is a direct indicator of how many projects are using a particular package, which, in turn, can indicate its popularity.
- Mentions of a framework in job adverts: If a particular framework or tool comes up frequently in job adverts, it shows that employers are interested in it.

While popularity shouldn't be the only reason for choosing one framework over another, you don’t want to get stuck with a technology that nobody uses or knows. This makes it tricky to solve problems in your code and harder for other developers to get up to speed with your codebase.


##### Tooling and Ecosystem

Even when using a framework, some tasks can be tedious. This is why it's always a plus if its creators include additional tools to make your life easier. These tools are usually nice accessories that you could, in theory, live without, but why would you want to? For instance, imagine buying a computer without a power adapter!

When choosing a framework, take a look at whether or not it comes “fully equipped” with command-line interface (CLI) tools such as an app-starter (which helps to scaffold the entire structure of an app).

You might also want to consider the viability of other tools in the framework ecosystem. Considering your project needs, which other libraries or tools might you want to use, and do they work well with the frameworks you're considering? Make sure you’re mindful of project needs that may arise later on, as well as the tools you’d need to address these needs. It's much better to think these things through, rather than rushing to use a particular framework and discovering incompatibility issues later.


##### Testability

Testability refers to how testable your code is. When it comes to writing testable code, using any major framework is better than none. This is because most frameworks come with a test runner—a CLI tool that runs the tests you write in a predefined environment.

Testing has a positive impact on the general development process. Among many other things, testing allows (and encourages) you to:

Avoid regressions: These are software bugs where something stops working as intended after a certain event, such as a system upgrade.
Refactor code: By running tests, you can make sure you haven’t broken anything when moving code around.
Write code in test-driven development (TDD) style: This style allows you to write test scripts early in the development process.

You’ll explore testing during the development process in much more detail in the next Achievement.


##### Environment

Any development team you join will have likely already chosen its framework, and most likely this same choice extends beyond just one product. For example, if the team’s main product was built with React, then it’s likely that any related products were also built using React. As part of the team, you would be required to also use React. Consistency is important because it facilitates specialization and expertise. Ideally, every member of a development team will be able to dive into the product’s code without having to learn a new tool, unless there’s a good reason like scale or scope.

At any rate, know that there may be times when you have no choice about the framework you'll be using—you’ll have to get up to speed with whatever is currently being used for the product you’re working on. If you’re in a position where you can use a new framework in an existing development environment, you’ll need to think about how easily you can incorporate it. The size of frameworks, for example, will vary based on their source code; you’ll want to avoid squeezing a really large framework into an existing project, as this could cause performance issues.


> Your Server-Side Environment
> When deciding on how to develop your app’s client-side, your server-side environment should rarely be a consideration. Your client-side and your server-side shouldn't be tightly coupled, meaning that they shouldn't be dependent upon one another. This will give you more flexibility over what you can change on either side.

So far in this Exercise, you’ve looked at the difference between libraries and frameworks, and explored how to make decisions when it comes to using frameworks. Now, it’s time to move on and decide what you’ll use to build the client-side of your myFlix app.


#### myFlix’s Project Needs

Before deciding on what type of framework, if any, you might use for your myFlix app, let’s consider the project requirements:


- Scale: You’re not going to be handling large amounts of data on the client-side, so you don’t need to worry too much about performance; however, there is a possibility that this could change, so it’s best not to rule it out just yet.
- Scope: While your project has a clearly defined scope right now, that’s not to say it won’t grow over time. As a developer, you’ll regularly find yourself learning new things that you might want to implement in existing projects. For this reason, you’ll want to make sure that your client-side can accommodate additional views, functionality, features, and complexity, without the risk of entropy.
- Documentation: Since you’re just starting out, it’s best to pick a framework that has comprehensive documentation. It’s a bonus if you pick a straightforward and user-friendly framework to work with.
- Popularity: Given that you’re building this app as a portfolio project, it would be a plus for potential employers if you use a popular framework. You’re also more likely to find solutions to any issues you run into as you build your app.
- Testability: You want to be able to test your code to make sure it’s error free!
- Tooling and Ecosystem: As a developer in the making, you'll benefit from a good ecosystem of tools to work with as you can continue to develop your skills in the future.
- Environment: Since you’ll be the sole developer on this project and building it from the ground up, it would be better if you didn't have to worry about working with an existing codebase and an already-established framework.

Hopefully, it’s now clear that using a framework would be beneficial for your myFlix app, thanks to the flexibility and structure a framework offers. Furthermore, myFlix will become part of your portfolio, and being able to demonstrate that you’ve used a framework will likely be very appealing to potential employers. As a learner, you should be looking for a framework that’s well documented and popular, so that you can demonstrate in-demand skills in your portfolio and easily troubleshoot online.

With that in mind, let’s take a look at what frameworks fit the bill for your project.


#### Popular JavaScript Libraries and Frameworks

Once you've built the frontend of your myFlix app using a JavaScript framework or library, you’ll have a complete web app—client- and server-side—to show off in your web development portfolio! Pretty impressive, right? But first, let’s get familiar with the most popular JavaScript frameworks and libraries: React, Angular, and Vue.js.


##### React

React, sometimes referred to as ReactJS or React.js, was created in 2011 by software engineer Jordan Walke, who worked for Facebook at the time. It’s a highly popular open source JavaScript library tailored for displaying UIs.

What Problem Did React Solve?

As Facebook became more popular, and Facebook Ads grew more complex, the company’s developers struggled with keeping their code efficient and well organized. Their process needed an overhaul to handle the constant updates in a way that prioritized user experience, so Walke came up with an early version of React, which was used for the Facebook newsfeed and, later, Instagram too.

The advantages of using React include:


- React has its virtual DOM, which ensures faster rendering of views. This makes React appropriate for heavy-loaded and dynamic software solutions.
- React's developer toolset enables developers to observe reactive component hierarchies, discover child and parent components, and inspect component current state and props within the browser (Chrome and Firefox).
- React can be used for both web and mobile apps. The mobile version is called React Native and follows the same design patterns as React. When you learn React, the transition to React Native is very fast (you'll encounter React Native in Achievement 5).
- React is supported by a wide community of engineers and developers, especially from Facebook.


> React: A Framework or a Library?
> Facebook calls React a library. However, many React users and people in the industry tend to refer to it as a framework. Why? Because a framework tells you “how” to structure your apps, and this is exactly what React does. React tells you to follow a certain architectural model (called “flux”), and maintain a single source of truth (both of these concepts will become clearer throughout the Achievement). These are not the type of things that a library would normally do. As such, regardless of its size or the number of tools built into it, React functions like a framework.


##### Angular

Originally released by Google in 2012, Angular offered new ways to use HTML. Several versions and improvements later, the framework has established itself as one of the core frameworks in the development field. You’ll get a chance to try Angular out towards the end of the Immersion course, where you’ll use the framework to build a portfolio piece.

What Problem Did Angular Solve?

Developers Miško Hevery and Adam Abrons created Angular back in 2009 as a way for web designers to manage both the backend and the frontend. When Hevery later worked on a code-heavy project for Google, he rewrote the entire thing using Angular, cutting 17,000 Iines down to 1,500. In the process, he caught the attention of Google management.

Here are some of the cool features that Angular brings to the table:


- It’s amazingly fast, even for large apps.
- It has great associated tools, such as build tools (you’ll learn more about these in the next Exercise) and testing tools such as test runners.
- It allows you to build for multiple platforms (web, mobile, and native desktop).
- It’s well suited to complex UIs, particularly animations.
- It's made, used, and supported by Google so, once again, you can rest assured that an entire team is working to keep the framework well documented, up to date, and as bug free as possible.


> One thing to note about Angular is that it uses TypeScript, a programming language that is a superset of JavaScript and relies on ES6. It also has a pretty large footprint, so keep this in mind when making decisions about using Angular.


##### Vue.js

Another open source JavaScript framework you’ll see referenced in the field is Vue, but it’s less in-demand than React or Angular. It’s backed by a smaller team of developers, including its creator, Evan You.

What Problem Did Vue Solve?

Like React and Angular, Vue was born out of frustration with time-extensive coding. While at Google, You had to quickly prototype a complex UI interface, and couldn’t find the kind of lightweight library or framework he needed. So he adapted Angular for the task, building out a framework more suited to rapid prototyping.

Despite its humble origins, Vue.js offers a few clear advantages:


- It’s progressive. Even if you already have a fully coded app, you can progressively adapt it to include some native-like functionality.
- It has a small footprint (~20KB minified, compared to 42KB for React, and 111K for Angular).
- It’s versatile; for example, a view can be rendered using either HTML templates or JSX rendering.


#### Summary

Congratulations! You've just completed your first Exercise in Achievement 3. In this Exercise, you dove straight into the client-side of app development, taking an in-depth look at libraries and frameworks, including when to use them and how to choose the right framework for your projects. You finished up with an introduction to React, Angular, and Vue.js, the three most popular client-side JavaScript libraries and frameworks.

In the next Exercise, you'll consider the suitability of React for building your myFlix app, and then take your first dive into actual code using the React library. But before that, let's practice a skill that will prove essential to you throughout your development career: choosing the best framework for the job!


#### Resources

If you’re curious to read more about the topics covered in this Exercise, then we recommend taking a look at the following resources. Note that this reading is optional and not required to complete the course.

JavaScript, Libraries, and Frameworks:


- Libraries vs. Frameworks
- 10 Famous Apps using React.js Nowadays
- How it Feels to Learn JavaScript in 2016 (still relevant now!)
- Top JavaScript Frameworks and Topics to Learn in 2020
- React, A javascript library for building user interfaces

Take the quiz to test your knowledge on this Exercise.


#### Task


- Direction
- Submission History

As a developer, you’ll often have to decide whether to use a library or framework for a particular product. If the answer is yes, you’ll also have to pick what library or framework to use based on your product requirements.

To help you get some practice, in this task, you’ll decide which library or framework to use in different scenarios.

Directions:


1. For each of the following scenarios, write 2 to 3 sentences in a text document (e.g., Word or Pages) about whether a library or framework would be suitable, and why. If you decide that a library or framework would be suitable, evaluate what features would be useful and propose a specific library or framework.


You’ve been asked to create a new version of an app used by product administrators to manage settings and display data about user activity and information. The current version was written using jQuery but grew organically, and it’s become hard to maintain and add new features to it. It’s a medium-sized app, with multiple views displaying a lot of data and forms.
You’ve been asked to build a new piece of your company’s web app. The existing app consists of several sub-apps served independently under different routes by an Express server, which allows for different technologies and frameworks to cohabit. You’ll be building what is essentially a huge table that will display hundreds of thousands of data records.
Your designers have tasked you with creating a prototype for a standalone app to be used internally by your product team. The app will showcase the product team’s design system (colors, components, fonts, styling, etc.).
1. Look at the Achievement 3 project brief (PDF) for your myFlix app. Write 2 to 3 sentences on the advantages of using React to build it. (There's further explanation of the project back in Achievement 2 if you need more context.)
1. Export your answers to a PDF and upload it here for your tutor to review.

Rubric

Refer to the categories below to see how to meet the requirements of the approved stage

![](https://cdn.careerfoundry.com/assets/rubrics/not_yet-c9fb80e521507759d546f847f8a65a00c66f2c8ec7ece4e37f98c25aa122778c.svg)


- Submission proposes an appropriate library or framework for at least 2 of the given scenarios; BUT
- Reasons for choice of library or framework are incomplete or missing; OR
- Doesn't identify advantages of choosing React for the myFlix app

![](https://cdn.careerfoundry.com/assets/rubrics/almost_there-f4bb1c077a0a826e7d4e3ecb72859fc401d362d9bd49c0658f4fd85c4a047a87.svg)


- Submission proposes a suitable library or framework for each scenario; BUT
- Doesn't identify at least one characteristic that makes each proposed library or framework suitable (possible topics could include e.g., scalability, testing, or maintainability); AND
- Outlines the benefits of choosing React for the myFlix app

![](https://cdn.careerfoundry.com/assets/rubrics/approved-7dfdcf59318cf52fcbd1333d8b71bf7a2bde35b6e0b753ac975349982495e0b4.svg)


- Submission proposes a suitable library or framework for each scenario; AND
- Highlights key characteristics that make each proposed library or framework suitable (possible topics could include e.g., scalability, testing, or maintainability); AND
- Outlines the benefits of choosing React for the myFlix app

