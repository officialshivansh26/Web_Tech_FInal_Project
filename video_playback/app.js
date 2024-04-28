const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Video = require('./models/Video'); // Assuming your Video model is in this file

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/videosDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

app.use(express.static("./public"));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  // Retrieve video links from MongoDB and pass them to the view
  Video.find()
    .then(videos => {
      res.render('index', { videos });
    })
    .catch(err => console.error('Error fetching videos', err));
});

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
