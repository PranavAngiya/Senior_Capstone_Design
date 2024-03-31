const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api', (req, res) => {
    res.json({ "users": ["User1", "User2", "User3"] })
    // res.json({ message: "Hello from server!" });
})

app.listen(5000, () => console.log('Server running on port 5000'))