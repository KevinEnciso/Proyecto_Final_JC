// Función para alternar el menú en dispositivos móviles
function toggleMenu() {
    const navbarMenu = document.getElementById('navbar-menu');
    navbarMenu.classList.toggle('show');
}

// Cargar el nombre del usuario desde LocalStorage al cargar la página
window.onload = function() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        const userName = storedUser.name;
        const userLastname = storedUser.lastname;
        document.getElementById('username').textContent = userName;
        document.getElementById('user-lastname').textContent = userLastname;
        document.getElementById('user-info').style.display = 'flex'; // Mostrar la información del usuario
    }

    // Mostrar los comentarios para todas las reseñas
    const reviewIds = [1, 2, 3]; // Agrega aquí los IDs de las reseñas que tienen comentarios
    reviewIds.forEach(reviewId => {
        displayComments(reviewId);
    });
};

// Función para cerrar sesión
function logout() {
    alert('Has cerrado sesión correctamente.');
    window.location.replace = '../index.html'; // Ruta absoluta desde la raíz del proyecto
}

// Función para agregar un comentario
function addComment(reviewId) {
    const commentInput = document.getElementById('comment-input-' + reviewId);
    const commentText = commentInput.value.trim();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (commentText && storedUser) {
        // Crear el nuevo comentario
        const commentList = document.getElementById('comments-list-' + reviewId);
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        
        // Mostrar el nombre del usuario junto al comentario
        const commentUser = document.createElement('span');
        commentUser.classList.add('comment-user');
        commentUser.textContent = storedUser.name + ' ' + storedUser.lastname + ': ';
        
        const commentContent = document.createElement('span');
        commentContent.classList.add('comment-content');
        commentContent.textContent = commentText;
        
        // Agregar la funcionalidad de like al comentario
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-comment-btn');
        likeButton.textContent = '👍';
        likeButton.onclick = function() {
            const likeCount = parseInt(likeButton.getAttribute('data-likes')) || 0;
            likeButton.setAttribute('data-likes', likeCount + 1);
            likeButton.textContent = `👍 ${likeCount + 1}`;
        };

        // Añadir todos los elementos al nuevo comentario
        newComment.appendChild(commentUser);
        newComment.appendChild(commentContent);
        newComment.appendChild(likeButton);

        // Añadir el nuevo comentario a la lista de comentarios en el DOM
        commentList.appendChild(newComment);

        // Guardar el comentario en LocalStorage
        saveCommentToLocalStorage(reviewId, storedUser, commentText);

        // Limpiar el campo de texto
        commentInput.value = '';
    } else {
        alert('Debes estar logueado para comentar.');
    }
}

// Función para guardar el comentario en LocalStorage
function saveCommentToLocalStorage(reviewId, user, commentText) {
    // Obtener los comentarios existentes desde LocalStorage
    let comments = JSON.parse(localStorage.getItem('comments-' + reviewId)) || [];

    // Crear un objeto para el nuevo comentario
    const newComment = {
        username: user.name + ' ' + user.lastname,
        text: commentText,
        likes: 0  // El conteo de likes empieza en 0
    };

    // Añadir el nuevo comentario al array
    comments.push(newComment);

    // Guardar el array actualizado de comentarios en LocalStorage
    localStorage.setItem('comments-' + reviewId, JSON.stringify(comments));
}

// Función para mostrar los comentarios desde LocalStorage
function displayComments(reviewId) {
    const commentsList = document.getElementById('comments-list-' + reviewId);

    // Obtener los comentarios guardados en LocalStorage
    const comments = JSON.parse(localStorage.getItem('comments-' + reviewId)) || [];

    // Limpiar los comentarios previos
    commentsList.innerHTML = '';

    // Recorrer los comentarios y mostrarlos
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        const commentUser = document.createElement('span');
        commentUser.classList.add('comment-user');
        commentUser.textContent = comment.username + ': ';

        const commentContent = document.createElement('span');
        commentContent.classList.add('comment-content');
        commentContent.textContent = comment.text;

        // Agregar el botón de like y su contador
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-comment-btn');
        likeButton.textContent = `👍 ${comment.likes}`;
        likeButton.onclick = function() {
            comment.likes += 1;
            likeButton.textContent = `👍 ${comment.likes}`;
            saveCommentToLocalStorage(reviewId, { name: comment.username.split(' ')[0] }, comment.text);  // Actualizar el comentario en LocalStorage
        };

        // Añadir los elementos al comentario
        commentElement.appendChild(commentUser);
        commentElement.appendChild(commentContent);
        commentElement.appendChild(likeButton);

        // Añadir el comentario al DOM
        commentsList.appendChild(commentElement);
    });
}