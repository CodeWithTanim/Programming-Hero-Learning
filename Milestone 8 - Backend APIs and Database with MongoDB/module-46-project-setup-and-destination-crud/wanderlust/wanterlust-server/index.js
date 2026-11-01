import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient = await connectToMongoDB();
const db = mongoClient.db("wanderlust");
const destinationsCollection = db.collection("destination");

// Add-destination POST
// http://localhost:8000/add-destination
app.post('/add-destination', async (req, res) => {
  const data = req.body;

  const result = await destinationsCollection.insertOne(data);
  console.log('Inserted destination:', result);

  res.send(result);
});

// All-destination get
// http://localhost:8000/destinations
app.get('/destinations', async (req, res) => {
  const result = await destinationsCollection.find().toArray();
  res.send(result);
})

// DetailsPage
app.get('/destination/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(404).send({ message: "Invalid destination ID" });
    }
    const result = await destinationsCollection.findOne({ _id: new ObjectId(id) });
    if (!result) {
      return res.status(404).send({ message: "Destination not found" });
    }
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: "Error fetching destination", error: err.message });
  }
});

// Update Edit Form (PATCH)
app.patch('/destination/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid destination ID" });
    }
    const updatedData = req.body;
    delete updatedData._id;
    const result = await destinationsCollection.updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: updatedData
      }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});


// Delete destination
app.delete(['/destination/:id', '/destinations/:id'], async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid destination ID" });
    }
    const result = await destinationsCollection.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

// http://localhost:8000/
app.get('/', (req, res) => {
  res.send({ message: 'Server is running fine!' });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
