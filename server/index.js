const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');



const app = express();
const port = 3001;
const authCookieName = 'token';



// In-memory user database (cleared when server restarts)
let users = [];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));

// Route to register a new user
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  if (users.find(user => user.email === email)) {
    return res.status(409).json({ msg: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword };
  users.push(user);

  res.status(201).json({ msg: 'User registered successfully' });
});

// Route to log in a user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find(user => user.email === email);
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
});

// Route to log out
app.delete("/api/logout", (req, res) => {
  res.clearCookie("token"); // Assuming you're using a cookie-based token
  res.status(200).json({ message: "Logged out successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
