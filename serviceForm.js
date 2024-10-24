document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('serviceForm');
    const fields = ['serviceTitle', 'serviceCategory', 'serviceDescription', 'servicePrice', 'serviceAvailability', 'serviceLocation'];

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });

    function validateForm() {
        let isValid = true;
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value.trim()) {
                showError(input, `${field.replace('service', '')} is required`);
                isValid = false;
            } else {
                clearError(input);
            }
        });

        const priceInput = document.getElementById('servicePrice');
        if (isNaN(priceInput.value) || parseFloat(priceInput.value) < 0) {
            showError(priceInput, 'Please enter a valid price');
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        const errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            const div = document.createElement('div');
            div.className = 'error-message text-red-500 text-sm mt-1';
            div.textContent = message;
            input.parentNode.insertBefore(div, input.nextSibling);
        } else {
            errorDiv.textContent = message;
        }
        input.classList.add('border-red-500');
    }

    function clearError(input) {
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
        input.classList.remove('border-red-500');
    }

    function submitForm() {
        // Here you would typically send the form data to your server
        // For this example, we'll just log it to the console
        const formData = new FormData(form);
        console.log('Form submitted with the following data:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // Show a success message
        alert('Your service has been successfully posted!');
        form.reset();
    }
});