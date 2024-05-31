function generatePassword(length, options) {
    let charset = "";
    let password = "";
    
    if (options.letters) charset += options.letters;
    else if (options.includeLatinUppercase || options.includeLatinLowercase || options.includeCyrillicUppercase || options.includeCyrillicLowercase || options.includeNumbers || options.includeSymbols){
        if (options.includeLatinUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.includeLatinLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (options.includeCyrillicUppercase) charset += 'АБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ';
        if (options.includeCyrillicLowercase) charset += 'абвгдеєжзиіїйклмнопрстуфхцчшщьюя';
        if (options.includeNumbers) charset += '0123456789';
        if (options.includeSymbols) charset += '/?&<>!@#$%^*()-_=+[]{}|;:,.<>';
    }
    else{
        charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

module.exports = { generatePassword};