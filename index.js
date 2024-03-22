require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const url = process.env.MONGODB_URL;
const fs = require('fs');

mongoose.connect(url);

const con = mongoose.connection;

app.use(express.json());
app.use(bodyParser.json());
try {
    con.on('open', () => {
        console.log('Connected to the database');
    })
} catch (error) {
    console.log("Error: " + error);
}

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

app.use(bodyParser.json());

if (!process.env.ACCESS_TOKEN_KEY) {
    const crypto = require('crypto');
    const tokenKey = crypto.randomBytes(64).toString('hex');
    fs.writeFileSync('.env', `ACCESS_TOKEN_KEY=${tokenKey}\n`, { flag: 'a' });
    console.log('Access Token Key generated and saved to .env file');
}

const photoRoutes = require('./routes/photos');
app.use('/photos', photoRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userrouter= require("./routes/users");
app.use('/users', userrouter)