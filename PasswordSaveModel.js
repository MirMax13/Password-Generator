const mongoose = require('mongoose');

const passwordSaveSchema = new mongoose.Schema({
    password: String,
    usage: String,
});

const PasswordSaveModel = mongoose.model('PasswordSave', passwordSaveSchema);

module.exports = PasswordSaveModel;