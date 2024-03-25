const express = require('express');
const bodyParser = require('body-parser');

//Import app routes
const authRoute = require('./routes/auth');
const courseRoute = require('./routes/course');
const userRoute = require('./routes/user');
const followRoute = require('./routes/follow');
const resourceRoute = require('./routes/resource');
const imageRoute = require('./routes/images');
const fileRoute = require('./routes/files');

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

//For sending img files to the front end
app.use('/pictures', express.static('pictures'));

//For sending pdf files to the front end
app.use('/files', express.static('files'));

//Set up connection to auth route
app.use('/auth', authRoute);

//Set up connection to the user route
app.use('/user', userRoute);

//Set up connection to the course route
app.use('/course', courseRoute);

//Set up connection to the follow route
app.use('/follow', followRoute);

//Set up connection to the resource route
app.use('/resource', resourceRoute);

//For uploading img files
app.use("/image", imageRoute);

//For uploading pdf files
app.use("/file", fileRoute);

module.exports = app;