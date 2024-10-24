document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simulate login (replace with actual API call)
            simulateLogin(email, password);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert("Passwords don't match!");
                return;
            }

            // Simulate signup (replace with actual API call)
            simulateSignup(name, email, password);
        });
    }
});

function simulateLogin(email, password) {
    // In a real app, you would make an API call here
    console.log('Login attempt:', email, password);
    
    // Simulate successful login
    setTimeout(() => {
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect to homepage
    }, 1000);
}

function simulateSignup(name, email, password) {
    // In a real app, you would make an API call here
    console.log('Signup attempt:', name, email, password);
    
    // Simulate successful signup
    setTimeout(() => {
        alert('Signup successful! Please log in.');
        window.location.href = 'login.html'; // Redirect to login page
    }, 1000);
}