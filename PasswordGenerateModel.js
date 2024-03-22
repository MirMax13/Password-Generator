const mongoose = require('mongoose');

const passwordGenerateSchema = new mongoose.Schema({
    includeLatinUppercase: Boolean,
    includeLatinLowercase: Boolean,
    includeCyrillicUppercase: Boolean,
    includeCyrillicLowercase: Boolean,
    includeNumbers: Boolean,
    includeSymbols: Boolean,
    length: Number,
});

const PasswordGenerateModel = mongoose.model('PasswordGenerate', passwordGenerateSchema);

module.exports = PasswordGenerateModel;