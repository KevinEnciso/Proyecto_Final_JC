// Función para alternar el menú de navegación en dispositivos móviles
function toggleMenu() {
    const menu = document.querySelector('.navbar-menu');
    menu.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function() {
    // Comprobar si el usuario está logueado
    const userInfo = document.getElementById('user-info');
    const username = document.getElementById('username');
    const userLastname = document.getElementById('user-lastname');
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    const userAvatar = document.getElementById('user-avatar');

    // Obtener los datos del usuario de LocalStorage
    const user = JSON.parse(localStorage.getItem('user')); 

    if (user) {
        // Mostrar la información del usuario y el avatar
        username.textContent = user.name;
        userLastname.textContent = user.lastname;
        userAvatar.src = user.avatar || '../images/default-avatar.png'; // Avatar por defecto si no tiene uno

        // Mostrar la información del usuario en el navbar
        userInfo.style.display = 'flex';

        // Ocultar el enlace de inicio de sesión
        loginLink.style.display = 'none';
        
        // Función para cerrar sesión
        logoutLink.addEventListener('click', function() {
            //localStorage.clear();
            window.location.href = '../index.html'; // Redirigir a la página principal
        });
    } else {
        // Si no hay usuario logueado, ocultar la información del usuario y mostrar el enlace de login
        userInfo.style.display = 'none';
        loginLink.style.display = 'inline-block';
    }
});