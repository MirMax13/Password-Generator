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
let fileContent = fs.readFileSync(filePath, 'utf8');
if (fileContent.trim() === '') {
  fs.writeFileSync(filePath, '[]', 'utf8');
}

// Route for serving the input HTML page
router.get('/', (res) => {
  res.render('input', { password: '' }); // Render the input.html template
});

router.get('/passwords', async(res) => {
  try {
    const passwords = await  PasswordSaveModel.find({});
    res.json(passwords);
  } catch (error) {
    res.status(500).send('Error fetching passwords.');
  }
});

// Route for handling password generation
router.post('/generate', (req, res) => {
  try {
    const {length, includeLatinUppercase, includeLatinLowercase,
    includeNumbers,includeSymbols, includeCyrillicUppercase,includeCyrillicLowercase,letters} = req.body;
    let options = {};
    const defaultLength = 10;
    const passwordLength = length || defaultLength;
    if (letters){
      options = new PasswordGenerateModel({
        letters: letters,
        length: passwordLength,
      });
    }else{
      options = new PasswordGenerateModel({
      includeLatinUppercase: includeLatinUppercase,
      includeLatinLowercase: includeLatinLowercase,
      includeCyrillicUppercase: includeCyrillicUppercase,
      includeCyrillicLowercase: includeCyrillicLowercase,
      includeNumbers: includeNumbers,
      includeSymbols: includeSymbols,
      length: passwordLength,
      });
    }
    
    const password = passwordGenerator.generatePassword(passwordLength, options);
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
    const response = {
      password,
      usage,
      message: 'Password successfully generated.'
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send('Error saving password to the database.');
  }
});

router.delete('/password/:id', async(req, res) => {
  try {
    const id = req.params.id;
    await PasswordSaveModel.findByIdAndDelete(id);
    res.status(200).send('Password successfully deleted.');
  } catch (error) {
    res.status(500).send('Error deleting password.');
  }
});
module.exports = router;