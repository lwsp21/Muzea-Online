
document.addEventListener('DOMContentLoaded', () => {

    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navCloseBtn = document.querySelector('.nav-close-btn');
    const navMenu = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    function openMobileMenu() {
        navMenu.classList.add('nav-mobile-open');
    }

    function closeMobileMenu() {
        navMenu.classList.remove('nav-mobile-open');
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openMobileMenu);
    }

    if (navCloseBtn) {
        navCloseBtn.addEventListener('click', closeMobileMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });


    const backToTopBtn = document.getElementById('backToTopBtn');
    const scrollContainer = document.querySelector('.page-content');

    if (backToTopBtn && scrollContainer) {
        scrollContainer.addEventListener('scroll', () => {
            if (scrollContainer.scrollTop > 200) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            scrollContainer.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    const contactForm = document.getElementById('contact-form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');

    if (contactForm) {

        function showError(inputElement, errorElement, message) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            inputElement.classList.add('error');
        }

        function clearError(inputElement, errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            inputElement.classList.remove('error');
        }

        function isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        function validateField(inputElement) {
            const errorElement = document.getElementById(inputElement.id + '-error');
            let isValid = true;

            switch (inputElement.id) {
                case 'name':
                    if (inputElement.value.trim().length < 2) {
                        showError(inputElement, errorElement, 'Imię musi mieć co najmniej 2 litery.');
                        isValid = false;
                    } else {
                        clearError(inputElement, errorElement);
                    }
                    break;
                case 'email':
                    if (!isValidEmail(inputElement.value.trim())) {
                        showError(inputElement, errorElement, 'Wpisz poprawny adres e-mail.');
                        isValid = false;
                    } else {
                        clearError(inputElement, errorElement);
                    }
                    break;
                case 'message':
                    if (inputElement.value.trim().length < 10) {
                        showError(inputElement, errorElement, 'Wiadomość musi mieć co najmniej 10 znaków.');
                        isValid = false;
                    } else {
                        clearError(inputElement, errorElement);
                    }
                    break;
            }
            return isValid;
        }

        function validateForm() {
            const isNameValid = validateField(name);
            const isEmailValid = validateField(email);
            const isMessageValid = validateField(message);
            return isNameValid && isEmailValid && isMessageValid;
        }

        [name, email, message].forEach(input => {
            input.addEventListener('input', () => {
                validateField(input);
            });
        });

        contactForm.addEventListener('submit', (event) => {
            if (!validateForm()) {
                event.preventDefault(); 
                alert('Proszę poprawić błędy w formularzu.');
            } else {
                alert('Wiadomość wysłana pomyślnie!');
            }
        });
    }
});