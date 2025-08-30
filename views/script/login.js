// Password visibility toggle
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Form loading state
document.getElementById('loginForm').addEventListener('submit', function () {
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.classList.add('loading');
});

// Enhanced input validation
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

emailInput.addEventListener('input', function () {
    if (this.value && !this.validity.valid) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '';
    }
});

passwordInput.addEventListener('input', function () {
    if (this.value.length > 0 && this.value.length < 6) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '';
    }
});

// Auto-hide messages after 5 seconds
const messages = document.querySelectorAll('.message');
messages.forEach(message => {
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 5000);
});

// Enhanced keyboard navigation
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON' && e.target.type !== 'submit') {
        const form = document.getElementById('loginForm');
        const inputs = form.querySelectorAll('input[required]');
        const currentIndex = Array.from(inputs).indexOf(e.target);

        if (currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
        } else {
            form.querySelector('button[type="submit"]').click();
        }
    }
});

// Focus management for better accessibility
document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    setTimeout(() => {
        emailInput.focus();
    }, 500);
});

// Add subtle shake animation for invalid inputs
function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Custom validation messages
emailInput.addEventListener('invalid', function () {
    shakeElement(this);
});

passwordInput.addEventListener('invalid', function () {
    shakeElement(this);
});

// Add shake animation CSS
const shakeCSS = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);