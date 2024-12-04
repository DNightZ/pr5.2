<script>
    document.addEventListener('DOMContentLoaded', () => {
        const modalAuth = document.querySelector('.modal-auth');
        const buttonAuth = document.querySelector('.button-auth');
        const buttonOut = document.querySelector('.button-out');
        const closeAuth = document.querySelector('.close-auth');
        const logInForm = document.getElementById('logInForm');
        const userNameSpan = document.querySelector('.user-name');
        const loginInput = document.getElementById('login');
        const passwordInput = document.getElementById('password');
        const storedLogin = localStorage.getItem('userLogin');

        // Відновлюємо стан кнопок після збереженого логіну
        if (storedLogin) {
            userNameSpan.textContent = storedLogin;
            buttonAuth.style.display = 'none';
            buttonOut.style.display = 'block';
        } else {
            buttonOut.style.display = 'none';
        }

        // Обробка події кліку для входу
        buttonAuth.addEventListener('click', () => {
            modalAuth.style.display = 'flex';
            document.body.classList.add('overflow-hidden');  // Вимикаємо прокрутку
        });

        // Обробка закриття модального вікна
        closeAuth.addEventListener('click', () => {
            modalAuth.style.display = 'none';
            document.body.classList.remove('overflow-hidden');  // Включаємо прокрутку
            resetInputBorders();  // Скидаємо червону рамку при закритті
        });

        // Закриваємо модальне вікно при кліку поза межами вікна
        window.addEventListener('click', (e) => {
            if (e.target === modalAuth) {
                modalAuth.style.display = 'none';
                document.body.classList.remove('overflow-hidden');  // Включаємо прокрутку
                resetInputBorders();  // Скидаємо червону рамку при закритті
            }
        });

        // Скидаємо червону рамку, якщо вона була
        function resetInputBorders() {
            loginInput.style.borderColor = '';
            passwordInput.style.borderColor = '';
        }

        // Обробка форми логіну
        logInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const loginValue = loginInput.value.trim();
            const passwordValue = passwordInput.value.trim();

            // Перевіряємо, чи заповнені всі поля
            if (!loginValue) {
                loginInput.style.borderColor = 'red';
            } else {
                loginInput.style.borderColor = '';
            }

            if (!passwordValue) {
                passwordInput.style.borderColor = 'red';
            } else {
                passwordInput.style.borderColor = '';
            }

            // Якщо обидва поля заповнені, зберігаємо логін і закриваємо модальне вікно
            if (loginValue && passwordValue) {
                localStorage.setItem('userLogin', loginValue);
                userNameSpan.textContent = loginValue;
                modalAuth.style.display = 'none';
                document.body.classList.remove('overflow-hidden');  // Включаємо прокрутку
                buttonAuth.style.display = 'none';
                buttonOut.style.display = 'block';
            }
        });

        // Вихід з акаунту
        buttonOut.addEventListener('click', () => {
            localStorage.removeItem('userLogin');
            userNameSpan.textContent = '';
            loginInput.value = '';
            passwordInput.value = '';
            buttonAuth.style.display = 'block';
            buttonOut.style.display = 'none';
        });
    });
</script>

<style>
    /* Приховуємо прокрутку на body, коли відкрито модальне вікно */
    body.overflow-hidden {
        overflow: hidden;
    }
</style>
