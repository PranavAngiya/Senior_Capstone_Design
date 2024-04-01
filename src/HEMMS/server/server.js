const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const mongoose = require('mongoose');
const url = "mongodb+srv://username:SecurePassword@hemms.ctkost4.mongodb.net/?retryWrites=true&w=majority&appName=HEMMS";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
})

mongoose.connection.on('error', (err) => {
    console.log("Error connecting to MongoDB", err);
})

app.get('/api', (req, res) => {
    res.json({ "users": ["User1", "User2", "User3"] })
})

app.listen(5000, () => console.log('Server running on port 5000'))