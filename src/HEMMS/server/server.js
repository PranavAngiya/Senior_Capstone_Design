const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const url = "mongodb+srv://username:SecurePassword@hemms.ctkost4.mongodb.net/HEMMS?retryWrites=true&w=majority&appName=HEMMS";
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

const rateSchema = new mongoose.Schema({
    State: String,
    Rate: Number
  });

const Rate = mongoose.model('Rate', rateSchema, "Rates");

// Call the function with the desired state
async function getRateByState(state) {
    try {
        const rate = await Rate.find({ State: state });
        if (rate.length > 0) {
            console.log(`Rate for ${state}: ${rate[0].Rate}`);
            return rate[0].Rate;
        } else {
            console.log(`Rate for ${state} not found`);
            return null;
        }
    } catch (err) {
        console.error("Error finding rate:", err);
    }
}

app.get('/rates', async (req, res) => {
    const rates = mongoose.connection.collection('Rates');
    const requestedState = req.query.state;

    // Return state and rate
    const outputrate = await getRateByState(requestedState);
    console.log("outputrate:", outputrate);
    res.status(200).json(outputrate);
});

app.listen(port, () => console.log('Server running on port ' + port))