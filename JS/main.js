import { obtenerProductos } from './api.js';
import { obtenerCarrito, guardarCarrito } from './storage.js';
import {
  filtrarPorCategoria,
  buscarProductos,
  ordenarProductos
} from './filters.js';



let productos = [];
let carrito = obtenerCarrito();

let filtros = {
  categoria: 'all',
  texto: '',
  orden: 'default'
};



const productosContainer = document.getElementById('productos');
const carritoContainer = document.getElementById('carrito-items');
const totalSpan = document.getElementById('total');
const buscador = document.getElementById('buscador');
const filtroCategoria = document.getElementById('filtroCategoria');
const ordenar = document.getElementById('ordenar');



async function init() {
  productos = await obtenerProductos();

  cargarCategorias(productos);   
  renderizarProductos(productos);
  renderizarCarrito();
}


init();



function renderizarProductos(lista) {
  productosContainer.innerHTML = '';

  lista.forEach(p => {
    productosContainer.innerHTML += `
      <div class="producto">
        <img src="${p.image}" alt="${p.title}">
        <h4>${p.title}</h4>
        <p class="categoria">${p.category}</p>
        <p>$${p.price}</p>
        <button data-id="${p.id}">Agregar</button>
      </div>
    `;
  });
}



function renderizarCarrito() {
  carritoContainer.innerHTML = '';
  let total = 0;

  carrito.forEach((p, index) => {
    total += p.price;

    carritoContainer.innerHTML += `
      <div class="carrito-item">
        <span>${p.title}</span>
        <button class="btn-eliminar" data-index="${index}">✖</button>
      </div>
    `;
  });

  totalSpan.textContent = total.toFixed(2);
  guardarCarrito(carrito);
}



function aplicarFiltros() {
  let resultado = productos;

  resultado = filtrarPorCategoria(resultado, filtros.categoria);
  resultado = buscarProductos(resultado, filtros.texto);
  resultado = ordenarProductos(resultado, filtros.orden);

  renderizarProductos(resultado);
}



productosContainer.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const id = Number(e.target.dataset.id);
    const producto = productos.find(p => p.id === id);

    carrito.push(producto);
    renderizarCarrito();
  }
});



carritoContainer.addEventListener('click', e => {
  if (e.target.classList.contains('btn-eliminar')) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1);
    renderizarCarrito();
  }
});



function cargarCategorias(lista) {

  filtroCategoria.innerHTML = `
    <option value="all">Todas las categorías</option>
  `;

 
  const categorias = [...new Set(lista.map(p => p.category))];

  categorias.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    filtroCategoria.appendChild(option);
  });
}




filtroCategoria.addEventListener('change', e => {
  filtros.categoria = e.target.value;
  aplicarFiltros();
});

buscador.addEventListener('input', e => {
  filtros.texto = e.target.value;
  aplicarFiltros();
});

ordenar.addEventListener('change', e => {
  filtros.orden = e.target.value;
  aplicarFiltros();
});
