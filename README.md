

# Drawing Game Website Specification

## Elevator Pitch

This webiste is a drawing application that allows users to draw, create and save their masterpieces! This makes it simple to save and simple to draw, no fancy tools just use your imagination! You can also view art from the community and see what other people are doing! 

## Key Features

 and play back their drawings as animated stories.
- **User Authentication:** Users can create accounts, log in, and have their profiles displayed.
- **Community Gallery:** A gallery where users can view and like other users' drawings.
- **Real-Time Interaction:** Using WebSockets, users can collaborate on drawings in real-time.
---

## Technology Specification

### **HTML**

- Basic structural elements for the website including a navigation bar, login form, drawing canvas, and gallery pages.
- Two main pages:
  - **Home Page:** Includes the drawing canvas and tool selection.
  - **Gallery Page:** Displays drawings from the community.

### **CSS**

- Responsive design to ensure the site looks great on all devices.
- Styling for buttons, forms, canvas, and animations.
- Smooth transitions and animations for UI interactions, such as tool selection and gallery transitions.

### **JavaScript**

- Handles interactivity such as:
  - Drawing on the canvas.
  - Playing back recorded drawings.
  - Saving drawings to the backend.
  - User login/logout.
  - Form validation.

### **React**

- Single Page Application with the following components:
  - **NavBar Component:** Contains links to Home, Gallery, and Profile.
  - **Canvas Component:** The drawing tool.
  - **Gallery Component:** Displays community drawings.
  - **Profile Component:** Shows user information and past drawings.
  - Routing using React Router for seamless navigation.

### **Web Service**

- **Custom Backend Services:**
  - `saveDrawing()`: Saves user drawings to the database.
  - `getGalleryDrawings()`: Fetches drawings for the gallery.
  - `getUserProfile()`: Fetches user profile data.
- **Third-Party API:**
  - Using [Unsplash API](https://unsplash.com/developers) to provide users with background images to draw on.

### **Authentication**

- **User Registration and Login:**
  - Users can sign up and log in using email and password.
  - Display the logged-in user’s name on the navbar.

### **Database Data**

- **Database Structure:**
  - **Users Table:** Stores user credentials and profile data.
  - **Drawings Table:** Stores user-generated drawings and associated metadata.
  - **Gallery Table:** Stores public drawings for the community gallery.

### **WebSocket Data**

- Real-time collaboration feature:
  - Users can invite friends to collaborate on a drawing in real-time.
  - WebSocket sends drawing updates to connected users.
- **Real-time Gallery Updates:**
  - When a user uploads a drawing, it immediately appears in the community gallery for all users.

---

## Example Design Images

**Home Page Wireframe:**

-  ![image](login.jpeg)

**Gallery Page Wireframe:**

- ![image](drawpage.jpeg)

---

## Summary

This drawing game website will utilize modern web technologies to provide users with a fun, interactive, and community-driven platform. By integrating real-time features and third-party services, it ensures a dynamic experience for all users. The application will be built with scalability, security, and usability in mind.


## Notes

## startup
This is for BYU CS260


### IP and Domain Stuff
- I have an elastic ip address for the website
- I need to buy a domiain

### Learning how to Deploy Online
- This is Important: ./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s startup
- This is the version I use for simon: ./deployFiles.sh -k ~/Documents/cs260/keys/production.pem -h getdrixal.com -s simon
- This command is import when deploying files as well. scp -i ~/Documents/cs260/keys/production.pem draw.ht
ml ubuntu@getdrixal.com:/home/ubuntu/public_html/
draw.html

### React Notes and Changes

So I need to take notes on what I am doing so they see that I am not cheating. Basically what I am going to be doing is doing what I did on simon-css and do it on my application. I will create an individual file for each of the pages and create a react component. On the main app.jsx I will have a route that goes between each of the pages. 


### HTML Notes

- I added three pages the login, draw, and gallary. Login is going to be the initial page, draw will be where the user is most frequently, and gallary will be where the images are stored.
- Other than the pages it is not that complicated. Just some buttons and text and then placeholders for everything else. I will have to figure out later how I am going to implement drawing

### CSS Notes
- I wanted to go with a pink color scheme for this app just because it is relaxing. I don't know if I like it a whole lot but I am just going for it now.
- Flexboxes are awesome and make it way easier for the page to be dynamic
- Found some cool css you could do on hover states which is in the app right now. You can do it without implementing react
- I don't like using grid, flexboxes all the way
- 

### React Part 1
- This part was pretty simple the only thing that was annoying was that I had to restyle everything for some reason. I think I had too many style sheets was the issue but I was able to get it fixed.
- I used pretty much the same method that was employed in the simon project. I did have to add a navbar though so it would work properly. Before all my links were just scattered all over

### React Part 2
- I am lost
- This is the point I got to in the class that I didn't know. Everything else so far I have done except the deploying and AWS but that was pretty simple
- We will see how it goes