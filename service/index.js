const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require("path");
const DB = require('./database.js'); // Import MongoDB functions

const app = express();

// Select the port based on command-line argument, defaulting to 4000
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(express.json({limit: "10mb"}));


// Route to register a new user
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await DB.getUser(email);
    if (existingUser) {
      return res.status(409).json({ msg: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword };

    await DB.addUser(user);

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Route to log in a user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await DB.getUser(email);
    if (!user) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    // Set an auth cookie
    res.cookie(authCookieName, 'some-token-value', {
      httpOnly: true,
      sameSite: 'strict',
      secure: false, // Set to true in production with HTTPS
    });

    res.status(200).json({ msg: 'Login successful' });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Route to log out
app.delete("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

// Serve static files from the 'public' directory after deployment
app.use(express.static(path.join(__dirname, "public")));

// Catch-all route to serve the index.html from the build folder
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//Get and save images

app.post("/api/save-drawing", async(req, res) => {
  const {image} = req.body
  if (!image) return res.status(400).send("Invalid Input");
  
  await DB.saveImage(image);
  res.send({msg: "Drawing saved"});
});

// Get last saved image
app.get("/api/get-drawing", async (req, res) => {
  try {
    const lastDrawing = await Drawing.findOne().sort({ _id: -1 }); // Get the most recent drawing
    res.status(200).json(lastDrawing || {});
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve drawing." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
