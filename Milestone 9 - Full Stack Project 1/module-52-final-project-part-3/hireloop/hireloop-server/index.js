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
const jobs = database.collection(`${process.env.MONGODB_DB_JOBS_COLLECTION}`);
const applications = database.collection(
    process.env.MONGODB_DB_APPLICATIONS_COLLECTION || 'applications'
);



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
        const { email, jobType, type, isRemote, category, status, search, q, sort, ids } = req.query;
        const query = {};

        // Filter by list of IDs (e.g. for saved jobs)
        if (ids) {
            const idList = ids.split(',').map(s => s.trim()).filter(Boolean);
            if (idList.length === 0) {
                return res.send([]);
            }
            const objectIds = idList.filter(id => ObjectId.isValid(id)).map(id => new ObjectId(id));
            const stringIds = idList.filter(id => !ObjectId.isValid(id));
            query._id = { $in: [...objectIds, ...stringIds] };
        }

        // Filter by recruiter email
        if (email) {
            query.postedBy = email;
        }

        // Filter by job type (Full-time, Part-time, Contract, Internship)
        const selectedType = jobType || type;
        if (selectedType && selectedType.toLowerCase() !== 'all') {
            query.type = { $regex: new RegExp(`^${selectedType.trim()}$`, 'i') };
        }

        // Filter by remote status
        if (isRemote !== undefined) {
            const isRemoteBool = isRemote === 'true' || isRemote === true;
            query.isRemote = isRemoteBool;
        }

        // Filter by category
        if (category && category.toLowerCase() !== 'all') {
            query.category = { $regex: new RegExp(`^${category.trim()}$`, 'i') };
        }

        // Filter by status (Active, Closed, Expired, etc.)
        if (status && status.toLowerCase() !== 'all') {
            query.status = { $regex: new RegExp(`^${status.trim()}$`, 'i') };
        }

        // Search in title, company, category, location
        const searchTerm = search || q;
        if (searchTerm && searchTerm.trim()) {
            const regex = { $regex: searchTerm.trim(), $options: 'i' };
            query.$or = [
                { title: regex },
                { company: regex },
                { category: regex },
                { location: regex }
            ];
        }

        // Sort order
        let sortOption = { createdAt: -1 };
        if (sort === 'highest-salary' || sort === 'salary') {
            sortOption = { maxSalary: -1 };
        } else if (sort === 'oldest') {
            sortOption = { createdAt: 1 };
        } else if (sort === 'relevant') {
            sortOption = { title: 1 };
        }

        const cursor = jobs.find(query).sort(sortOption);
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

        // Enforce maximum active job posts limit (Growth Plan: max 10 active jobs)
        if (jobData.postedBy && (jobData.status === "Active" || !jobData.status)) {
            const activeCount = await jobs.countDocuments({
                postedBy: jobData.postedBy,
                status: "Active"
            });
            if (activeCount >= 10) {
                return res.status(403).send({
                    error: "Plan limit reached: You have reached the maximum limit of 10 active job posts. Please close or delete an existing job before posting a new one."
                });
            }
        }

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

        // If attempting to reactivate a job, verify active count limit
        if (updateData.status === "Active") {
            const existingJob = await jobs.findOne(query);
            if (existingJob && existingJob.postedBy && existingJob.status !== "Active") {
                const activeCount = await jobs.countDocuments({
                    postedBy: existingJob.postedBy,
                    status: "Active"
                });
                if (activeCount >= 10) {
                    return res.status(403).send({
                        error: "Plan limit reached: You cannot activate this job because you already have 10 active jobs. Please close or delete another job first."
                    });
                }
            }
        }

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

// APPLICATIONS API: http://localhost:5000/applications
app.get('/applications', async (req, res) => {
    try {
        const { email, jobId } = req.query;
        const query = {};
        if (email) {
            query.applicantEmail = email;
        }
        if (jobId) {
            query.jobId = jobId;
        }
        const cursor = applications.find(query).sort({ appliedAt: -1 });
        const result = await cursor.toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Check if a specific user has already applied for a job
app.get('/applications/check', async (req, res) => {
    try {
        const { email, jobId } = req.query;
        if (!email || !jobId) {
            return res.send({ hasApplied: false });
        }
        const existing = await applications.findOne({
            applicantEmail: email,
            jobId: jobId,
        });
        res.send({ hasApplied: Boolean(existing) });
    } catch (err) {
        res.status(500).send({ error: err.message, hasApplied: false });
    }
});

// Submit a new application
app.post('/applications', async (req, res) => {
    try {
        const applicationData = req.body;
        const { jobId, applicantEmail, applicantRole } = applicationData;

        if (!jobId || !applicantEmail) {
            return res.status(400).send({ error: "jobId and applicantEmail are required." });
        }

        // Strict role check: Only seekers can apply for jobs
        if (applicantRole && applicantRole.toLowerCase() !== "seeker") {
            return res.status(403).send({
                error: `Access denied: Only job seekers can apply for jobs. Your account role is "${applicantRole}".`,
                forbidden: true,
            });
        }

        // Verify role against user account in database if available
        const userRecord = await users.findOne({ email: applicantEmail });
        if (userRecord && userRecord.role && userRecord.role.toLowerCase() !== "seeker") {
            return res.status(403).send({
                error: `Access denied: Only job seekers can apply for jobs. Your account role is "${userRecord.role}".`,
                forbidden: true,
            });
        }

        // Prevent duplicate application
        const existing = await applications.findOne({
            jobId: jobId,
            applicantEmail: applicantEmail,
        });
        if (existing) {
            return res.status(409).send({
                error: "You have already applied for this job.",
                alreadyApplied: true,
                applicationId: existing._id,
            });
        }

        const newApplication = {
            ...applicationData,
            status: applicationData.status || "Applied",
            appliedAt: applicationData.appliedAt || new Date().toISOString(),
        };

        const result = await applications.insertOne(newApplication);

        // Increment applicantsCount on the job listing
        try {
            const jobQuery = ObjectId.isValid(jobId) ? { _id: new ObjectId(jobId) } : { _id: jobId };
            await jobs.updateOne(jobQuery, { $inc: { applicantsCount: 1 } });
        } catch (jobErr) {
            console.error("Failed to increment applicantsCount:", jobErr);
        }

        res.status(201).send({
            success: true,
            insertedId: result.insertedId,
            message: "Application submitted successfully.",
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});






app.listen(PORT, () => {
    console.log(`hire loop is running on ${PORT}`)
})

