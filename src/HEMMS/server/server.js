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
const Data = mongoose.model('Data', dataSchema, "Data");

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
    // console.log(data);
    res.status(200).json({ "data": data[0] });  
})

app.get('/getdata', async (req, res) => {
    const { timeframe } = req.query;

    // console.log(timeframe);
    
    let startDate, endDate;

    if(timeframe === "day"){
        startDate = new Date();
        endDate = new Date();
        startDate.setUTCHours(0, 0, 0, 0);
        startDate.setDate(startDate.getDate() - 1);
        endDate.setUTCHours(23, 59, 59, 999);
        endDate.setDate(endDate.getDate() - 1);
    }
    // else if (timeframe === "week"){
    //     const today = new Date();
    //     const dayoftoday = today.getDay();
    //     // start day is supposed to be the last monday from the current day, assuming the current day is not monday
        

    // }
    // else if (timeframe === "month"){

    // }
    // else if (timeframe === "year"){

    // }
    else{
        res.status(400).json({ message: 'Invalid timeframe' });
    }

    const data = await Data.find({ datetime: { $gte: startDate, $lte: endDate } });
    res.status(200).json({ data: data });


})

const getAllData = async () => {
    // const data = await Data.find();
    // console.log(data[0]);

    // Retreive data from the last 24 hours without timezone into account
    let startDate = new Date();
    let endDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - 1);
    endDate.setUTCHours(23, 59, 59, 999);
    endDate.setDate(endDate.getDate() - 1);
    

    // console.log("\n\nStart Date: " + startDate, "\nEnd Date: " + endDate + "\n\n");
    // console.log(startDate);
    // console.log(endDate);

    const data = await Data.find({ datetime: { $gte: startDate, $lte: endDate } });
    // console.log(data[0]);
    // console.log(data[data.length - 1]);
    console.log(data);
}

// getAllData();


const SerialPort = require('serialport').SerialPort;
// const Readline = require('@serialport/parser-readline');
const { ReadlineParser } = require('@serialport/parser-readline');

const portName = '/dev/cu.usbmodem141101'; // Example port name for Linux, may vary for Windows or macOS

const arduinoport = new SerialPort({ path: '/dev/cu.usbmodem141101', baudRate: 9600 });

const parser = arduinoport.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    // start time
const startTime = new Date();
parser.on('data', (data) => {
    if(data)
    {
        console.log('Data from Arduino:', data.toString());

        const endTime = new Date();
        const elapsedTime = endTime - startTime;
        console.log('Elapsed time:', elapsedTime, 'ms');
        // startTime = Date();
    }
    // end time
    // Do something with the received data
});

arduinoport.on('error', (err) => {
    console.error('Error:', err.message);
});

app.listen(port, () => console.log('Server running on port ' + port))