document.getElementById('createAccountLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.register-container').style.display = 'block';
});

document.getElementById('loginLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.login-container').style.display = 'block';
    document.querySelector('.register-container').style.display = 'none';
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let dni = document.getElementById('dni').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let storedUser = JSON.parse(localStorage.getItem(username));
    
    if (storedUser && storedUser.dni === dni && storedUser.password === password) {
        window.location.href = 'pages/home.html';
    } else {
        alert('Credenciales incorrectas.');
    }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let dni = document.getElementById('regDni').value;
    let username = document.getElementById('regUsername').value;
    let password = document.getElementById('regPassword').value;

    let usernameError = document.getElementById('usernameError');

    // Clear previous error message
    usernameError.style.display = 'none';
    usernameError.textContent = '';

    if (dni.length >= 7 && dni.length <= 9 && username.length >= 1 && password.length >= 4 && password.length <= 6) {
        let user = {
            dni: dni,
            username: username,
            password: password
        };
        localStorage.setItem(username, JSON.stringify(user));
        alert('Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
        document.querySelector('.login-container').style.display = 'block';
        document.querySelector('.register-container').style.display = 'none';
    } else {
        if (username.length < 1) {
            usernameError.textContent = 'El usuario no puede estar vacío.';
        } else {
            usernameError.textContent = 'Datos no válidos. Asegúrese de que todos los campos están completos.';
        }
        usernameError.style.display = 'block';
    }
});