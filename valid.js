document.addEventListener('DOMContentLoaded', () => {
    const predefinedEmail = "egor.markot@gmail.com"; // Укажите здесь вашу заранее определенную почту
    const emailInput = document.getElementById('email-input');
    const submitButton = document.getElementById('submit-btn');
    const message = document.getElementById('message');
    const card = document.getElementById('card');
    const telegramToken = '6835967828:AAHl923r0odZYu--va1W6HnOP44nNZUZS7U'; // Укажите здесь токен вашего Telegram бота
    const chatId = '-4234373313'; // Укажите здесь ваш Chat ID



    let attempts = 3; // Количество попыток

    submitButton.addEventListener('click', () => {
        const userEmail = emailInput.value.trim();
        console.log(`Entered email: ${userEmail}`); // Отладочная информация

        if (userEmail === predefinedEmail) {
            message.style.color = 'green';
            message.textContent = "Почта подтверждена!";

            // Отправляем уведомление в Telegram
            const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
            const telegramMessage = {
                chat_id: chatId,
                text: `Пользователь с почтой ${userEmail} успешно вошел на сайт.`
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
