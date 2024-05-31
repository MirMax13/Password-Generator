const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Import routes from routes.js

const app = express();
app.use(bodyParser.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../templates'));
app.use(express.static(path.join(__dirname, 'static')));

// Mount routes
app.use('/', routes);

// Serve static files
app.get('/static/styles.css', (res) => {
    res.sendFile(path.join(__dirname, '../static', 'styles.css'));
  });

  app.get('/static/styles2.css', (res) => {
    res.sendFile(path.join(__dirname, '../static', 'styles2.css'));
  });
  
  app.get('/static/script.js', (res) => {
    res.sendFile(path.join(__dirname, '../static', 'script.js'));
  });
// 
// Error handling middleware
app.use((err, res) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});