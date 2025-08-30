// Copy to clipboard functionality
function copyToClipboard() {
    const urlText = document.getElementById('generatedUrl').textContent;
    const copyBtn = document.getElementById('copyText');

    navigator.clipboard.writeText(urlText).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = urlText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    });
}

// Form loading state
document.getElementById('urlForm').addEventListener('submit', function () {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.classList.add('loading');
});

// Input validation feedback
const urlInput = document.getElementById('url');
urlInput.addEventListener('input', function () {
    if (this.value && !this.value.match(/^https?:\/\/.+/)) {
        this.setCustomValidity('Please enter a valid URL starting with http:// or https://');
    } else {
        this.setCustomValidity('');
    }
});

// Smooth scroll animation for success message
if (document.querySelector('.success-message')) {
    setTimeout(() => {
        document.querySelector('.success-message').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, 500);
}