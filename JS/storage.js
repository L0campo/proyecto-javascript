const KEY = 'carrito';

export function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function guardarCarrito(carrito) {
  localStorage.setItem(KEY, JSON.stringify(carrito));
}
