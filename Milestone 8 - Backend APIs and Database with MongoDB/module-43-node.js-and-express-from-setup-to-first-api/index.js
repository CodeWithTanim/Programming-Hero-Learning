import express from 'express'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World form Express.js')
})

app.get('/about', (req, res) => {
    res.send('About Page')
})

app.get('/dashboard', (req, res) => {
    res.send('Dashboard Page')
})

app.get('/contact', (req, res) => {
    res.send('Contact Page')
})

const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smiith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob.jhonson@example.com' },
    { id: 4, name: 'Alice Williams', email: 'alice.wiliams@example.com' },
]

app.post('/users', (req, res) => {
    console.log('data from client', req.body);
    // Temporary data storage
    const newUser = req.body;
    newUser.id = users.length + 1;

    users.push(newUser);

    res.send({ success: true, message: 'User Added Successfully' })
})

app.get('/users', (req, res) => {
    res.send(users)
})

app.listen(PORT, () => {
    console.log(`Server is Running ${PORT}`);
})