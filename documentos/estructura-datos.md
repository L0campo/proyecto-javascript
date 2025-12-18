# 📌 Estructura de Datos del Proyecto

Este documento describe cómo se representan internamente los datos de productos y el carrito de compras.

## 🛒 Carrito de Compras

El carrito se representa utilizando un arreglo de objetos. Cada objeto representa un producto agregado con su cantidad:

```js
let carrito = [
  {
    id: 1,
    nombre: "Producto A",
    precio: 15000,
    cantidad: 2,
    imagen: "assets/img/producto-a.png"
  },
  {
    id: 2,
    nombre: "Producto B",
    precio: 9800,
    cantidad: 1,
    imagen: "assets/img/producto-b.png"
  }
];
