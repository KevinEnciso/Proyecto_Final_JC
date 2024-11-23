function toggleMenu() {
    const menu = document.getElementById('navbar-menu');
    menu.classList.toggle('show'); // Alterna la clase 'show' para mostrar/ocultar el menú
}

function home() {
    window.location.href='../html/products.html';
}

document.getElementById('purchase-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);

    // Verificar selección de producto
    if (!quantity) {
        alert('Por favor selecciona una cantidad.');
        return;
    }

    // Calcular el costo total
    const totalCost = (Math.random() * quantity) * 100

    // Mostrar resultado
    const result = document.getElementById('result');
    result.innerHTML = `
        <p>Gracias por tu compra, </strong><strong>${name}</strong>.</p>
        <p>Has comprado <strong>${quantity}</strong> unidades.</p>
        <p>Total a pagar: <strong>$${totalCost.toFixed(2)}</strong>.</p>
        <p>Enviaremos tu factura electrónica a <strong>${email}</strong>.</p>
        <style> 
            a{
                color: blue;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
        <a onclick="home()">Volver</a>
    `;
});
