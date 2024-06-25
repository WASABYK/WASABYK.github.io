<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"></script>
</head>
<body>
    <div id="card">
        <input type="email" id="email-input" placeholder="Введите вашу почту">
        <button id="submit-btn">Отправить</button>
        <p id="message"></p>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const predefinedEmail = "egor.markot@gmail.com"; // Укажите здесь вашу заранее определенную почту
            const emailInput = document.getElementById('email-input');
            const submitButton = document.getElementById('submit-btn');
            const message = document.getElementById('message');
            const card = document.getElementById('card');

            // Проверяем, была ли уже проверка почты
            if (localStorage.getItem('emailVerified') === 'true') {
                window.location.href = 'index.htm'; // Укажите здесь вашу основную страницу
                return;
            }

            let attempts = 3; // Количество попыток

            submitButton.addEventListener('click', () => {
                const userEmail = emailInput.value.trim();
                console.log(`Entered email: ${userEmail}`); // Отладочная информация

                if (userEmail === predefinedEmail) {
                    message.style.color = 'green';
                    message.textContent = "Почта подтверждена!";
                    gsap.to(card, { 
                        opacity: 0, 
                        y: 20, 
                        duration: 0.5, 
                        onComplete: () => {
                            // Сохраняем информацию о проверке почты
                            localStorage.setItem('emailVerified', 'true');
                            history.replaceState(null, '', 'success.html');
                            window.location.href = 'register.htm'; // Укажите здесь вашу страницу для перехода
                        } 
                    });
                } else {
                    attempts--;
                    if (attempts > 0) {
                        message.style.color = 'red';
                        message.textContent = `Неправильный адрес электронной почты. У вас осталось ${attempts} попыток.`;
                    } else {
                        message.style.color = 'red';
                        message.textContent = "У вас закончились попытки. Пожалуйста, попробуйте позже.";
                        emailInput.disabled = true;
                        submitButton.disabled = true;
                    }
                }
            });
        });
    </script>
</body>
</html>
