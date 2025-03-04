const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const encodedPassword = encodeURIComponent(config.password);
const url = `mongodb+srv://${config.userName}:${encodedPassword}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('authDB'); 

// Define collections
const userCollection = db.collection('users'); // Authentication data
const drawingCollection = db.collection('drawings'); // Store user drawings

// Test MongoDB connection
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
  console.log('Connected to MongoDB successfully.');
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

// 🔹 Retrieve user by email
function getUser(email) {
  return userCollection.findOne({ email: email });
}

// 🔹 Retrieve user by token
function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

// 🔹 Add a new user
async function addUser(user) {
  await userCollection.insertOne(user);
}

// 🔹 Update user
async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

// ✅ 🔹 Save image in the new `drawings` collection
async function saveImage(base64Image) {
  try {
    await drawingCollection.insertOne({
      image: base64Image,
      createdAt: new Date(), // Timestamp for sorting later
    });
    console.log("Image saved successfully.");
  } catch (error) {
    console.error("Error saving image:", error);
  }
}


// ✅ 🔹 Get all images for a user
async function getImages() {
  return await drawingCollection.find.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  saveImage,
  getImages,
};
