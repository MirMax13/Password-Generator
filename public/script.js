function passwordGenerate(lettersIncluded) {
    let length = document.getElementById('length').value;
    let includeLatinUppercase = document.getElementById('includeLatinUppercase').checked;
    let includeLatinLowercase = document.getElementById('includeLatinLowercase').checked;
    let includeNumbers = document.getElementById('includeNumbers').checked;
    let includeSymbols = document.getElementById('includeSymbols').checked;
    let includeCyrillicUppercase = document.getElementById('includeCyrillicUppercase').checked;
    let includeCyrillicLowercase = document.getElementById('includeCyrillicLowercase').checked;
    
    // Встановлюємо значення для поля letters в залежності від параметру lettersIncluded
    let letters = lettersIncluded ? document.getElementById('letters').value : '';

    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            length,
            letters,
            includeLatinUppercase,
            includeLatinLowercase,
            includeNumbers,
            includeSymbols,
            includeCyrillicUppercase,
            includeCyrillicLowercase,
        }),
    })
        .then(response =>{
            if (response.ok) {
                return response.json(); // Повертаємо об'єкт JSON відповіді
            }
            else{
                console.error('Error generating password.', response.status);
            }
        })
        .then(data => {
            console.log('Password generated successfully:', data.password);
            document.getElementById('password').value = data.password;
        })
        .catch(error =>
            {
                console.error('Error generating password.', error);
            });
}

function savePassword() {
    let password = document.getElementById('password').value;
    let usage = document.getElementById('usage').value;

    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: password,
            usage: usage,
        }),
    })
        .then(response =>{
            if (response.ok) {
                return response.json(); // Повертаємо об'єкт JSON відповіді
            }
            else{
                console.error('Error saving password.', response.status);
            }
        })
        .then(data => {
            console.log('Password saved successfully:', data.password, data.usage);
        })
        .catch(error =>
            {
                console.error('Error saving password.', error);
            });
}