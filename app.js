const express = require('express');
const bodyParser = require('body-parser');

const authRoute = require('./routes/auth');
const courseRoute = require('./routes/course');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next();
});

//Set up connection to auth route
app.use('/auth', authRoute);

//Set up connection to the course router
app.use('/course', courseRoute);

module.exports = app;