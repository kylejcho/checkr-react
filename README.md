# Checkr. (React)
A task management web application. Users can login to the app and manage their tasks from their personal account with user authentication and realtime database storage/manipulation from Firebase. 

**Live Demo:** http://kylejcho.github.io/checkr-react/  
**Email:** demo@demo.com <br>
**Password:** demo123

![alt tag](https://i.imgur.com/UmHjoEd.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, React, React Router, Framer Motion, Firebase

The build process started with demoing several similar web applications and gathering ideas about what works and what doesn't. I took into account visual design, user-experience, and reusability of UI components (you can see this when using the search functionality). What I mainly wanted to focus on was the movement of UI elements in response to user input. The use of animations would guide the attention of the users, rather than distract them. This required careful planning of the structure and movement of various UI elements, in a way that makes every interation feel natural and user-friendly.

After formulating what I wanted for this application, I made the first iteration using pure Javascript, HTML and CSS. I was not completely satisfied with the end-product, as vanilla JS did not allow me to manage the manipulation of tasks and UI states without creating a ton of seperate functions for every minute aspect of the application. 

With the newest iteration, I decided to used React, along with Framer Motion React animation library. These two tools allowed me to easily manage the states of both the data that was being manipulated and the animations that coincide with each change in data. 

Framer Motion has some very useful tools such as AnimatePresense which allows components to start and finish animations of exit, whereas normally, the component would just abruptly remove itself from the DOM. Framer Motion's layout animations (I used reorder, which is similar but adds a drag-to-reorder functionality) allows components to animate when a change in the order elemenets within the DOM is made. For example, in this application, react states are responsible for the reordering of task components whenever they are checked off or dragged. Framer Motion allows for a smooth transition of a component's position between these states, rather than the usual abrupt teleport you can expect with React. This is easily done by simply adding "layout" to a specific component so no seperate logic for reording was needed, unlike the first JS interation.

Firebase is used to handle user-authentication and data storage/manipulation. The data storage has been set up so each user has their own "tasks" document which contains an array of all their task objects. Upon sign-in, the application retrieves "tasks" and is set as the master tasks and dataTasks states. Any change within the application, such as completion, order and delection results in the the current tasks state to overwrite the old tasks document stored in the FireStore database. 

React Router was used to navigate through sign-in, sign-up, and home pages. The home page is protected so that the path is only accessible when a user is signed in. Otherwise, it'll jump back to the sign-in page. 

## Optimizations
One of the biggest issues regarding this application was perfomance. It occured to me that using animations with react states, while easier to code, was very heavy on the CPU due to Framer Motion's API requiring state changes for many of it's uses in this application. Therefore, many of the optimizations I made were centered around eliminating unecessary rerendering using React's useCallback and memoization functions. That way, certain functions would not cause a rerenders if their dependencies have not changed. 

Another notable performance issue I ran into was the rerendering of all task components whenever one task was checked off, deleted, and reordered. Due to the heavy use of animations for each interaction, any change to a task, also would affect the layout of all other tasks and cause uncessary rerenders. In order to mitigate this issue, I took the master tasks state and split it into 3 seperate subtasks states for each subgroup. That way whenever Framer Motion's API needed to change the state of the tasks list, it would only affect the tasks within the subgroup and not all tasks. 

## Lessons Learned:
This project required a lot of learning and struggling in order to achieve the standard that I wanted for this project. Learning React while also learning to use an animation library and a back-end service was especially difficult. While it was very difficult, I came out being much more confortable with the idea of using tools that would help me achieve whatever I needed, rather than brute-forcing my way using pure javascript. 

The problems I faced regarding performance forced me to really get a good grasp of how React works, and how to structure the component hierarchy to prevent uneccessary rerendering. Using the react profiler extension, as well as the performance tab, allowed me to become more familiar with debugging any percieved jankiness. 

This was also my first time working with a back-end service. It required some initial setup and referencing of the Firebase documentation but I certainly would love to incorporate it in future projects as well. It also gave me an oppurtunity to dip my toes into the world of back-end as a front-end dev. 

## To Do:
- Allow user's the ability to change their display name

- Allow user's the ability to delete their accounts

- Add "Forgot Password" functionality

- Responsiveness for mobile screens

- Add an "edit" functionality when opening up the task-view of a certain task. 
