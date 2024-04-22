const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const url = "mongodb+srv://username:SecurePassword@hemms.ctkost4.mongodb.net/HEMMS?retryWrites=true&w=majority&appName=HEMMS";
const port = 5050

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
})

mongoose.connection.on('error', (err) => {
    console.log("Error connecting to MongoDB", err);
})

const userSchema = new mongoose.Schema({
    username: {type : String, unique: true},
    password: String,
    selectedState: String
})

const dataSchema = new mongoose.Schema({
    datetime: Date,
    day: String,
    power: Number,
    cost: Number,
    currentState: String
})

const User = mongoose.model('User', userSchema, "Users");

app.post('/signup', async (req, res) => {
    // recieve username, password, selectedState
    const { username, password, selectedState } = req.body;

    // Check to see if username already exists inside the database
    const user = await User.findOne({ username: username });

    if (user) {
        res.status(400).json({ message: 'Username already exists' });
    }
    else{
        const newUser = new User({ username: username, password: password, selectedState: selectedState });
        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });
    }
})

app.get('/signin', async (req, res) => {
    // recieve username, password
    const { username, password } = req.query;

    // Check to see if username already exists inside the database
    const user = await User.findOne({ username: username });
    if (!user) {
        res.status(400).json({ message: 'Username does not exist' });
    }

    if (user.password !== password) {
        res.status(400).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Sign in successful' });
})

app.get('/getalldata', async (req, res) => {
    const data = await Data.find();
    res.status(200).json({ data: data });  
})

app.listen(port, () => console.log('Server running on port ' + port))