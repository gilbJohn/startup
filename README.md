

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

