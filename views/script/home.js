// Copy to clipboard functionality
function copyToClipboard() {
    const urlElement = document.getElementById('generatedUrl');
    const copyBtn = document.getElementById('copyText');
    
    if (!urlElement || !copyBtn) {
        console.error('Copy elements not found');
        return;
    }
    
    const urlText = urlElement.textContent.trim();

    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(urlText).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy';
            }, 2000);
        }).catch(err => {
            console.error('Clipboard API failed:', err);
            fallbackCopy(urlText, copyBtn);
        });
    } else {
        // Fallback for older browsers or non-secure contexts
        fallbackCopy(urlText, copyBtn);
    }
}

function fallbackCopy(text, copyBtn) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy';
            }, 2000);
        } else {
            throw new Error('Copy command failed');
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        copyBtn.textContent = 'Copy Failed';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    }
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