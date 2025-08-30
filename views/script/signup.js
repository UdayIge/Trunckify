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

// Password strength checker
function checkPasswordStrength(password) {
    const strengthIndicator = document.getElementById('passwordStrength');
    const strengthBar = document.getElementById('strengthBar');

    if (password.length === 0) {
        strengthIndicator.classList.remove('visible');
        return;
    }

    strengthIndicator.classList.add('visible');

    let strength = 0;

    // Length check
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;

    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    // Update strength bar
    strengthBar.className = 'strength-bar';
    if (strength <= 2) {
        strengthBar.classList.add('strength-weak');
    } else if (strength <= 3) {
        strengthBar.classList.add('strength-fair');
    } else if (strength <= 4) {
        strengthBar.classList.add('strength-good');
    } else {
        strengthBar.classList.add('strength-strong');
    }
}

// Form validation
function validateField(field, validationElement, isValid, message) {
    const wrapper = field.closest('.input-wrapper');
    const msgElement = validationElement.querySelector('span');
    const icon = validationElement.querySelector('i');

    if (isValid) {
        wrapper.classList.remove('invalid');
        wrapper.classList.add('valid');
        validationElement.classList.remove('error');
        validationElement.classList.add('success');
        icon.className = 'fas fa-check-circle';
        msgElement.textContent = message;
        validationElement.classList.add('show');
    } else {
        wrapper.classList.remove('valid');
        wrapper.classList.add('invalid');
        validationElement.classList.remove('success');
        validationElement.classList.add('error');
        icon.className = 'fas fa-exclamation-circle';
        msgElement.textContent = message;
        validationElement.classList.add('show');
    }
}

// Real-time validation
document.getElementById('name').addEventListener('input', function () {
    const nameValidation = document.getElementById('nameValidation');
    if (this.value.length >= 2) {
        validateField(this, nameValidation, true, 'Looks good!');
    } else if (this.value.length > 0) {
        validateField(this, nameValidation, false, 'Name must be at least 2 characters');
    } else {
        nameValidation.classList.remove('show');
        this.closest('.input-wrapper').classList.remove('valid', 'invalid');
    }
});

document.getElementById('email').addEventListener('input', function () {
    const emailValidation = document.getElementById('emailValidation');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(this.value)) {
        validateField(this, emailValidation, true, 'Valid email address');
    } else if (this.value.length > 0) {
        validateField(this, emailValidation, false, 'Please enter a valid email address');
    } else {
        emailValidation.classList.remove('show');
        this.closest('.input-wrapper').classList.remove('valid', 'invalid');
    }
});

document.getElementById('password').addEventListener('input', function () {
    const passwordValidation = document.getElementById('passwordValidation');
    checkPasswordStrength(this.value);

    if (this.value.length >= 6) {
        if (this.value.length >= 8 && /[a-z]/.test(this.value) && /[A-Z]/.test(this.value) && /[0-9]/.test(this.value)) {
            validateField(this, passwordValidation, true, 'Strong password!');
        } else {
            validateField(this, passwordValidation, true, 'Password is acceptable');
        }
    } else if (this.value.length > 0) {
        validateField(this, passwordValidation, false, 'Password must be at least 6 characters');
    } else {
        passwordValidation.classList.remove('show');
        document.getElementById('passwordStrength').classList.remove('visible');
        this.closest('.input-wrapper').classList.remove('valid', 'invalid');
    }
});

// Form loading state
document.getElementById('signupForm').addEventListener('submit', function () {
    const signupBtn = document.getElementById('signupBtn');
    signupBtn.classList.add('loading');
});

// Auto-hide error messages after 6 seconds
const errorMessages = document.querySelectorAll('.error-message');
errorMessages.forEach(message => {
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 6000);
});

// Enhanced keyboard navigation
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'submit') {
        e.preventDefault();
        const form = document.getElementById('signupForm');
        const inputs = Array.from(form.querySelectorAll('input[required]'));
        const currentIndex = inputs.indexOf(e.target);

        if (currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
        } else {
            form.querySelector('button[type="submit"]').click();
        }
    }
});

// Focus management
document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    setTimeout(() => {
        nameInput.focus();
    }, 500);
});

// Shake animation for invalid form submission
function shakeElement(element) {
    element.style.animation = 'shake 0.6s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

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