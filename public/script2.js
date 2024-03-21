function generatePassword() {
    // Отримання значень з елементів HTML
    const lengthInput = document.getElementById('length');
    const length = parseInt(lengthInput.value);
  
    // Перевірка, чи довжина не менша за 3
    if (length < 3) {
      length = 3; // Встановлення мінімальної довжини 3
      lengthInput.value = length; // Оновлення значення в полі введення
    }
  
    const includeLatinUppercase = document.getElementById('includeLatinUppercase').checked;
    const includeLatinLowercase = document.getElementById('includeLatinLowercase').checked;
    const includeCyrillicUppercase = document.getElementById('includeCyrillicUppercase').checked;
    const includeCyrillicLowercase = document.getElementById('includeCyrillicLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
  
    // Створення об'єкта з параметрами
    const parameters = {
      length,
      includeLatinUppercase,
      includeLatinLowercase,
      includeCyrillicUppercase,
      includeCyrillicLowercase,
      includeNumbers,
      includeSymbols,
    };
  
    // Виклик функції для генерування пароля
    const password = generatePasswordWithParameters(parameters);
  
    // Відображення пароля на сторінці
    const passwordElement = document.getElementById('password');
    passwordElement.value = password;
  }
  
  // Функція для генерування пароля (змінена)
  function generatePasswordWithParameters(parameters) {
    const characters = [];
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгґдеєжзиіїйклмнопрстуфхцчшщьюя0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  
    if (parameters.includeLatinUppercase) {
      characters.push(...possibleCharacters.slice(0, 26));
    }
    if (parameters.includeLatinLowercase) {
      characters.push(...possibleCharacters.slice(26, 52));
    }
    if (parameters.includeCyrillicUppercase) {
      characters.push(...possibleCharacters.slice(52, 80));
    }
    if (parameters.includeCyrillicLowercase) {
      characters.push(...possibleCharacters.slice(80, 108));
    }
    if (parameters.includeNumbers) {
      characters.push(...possibleCharacters.slice(108, 118));
    }
    if (parameters.includeSymbols) {
      characters.push(...possibleCharacters.slice(118));
    }
  
    let password = '';
    for (let i = 0; i < parameters.length; i++) {
      password += characters[Math.floor(Math.random() * characters.length)];
    }
  
    return password;
  }