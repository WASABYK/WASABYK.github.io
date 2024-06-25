document.addEventListener('DOMContentLoaded', () => {
    const predefinedEmail = "egor.markot@gmail.com"; // Укажите здесь вашу заранее определенную почту
    const emailInput = document.getElementById('email-input');
    const submitButton = document.getElementById('submit-btn');
    const message = document.getElementById('message');
    const card = document.getElementById('card');

    let attempts = 3; // Количество попыток

    submitButton.addEventListener('click', () => {
        const userEmail = emailInput.value.trim();
        console.log(Entered email: ${userEmail}); // Отладочная информация

        if (userEmail === predefinedEmail) {
            message.style.color = 'green';
            message.textContent = "Почта подтверждена!";
            gsap.to(card, { 
                opacity: 0, 
                y: 20, 
                duration: 0.5, 
                onComplete: () => {
                    history.replaceState(null, '', 'success.html');
                    window.location.href = 'register.htm'; // Укажите здесь вашу страницу для перехода
                } 
            });
        } else {
            attempts--;
            if (attempts > 0) {
                message.style.color = 'red';
                message.textContent = Неправильный адрес электронной почты. У вас осталось ${attempts} попыток.;
            } else {
                message.style.color = 'red';
                message.textContent = "У вас закончились попытки. Пожалуйста, попробуйте позже.";
                emailInput.disabled = true;
                submitButton.disabled = true;
            }
        }
    });
});
