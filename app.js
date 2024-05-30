const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Import routes from routes.js

const app = express();
app.use(bodyParser.json());
const port = 3000;


// Підключення до бази даних MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
});

const db = mongoose.connection;

// Обробка помилок підключення до MongoDB
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
});

// Налаштування шаблонізатора та шляхів для статичних файлів
app.set('view engine', 'ejs');
app.set('template', path.join(__dirname, 'template'));
app.use(express.static(path.join(__dirname, 'static')));

// Mount routes
app.use('/', routes);

// Обробка статичних файлів
app.get('/static/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'styles.css'));
  });

  app.get('/static/styles2.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'styles2.css'));
  });
  
  app.get('/static/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'script.js'));
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});