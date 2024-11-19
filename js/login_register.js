// Función para alternar entre los formularios de inicio de sesión y registro
function toggleForm() {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');

    if (loginContainer.classList.contains('hidden')) {
        loginContainer.classList.remove('hidden');
        registerContainer.classList.add('hidden');
    } else {
        loginContainer.classList.add('hidden');
        registerContainer.classList.remove('hidden');
    }
}

// Función para guardar el usuario en LocalStorage al registrarse
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los valores de los campos por su id
    const name = document.getElementById('register-name').value;
    const lastname = document.getElementById('register-lastname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const gender = document.getElementById('register-gender').value;

    // Guardar los datos en Local Storage
    localStorage.setItem('user', JSON.stringify({ name, lastname, email, password, gender }));

    alert('Registro exitoso');
    window.location.href = 'login_register.html';  // Redirigir a la página de inicio de sesión
});

// Función para verificar el inicio de sesión usando LocalStorage
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevenir el comportamiento por defecto del formulario

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Obtener los datos del usuario almacenados en LocalStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert('Inicio de sesión exitoso');
        window.location.href = 'products.html';  // Redirigir a la página de productos
    } else {
        alert('Correo electrónico o contraseña incorrectos');
    }
});