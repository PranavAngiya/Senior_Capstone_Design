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
        startDate.setDate(startDate.getDate());
        endDate.setUTCHours(23, 59, 59, 999);
        endDate.setDate(endDate.getDate());
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
    startDate.setDate(startDate.getDate() );
    endDate.setUTCHours(23, 59, 59, 999);
    endDate.setDate(endDate.getDate());
    

    // console.log("\n\nStart Date: " + startDate, "\nEnd Date: " + endDate + "\n\n");
    // console.log(startDate);
    // console.log(endDate);

    const data = await Data.find({ datetime: { $gte: startDate, $lte: endDate } });
    // console.log(data[0]);
    // console.log(data[data.length - 1]);
    console.log(data[0]);
}

// getAllData();


const SerialPort = require('serialport').SerialPort;
// const Readline = require('@serialport/parser-readline');
const { ReadlineParser } = require('@serialport/parser-readline');

const portName = '/dev/cu.usbmodem141101'; // Example port name for Linux, may vary for Windows or macOS

const arduinoport = new SerialPort({ path: '/dev/cu.usbmodem141101', baudRate: 9600 });

const parser = arduinoport.pipe(new ReadlineParser({ delimiter: '\r\n' }));


let totalEnergy = 0;
let energyreset = 0;


async function checkTime() {
    const currentDate = new Date();
    const minutes = currentDate.getMinutes();
    
    // Check if minutes is divisible by 5
    if (minutes % 5 === 0) {
        // console.log("Current time is divisible by 5:", currentDate.toLocaleTimeString());
        // console.log("Total Energy: " + totalEnergy);
        if(energyreset === 0){ //we have not reset the energy yet
            //store into database
            let newcost = totalEnergy * 0.1564;

            //update databse with the new power and cost values for the current time

            const currentDate = new Date();
            // subtract 4 hours from the current time

            currentDate.setHours(currentDate.getHours() - 4);
            currentDate.setSeconds(0);
            currentDate.setMilliseconds(0);

            const documenttoupdate = await Data.findOne({ datetime: currentDate });
            
            documenttoupdate.power = totalEnergy;
            documenttoupdate.cost = newcost;

            await documenttoupdate.save();

            console.log("Updated Document");
            console.log(documenttoupdate);
            

            totalEnergy = 0;
            energyreset = 1;
        }
        //store into database

    }
    else {
        if(energyreset === 1){      //we have not reset the energy yet
            energyreset = 0;
        }
    }
}

// Call the function immediately to check the time on start
checkTime();

// Set interval to check time every second
setInterval(checkTime, 1000);

parser.on('data', (data) => {
    if(data)
    {
        // console.log('Data from Arduino:', data.toString());
        totalEnergy = totalEnergy + (parseFloat(data.toString()) * 0.00263889);
        // console.log("Total Energy: " + totalEnergy);

    }
});

arduinoport.on('error', (err) => {
    console.error('Error:', err.message);
});

app.listen(port, () => console.log('Server running on port ' + port))