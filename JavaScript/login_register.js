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

// Función para guardar el usuario en Local Storage al registrarse
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    // Guardar los datos en Local Storage
    localStorage.setItem('user', JSON.stringify({ username, email, password }));

    alert('Registro exitoso');
});

// Función para verificar el inicio de sesión usando Local Storage
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;

    // Obtener los datos del usuario almacenados en Local Storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        alert('Inicio de sesión exitoso');
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});
