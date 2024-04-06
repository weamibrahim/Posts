// app.js
const express = require('express');

const port = 3000;
const cors = require('cors');


const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});
require("./models/user");
require("./models/post");
require("./models/comment");
const Routes = require('./routes/Routes');
const app = express();
// Enable CORS for all routes
app.use(cors());
app.use('/api', Routes);


app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
