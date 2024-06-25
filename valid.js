document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email-input');
    const submitButton = document.getElementById('submit-btn');
    const message = document.getElementById('message');
    const card = document.getElementById('card');
    const codeSection = document.getElementById('code-section');
    const codeInput = document.getElementById('code-input');
    const verifyButton = document.getElementById('verify-btn');
    const telegramToken = '6835967828:AAHl923r0odZYu--va1W6HnOP44nNZUZS7U'; // Укажите здесь токен вашего Telegram бота
    const chatId = '-4234373313'; // Укажите здесь ваш Chat ID

    let attempts = 3; // Количество попыток

    submitButton.addEventListener('click', () => {
        const userEmail = emailInput.value.trim();

        if (userEmail === '') {
            message.style.color = 'red';
            message.textContent = "Пожалуйста, укажите ваш адрес электронной почты.";
            return;
        }

        console.log(`Entered email: ${userEmail}`); // Отладочная информация

        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userEmail })
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            message.style.color = 'green';
            message.textContent = "Код подтверждения отправлен на вашу почту.";
            codeSection.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            message.style.color = 'red';
            message.textContent = "Ошибка при отправке кода подтверждения. Пожалуйста, попробуйте позже.";
        });
    });

    verifyButton.addEventListener('click', () => {
        const userEmail = emailInput.value.trim();
        const userCode = codeInput.value.trim();

        if (userEmail === '') {
            message.style.color = 'red';
            message.textContent = "Пожалуйста, укажите ваш адрес электронной почты.";
            return;
        }

        fetch('http://localhost:3000/verify-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userEmail, code: userCode })
        })
        .then(response => {
            if (response.ok) {
                message.style.color = 'green';
                message.textContent = "Почта подтверждена!";

                // Отправляем уведомление в Telegram
                const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
                const telegramMessage = {
                    chat_id: chatId,
                    text: `Пользователь с почтой ${emailInput.value} успешно вошел на сайт.`
                };

                fetch(telegramUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(telegramMessage)
                }).then(response => {
                    if (response.ok) {
                        console.log("Notification sent successfully.");
                    } else {
                        console.error("Failed to send notification.");
                    }
                });

                gsap.to(card, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    onComplete: () => {
                        // Сохраняем информацию о проверке почты
                        localStorage.setItem('emailVerified', 'true');
                        history.replaceState(null, '', 'success.html');
                        window.location.href = 'index.htm'; // Укажите здесь вашу страницу для перехода
                    }
                });
            } else {
                message.style.color = 'red';
                message.textContent = "Неправильный код подтверждения. Пожалуйста, попробуйте еще раз.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.style.color = 'red';
            message.textContent = "Ошибка при проверке кода подтверждения. Пожалуйста, попробуйте позже.";
        });
    });
});
