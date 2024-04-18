const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const url = "mongodb+srv://username:SecurePassword@hemms.ctkost4.mongodb.net/?retryWrites=true&w=majority&appName=HEMMS";
const port = 5050

const app = express();
app.use(cors());

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

app.listen(port, () => console.log('Server running on port ' + port))