const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}
// Import password generation logic
//const { generatePassword } = require('./public/script.js'); // Assuming script.js is in the same directory

// Route for serving the input HTML page
router.get('/', (req, res) => {
    res.render('input'); // Render the input.html template
});


function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// Route for handling password generation
router.get('/generate', async (req, res) => {
    const length = req.query.length || 10; // Довжина пароля за замовчуванням - 10
    const password = generatePassword(length);
    res.send(password);
});

// Route for handling password saving (implement logic here)
router.post('/save', (req, res) => {
  // Implement logic to save the password securely
  res.send('Password saved successfully!');
});

module.exports = router;