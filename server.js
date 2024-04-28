const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html'); 
  });

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/stylesuggest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// Define a schema for your user data
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Handle POST request to /login
// Handle POST request to /login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Create a new user instance
    const newUser = new User({
      username,
      password
    });
  
    // Save the user to the database
    newUser.save()
      .then(() => {
        res.status(200).send('User saved successfully');
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error saving user');
      });
  });
  
// Serve static files from the "public" directory
app.use(express.static('public'));
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
