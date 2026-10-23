import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Parse JSON request body

console.log(process.env.DB_USER);

// Connect to MongoDB using environment variables
const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.shgiste.mongodb.net/`,
);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Successfully Connected to MongoDB");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectedClient = await connectToMongoDB();
const db = connectedClient.db("simpleCrudDB");
const users = db.collection("users"); // Select users collection

// Home route
app.get("/", (req, res) => {
  res.send("Simple CRUD is running");
});

// Get all users
app.get("/users", async (req, res) => {
  const cursor = users.find({});
  const allUsers = await cursor.toArray();
  res.send(allUsers);
});

// Get a single user by MongoDB ObjectId
app.get("/users/:id", async (req, res) => {
  console.log("params in the server", req.params);
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await users.findOne(query);
  res.send(result);
});

// Add a new user
app.post("/users", async (req, res) => {
  const newUser = req.body;
  console.log("Adding New User", newUser);

  const result = await users.insertOne(newUser);
  res.send(result);
});

// Delete Users
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await users.deleteOne(query);
  res.send(result);
});

// User Update
app.patch("/users/:id", async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  console.log("updating ser with ID: ", id, "with data: ", updatedUser);
  const filter = {
    _id: new ObjectId(id),
  };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      name: updatedUser.name,
      email: updatedUser.email,
    },
  };
  const result = await users.updateOne(filter, updateDoc, options);
  res.send(result);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Simple CRUD SErver is running on port: ${PORT}`);
});
