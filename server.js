// Dependencies
const express = require('express');
const path = require('path');

// Sets up the Express App
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Reservations (DATA)
const reservations = [
    {
        customerName: "Ahmed",
        customerEmail: "ahmed@example.com",
        customerID: "afhaque89",
        phoneNumber: "000-000-0000"
    },

    {
        customerName: "Dorrian",
        customerEmail: "dorrian@example.com",
        customerID: "wrhthwr54",
        phoneNumber: "111-222-3333"
    },
];

const waitlist = [];

// GET routes for displaying HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));

app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

// Displays all reservations
app.get('/api/tables', (req, res) => res.json(reservations));

// Displays all wailist items
app.get('/api/waitlist', (req, res) => res.json(waitlist));

// Create New Reservations - takes in JSON input
app.post('/api/tables', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newreservation = req.body;
  
    console.log(newreservation);
  
    if (reservations.length < 5) {
        // We then add the json the user sent to the reservation array if there are tables still available
        reservations.push(newreservation); 
    }

    else {
        // If not, added to waitlist array
        waitlist.push(newreservation);
    };
  
    // We then display the JSON to the users
    res.json(reservations);
  });

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));