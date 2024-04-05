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
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/', routes);

// Обробка статичних файлів
app.get('/public/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'styles.css'));
  });

  app.get('/public/styles2.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'styles2.css'));
  });
  
  app.get('/public/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'script.js'));
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});