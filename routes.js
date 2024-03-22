const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const passwordGenerator = require('./passwordGenerator');


const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}


const filePath = path.join(uploadsPath, 'passwords.json');
if (!fs.existsSync(path.join(uploadsPath, 'passwords.json'))) {
  fs.writeFileSync(path.join(uploadsPath, 'passwords.json'), '[]', 'utf8');
}
fileContent = fs.readFileSync(filePath, 'utf8');
if (fileContent.trim() === '') {
  fs.writeFileSync(filePath, '[]', 'utf8');
}

// Route for serving the input HTML page
router.get('/', (req, res) => {
    res.render('input'); // Render the input.html template
});

router.get('/passwords', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      console.error('Error reading passwords.json:', err);
      res.status(500).send('Failed to retrieve passwords');
    } else {
      try {
        const passwords = JSON.parse(fileData);
        res.json(passwords);
      } catch (err) {
        console.error('Error parsing passwords.json:', err);
        res.status(500).send('Failed to parse passwords');
      }
    }
  });
});
// Route for handling password generation

router.post('/generate', (req, res) => {
    const length = req.body.length || 10; // Довжина пароля за замовчуванням - 10
    const options = {
      includeLatinUppercase: req.body.includeLatinUppercase || false,
      includeLatinLowercase: req.body.includeLatinLowercase || false,
      includeCyrillicUppercase: req.body.includeCyrillicUppercase || false,
      includeCyrillicLowercase: req.body.includeCyrillicLowercase || false,
      includeNumbers: req.body.includeNumbers || false,
      includeSymbols: req.body.includeSymbols || false
  };
    const password = passwordGenerator.generatePassword(length, options);
    res.json({ password });
});

// Route for handling password saving (implement logic here)
router.post('/save', (req, res) => {
    const password = req.body.password;
    const using = req.body.using || 'Unknown';
    // Спочатку прочитайте поточний вміст файлу, якщо він існує
    let existingPasswords = [];
    if (fs.existsSync(filePath)) {
        existingPasswords = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    // Додайте новий пароль до списку
    existingPasswords.push({ password, using});

    // Запишіть оновлений список у файл
    fs.writeFile(filePath, JSON.stringify(existingPasswords), err => {
        if (err) {
            console.error('Failed to save password:', err);
            res.status(500).send('Failed to save password');
        } else {
            console.log('Password saved successfully!');
            res.send('Password saved successfully!');
        }
    });
});

module.exports = router;