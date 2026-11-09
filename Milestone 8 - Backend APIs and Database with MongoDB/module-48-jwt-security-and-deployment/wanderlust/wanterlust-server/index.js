import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import 'dotenv/config';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const app = express();
const PORT = process.env.PORT || 8000;

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
const bookingsCollection = db.collection("bookings");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization
  // console.log(authHeader)

  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1]
  console.log("Token from request:", token)
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const jwksUrl =
    process.env.AUTH_JWKS_URL ||
    `${process.env.CLIENT_URL || "http://localhost:3000"}/api/auth/jwks`;
  const JWKS = createRemoteJWKSet(new URL(jwksUrl));
  try {
    const { payload } = await jwtVerify(token, JWKS)
    console.log("Token Payload:", payload)
    req.user = payload;
    next()
  } catch (error) {
    console.error("JWT Verify Error:", error.message)
    return res.status(505).send({ message: 'Server Error' })
  }



}

// Add-destination POST
// http://localhost:8000/add-destination
app.post('/add-destination', verifyToken, async (req, res) => {
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

// Featured Section get
app.get('/featured-destinations', async (req, res) => {
  const result = await destinationsCollection.find().limit(5).toArray()
  res.send(result)
})

// DetailsPage
app.get('/destination/:id', verifyToken, async (req, res) => {
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
app.patch('/destination/:id', verifyToken, async (req, res) => {
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
app.delete(['/destination/:id', '/destinations/:id'], verifyToken, async (req, res) => {
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

// Booking Collection
app.post('/booking', async (req, res) => {
  const data = req.body;
  const result = await bookingsCollection.insertOne(data);
  console.log('Inserted booking:', result);
  res.send(result);
})

app.get('/my-bookings/:email', verifyToken, async (req, res) => {
  const { email } = req.params;

  if (req.user?.email && req.user.email !== email) {
    return res.status(403).send({ message: "Forbidden Access" });
  }

  const bookings = await bookingsCollection.find({
    $or: [{ userEmail: email }, { email: email }]
  }).toArray();

  const result = await Promise.all(
    bookings.map(async (b) => {
      if (!b.imageUrl && b.destinationId && ObjectId.isValid(b.destinationId)) {
        const dest = await destinationsCollection.findOne({ _id: new ObjectId(b.destinationId) });
        return { ...b, imageUrl: dest?.imageUrl };
      }
      return b;
    })
  );

  res.send(result);
});


// Delete Bookings
app.delete('/my-bookings/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }
    const result = await bookingsCollection.deleteOne({ _id: new ObjectId(id) });
    res.send(result);
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
