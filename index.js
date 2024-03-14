const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const url = "mongodb://localhost:27017";

mongoose.connect(url, { useNewUrlParser: true });

const con = mongoose.connection;

app.use(express.json());

try {
    con.on('open', () => {
        console.log('Connected to the database');
    })
} catch (error) {
    console.log("Error: " + error);
}

const port = 9000;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

app.use(bodyParser.json());

const photoRoutes = require('./routes/photos');
app.use('/photos', photoRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userrouter= require("./routes/users");
app.use('/users', userrouter)