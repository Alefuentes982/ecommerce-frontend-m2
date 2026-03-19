const productos = [
    { id: 1, nombre: "Caribe pack", precio: 63290, desc: "Café grano", img: "assets/img/caribe.png" },
    { id: 2, nombre: "Vernazza pack", precio: 70490, desc: "Café grano", img: "assets/img/vernazza.png" },
    { id: 3, nombre: "Consentido", precio: 26090, desc: "Café molido", img: "assets/img/consentido.png" }
];

function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = totalItems;
}

function renderizarProductos() {
    const grid = document.getElementById('product-grid');
    if (!grid) return; 
    
    grid.innerHTML = ""; 
    
    productos.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4'; 
        card.innerHTML = `
            <article class="card h-100 shadow-sm">
                <img src="${prod.img}" class="card-img-top" alt="${prod.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p class="card-text text-muted">${prod.desc}</p>
                    <p class="fw-bold fs-5">$${prod.precio}</p>
                    <div class="mt-auto">
                        <button onclick="agregarAlCarrito(${prod.id})" class="btn btn-primary w-100 mb-2">Agregar al carrito</button>
                        <a href="detalle.html?id=${prod.id}" class="btn btn-outline-secondary w-100">Ver más</a>
                    </div>
                </div>
            </article>
        `;
        grid.appendChild(card);
    });
}

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = productos.find(p => p.id === id);
    
    const existe = carrito.find(p => p.id === id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarContador();
});

if (window.location.pathname.includes('detalle.html')) {
    const params = new URLSearchParams(window.location.search);
    const idProducto = parseInt(params.get('id'));

    const productoEncontrado = productos.find(p => p.id === idProducto);

    if (productoEncontrado) {
        document.getElementById('det-nombre').innerText = productoEncontrado.nombre;
        document.getElementById('det-precio').innerText = `$${productoEncontrado.precio}`;
        document.getElementById('det-desc').innerText = productoEncontrado.desc;
        document.getElementById('det-img').src = productoEncontrado.img;
        
        document.getElementById('btn-add-detail').onclick = () => {
            agregarAlCarrito(productoEncontrado.id);
        };
    }
}