const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const passwordGenerator = require('./passwordGenerator');

const PasswordSaveModel = require('./PasswordSaveModel');
const PasswordGenerateModel = require('./PasswordGenerateModel');

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

router.get('/passwords', async(req, res) => {
  // fs.readFile(filePath, 'utf8', (err, fileData) => {
  //   if (err) {
  //     console.error('Error reading passwords.json:', err);
  //     res.status(500).send('Failed to retrieve passwords');
  //   } else {
  //     try {
  //       const passwords = JSON.parse(fileData);
  //       res.json(passwords);
  //     } catch (err) {
  //       console.error('Error parsing passwords.json:', err);
  //       res.status(500).send('Failed to parse passwords');
  //     }
  //   }
  // });
  try {
    const passwords = await  PasswordSaveModel.find({});
    res.json(passwords);
  } catch (error) {
    res.status(500).send('Помилка отримання списку GIFs');
  }
});
// Route for handling password generation

router.post('/generate', (req, res) => {
  try {
    const {length, includeLatinUppercase, includeLatinLowercase,
    includeNumbers,includeSymbols, includeCyrillicUppercase,includeCyrillicLowercase } = req.body;
    const options = new PasswordGenerateModel({
        includeLatinUppercase: includeLatinUppercase,
        includeLatinLowercase: includeLatinLowercase,
        includeCyrillicUppercase: includeCyrillicUppercase,
        includeCyrillicLowercase: includeCyrillicLowercase,
        includeNumbers: includeNumbers,
        includeSymbols: includeSymbols,
        length: length,
    });
    const password = passwordGenerator.generatePassword(length, options);
    const response = {
      password,
      message: 'Password successfully generated.'
    };

    res.status(201).json(response);
    
  } catch (error) {
    res.status(500).send('Error generating password.');
  }
});

// Route for handling password saving (implement logic here)
router.post('/save', async(req, res) => {
  try {
    const password = req.body.password;
    const usage = req.body.usage || 'Unknown';

    const new_password = new PasswordSaveModel({
      password: password,
      usage: usage,
    });
    await new_password.save();

    res.status(201).send('Password successfully uploaded and saved to the database.');
  } catch (error) {
    res.status(500).send('Error saving password to the database.');
  }
});

module.exports = router;