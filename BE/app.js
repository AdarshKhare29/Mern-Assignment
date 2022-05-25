const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRoute= require('./routes/users')
const albumRoute = require('./routes/album')
const photosRoute = require('./routes/photos')

const app = express();
const mongoAtlasUri =
  "mongodb+srv://Adarsh:adarsh@1998@cluster0-0yqt4.mongodb.net/MernData?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected"),
  );
} catch (e) {
  console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

app.use(cors())



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/users',usersRoute)
app.use('/album',albumRoute)
app.use('/photos',photosRoute)
//Handle errors
app.use(function (err, req, res, next) {
    throw err
});

module.exports = app;