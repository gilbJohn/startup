const express = require('express');

const app = express();
const PORT = 3001; // You can change this if needed

// Define a simple API route
app.get('/api/test', (req, res) => {
    res.json({ message: "Server is running!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
