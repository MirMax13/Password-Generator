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

function displayPasswordList(){
    const passwordList = document.getElementById('passwordList');

    fetch('/passwords')
        .then(response =>response.json())
        .then(data => {
            if (data.length > 0){
                data.forEach(password => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<p><a href="#" class="password-link" data-password="${password._id}">${password.usage} - ${password.password}</a> - ${password._id}</p>`;
                    passwordList.appendChild(listItem);
                });
                // Додаємо обробник події для кожного елемента списку паролів
                const passwordLinks = document.querySelectorAll('.password-link');
                passwordLinks.forEach(link => {
                    link.addEventListener('click', function(event) {
                        event.preventDefault();
                        const password = this.getAttribute('data-password');
                        document.getElementById('password_id').value = password;
                    });
                });
            } else{
                passwordList.innerHTML = '<p>No passwords saved.</p>';
            }
        })
        .catch(error => {
            console.error('Error getting password list.', error);
        });
}

function deletePassword(){
    const password_id = document.getElementById('password_id').value;

    if (!password_id){
        alert('No password ID provided.');
        return;
    }

    fetch(`/password/${password_id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
          console.log('Password deleted successfully.');
          alert('Password deleted successfully.');
        } else if (response.status === 404) {
          console.error('Password not found.');
          alert('Password not found.');
        } else {
          console.error('Error deleting password:', response.status);
          alert('Error deleting password.');
        }
      })
      .catch(error => {
        console.error('Error deleting password:', error);
        alert('Error deleting password.');
      });
  }