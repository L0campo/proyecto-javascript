const productosContainer = document.getElementById('productos');
const carritoContainer = document.getElementById('carrito-items');
const totalSpan = document.getElementById('total');
const buscador = document.getElementById('buscador');
const filtroCategoria = document.getElementById('filtroCategoria');
const ordenar = document.getElementById('ordenar');


let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


async function cargarProductos() {
try {
const res = await fetch('https://fakestoreapi.com/products');
productos = await res.json();
cargarCategorias(productos);
renderizarProductos(productos);
renderizarCarrito();
} catch (error) {
console.error('Error al cargar productos', error);
}
}


function renderizarProductos(lista) {
productosContainer.innerHTML = '';
lista.forEach(p => {
const div = document.createElement('div');
div.classList.add('producto');
div.innerHTML = `
<img src="${p.image}" alt="${p.title}">
<h4>${p.title}</h4>
<p>$${p.price}</p>
<p>${p.category}</p>
<button onclick="agregarAlCarrito(${p.id})">Agregar</button>
`;
productosContainer.appendChild(div);
});
}


function agregarAlCarrito(id) {
const producto = productos.find(p => p.id === id);
carrito.push(producto);
guardarCarrito();
renderizarCarrito();
}

function eliminarDelCarrito(index) {
carrito.splice(index, 1);
guardarCarrito();
renderizarCarrito();
}


function renderizarCarrito() {
carritoContainer.innerHTML = '';
let total = 0;


carrito.forEach((p, index) => {
total += p.price;
const div = document.createElement('div');
div.classList.add('carrito-item');
div.innerHTML = `
<span>${p.title}</span>
<button onclick="eliminarDelCarrito(${index})">X</button>
`;
carritoContainer.appendChild(div);
});


totalSpan.textContent = total.toFixed(2);
}


function guardarCarrito() {
localStorage.setItem('carrito', JSON.stringify(carrito));
}


function cargarCategorias(lista) {
const categorias = [...new Set(lista.map(p => p.category))];
categorias.forEach(cat => {
const option = document.createElement('option');
option.value = cat;
option.textContent = cat;
filtroCategoria.appendChild(option);
});
}


filtroCategoria.addEventListener('change', () => {
if (filtroCategoria.value === 'all') {
renderizarProductos(productos);
} else {
const filtrados = productos.filter(p => p.category === filtroCategoria.value);
renderizarProductos(filtrados);
}
});


ordenar.addEventListener('change', () => {
let copia = [...productos];


if (ordenar.value === 'precio-asc') copia.sort((a, b) => a.price - b.price);
if (ordenar.value === 'precio-desc') copia.sort((a, b) => b.price - a.price);
if (ordenar.value === 'nombre-asc') copia.sort((a, b) => a.title.localeCompare(b.title));
if (ordenar.value === 'nombre-desc') copia.sort((a, b) => b.title.localeCompare(a.title));


renderizarProductos(copia);
});


buscador.addEventListener('input', e => {
const texto = e.target.value.toLowerCase();
const filtrados = productos.filter(p =>
p.title.toLowerCase().includes(texto)
);
renderizarProductos(filtrados);
});


cargarProductos();