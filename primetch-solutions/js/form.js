document.addEventListener('DOMContentLoaded', function() {
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (validateEmail(emailInput.value)) {
                // In a real application, you would send the data to a server here
                this.reset();
                alert('Thank you for subscribing to our newsletter!');
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error states
            resetErrors();
            
            // Validate form
            let isValid = true;
            
            // Name validation
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Email validation
            const emailInput = document.getElementById('email');
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            }
            
            // Subject validation
            const subjectInput = document.getElementById('subject');
            if (subjectInput.value === '') {
                showError(subjectInput, 'Please select a subject');
                isValid = false;
            }
            
            // Message validation
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'Message should be at least 10 characters');
                isValid = false;
            }
            
            // Phone validation (optional)
            const phoneInput = document.getElementById('phone');
            if (phoneInput.value.trim() !== '' && !validatePhone(phoneInput.value.trim())) {
                showError(phoneInput, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                // In a real application, you would send the data to a server here
                contactForm.style.display = 'none';
                document.getElementById('form-success').style.display = 'block';
                contactForm.reset();
            }
        });
    }

    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Focus on the first invalid field
        if (!formGroup.classList.contains('focused')) {
            input.focus();
            formGroup.classList.add('focused');
        }
    }

    function resetErrors() {
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            group.classList.remove('error', 'focused');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        });
    }

    // Add input event listeners to clear errors when typing
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
                const errorMessage = formGroup.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.style.display = 'none';
                }
            }
        });
    });
});