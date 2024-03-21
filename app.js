const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Import routes from routes.js

const app = express();
app.use(bodyParser.json());
const port = 3000;

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