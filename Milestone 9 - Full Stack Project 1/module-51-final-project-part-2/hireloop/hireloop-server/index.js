import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// mongobd
const client = new MongoClient(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@ac-kkmkuw6-shard-00-00.3umsmo6.mongodb.net:27017,ac-kkmkuw6-shard-00-01.3umsmo6.mongodb.net:27017,ac-kkmkuw6-shard-00-02.3umsmo6.mongodb.net:27017/?ssl=true&replicaSet=atlas-34ki4c-shard-0&authSource=admin`);

export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.dir(err);
    }
}

const connectedClient = await connectToMongoDB();
const database = connectedClient.db(`${process.env.MONGODB_DBNAME}`);
const users = database.collection(`${process.env.MONGODB_DB_USER_COLLECTION}`);
const jobs = database.collection(`${process.env.MONGODB_DB_JOBS_COLLECTION}`)



// App
app.get('/', (req, res) => {
    res.send('hire loop is looping...')
})

// USER API: http://localhost:5000/users
app.get('/users', async (req, res) => {
    const cursor = users.find({})
    const result = await cursor.toArray()
    res.send(result)
})

// JOBS API: http://localhost:5000/jobs
app.get('/jobs', async (req, res) => {
    try {
        const email = req.query.email;
        const query = email ? { postedBy: email } : {};
        const cursor = jobs.find(query);
        const result = await cursor.toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

app.get('/jobs/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
        const result = await jobs.findOne(query);
        if (!result) {
            return res.status(404).send({ error: "Job not found" });
        }
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

app.post('/jobs', async (req, res) => {
    try {
        const jobData = req.body;
        const result = await jobs.insertOne(jobData);
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

app.patch('/jobs/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
        const { _id, ...updateData } = req.body;
        const updateDoc = { $set: updateData };
        const result = await jobs.updateOne(query, updateDoc);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

app.delete('/jobs/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
        const result = await jobs.deleteOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})






app.listen(PORT, () => {
    console.log(`hire loop is running on ${PORT}`)
})

