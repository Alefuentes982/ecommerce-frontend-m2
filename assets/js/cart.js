function renderizarCarrito() {
    const cartContainer = document.getElementById('cart-container');
    const cartEmpty = document.getElementById('cart-empty');
    const cartTotal = document.getElementById('cart-total');
    const totalPriceElement = document.getElementById('total-price');
    
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (!cartContainer || !cartEmpty || !cartTotal) return;

    cartContainer.innerHTML = '';

    if (carrito.length === 0) {
        cartEmpty.classList.remove('d-none');
        cartTotal.classList.add('d-none');
        actualizarBadgeNavbar(0);
        return;
    }

    cartEmpty.classList.add('d-none');
    cartTotal.classList.remove('d-none');

    let totalCalculado = 0;
    let cantidadTotalItems = 0;

    carrito.forEach((item) => {
        const subtotal = item.precio * item.cantidad;
        totalCalculado += subtotal;
        cantidadTotalItems += item.cantidad;

        const div = document.createElement('div');
        div.className = 'list-group-item d-flex justify-content-between align-items-center p-3 mb-2 shadow-sm border rounded';
        div.innerHTML = `
            <div class="d-flex align-items-center">
                <div>
                    <h5 class="mb-1">${item.nombre}</h5>
                    <p class="mb-0 text-muted">Cantidad: ${item.cantidad} x $${item.precio}</p>
                </div>
            </div>
            <div class="text-end">
                <span class="badge bg-primary rounded-pill fs-6 mb-2 d-block">$${subtotal}</span>
                <button onclick="eliminarProducto(${item.id})" class="btn btn-sm btn-outline-danger">Eliminar</button>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    totalPriceElement.innerText = `Total: $${totalCalculado}`;
    actualizarBadgeNavbar(cantidadTotalItems);
}

function finalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) return;

    let total = 0;
    let detalleBoleta = "--- BOLETA ELECTRÓNICA N° 256548913 ---\n\n";
    
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        detalleBoleta += `${item.nombre} x${item.cantidad}: $${subtotal}\n`;
    });

    detalleBoleta += `\n--------------------------\n`;
    detalleBoleta += `TOTAL PAGADO: $${total}\n`;
    detalleBoleta += `MEDIO DE PAGO: EFECTIVO\n`;
    detalleBoleta += `FECHA: 19-03-2026\n`;
    detalleBoleta += `\n¡Gracias por tu compra!\n`;
    detalleBoleta += `\nC A F É c a f é\n`;
    

    alert(detalleBoleta);

    vaciarCarrito();
    
    window.location.href = "index.html";
}

function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    renderizarCarrito();
}

function actualizarBadgeNavbar(cantidad) {
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = cantidad;
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();

    const btnClear = document.getElementById('clear-cart');
    if (btnClear) {
        btnClear.addEventListener('click', vaciarCarrito);
    }

    const btnFinalizar = document.querySelector('.btn-success');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', finalizarCompra);
    }
});