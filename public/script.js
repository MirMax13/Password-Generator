document.addEventListener('DOMContentLoaded', function () {
  const generateForm = document.getElementById('generateForm');
  const passwordInput = document.getElementById('password');

  generateForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Зупиняємо стандартну поведінку форми

      // Отримуємо значення довжини пароля
      const length = document.getElementById('length').value;

      // Відправляємо запит на сервер для отримання пароля
      fetch(`/generate?length=${length}`, {
        method: 'GET'
    })
    .then(response => response.text())
    .then(password => {
        // Встановлюємо згенерований пароль у поле вводу
        passwordInput.value = password;
    })
    .catch(error => console.error('Error:', error));
    
  });
});
