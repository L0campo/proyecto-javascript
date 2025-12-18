export function filtrarPorCategoria(productos, categoria) {
  if (categoria === 'all') return productos;
  return productos.filter(p => p.category === categoria);
}

export function buscarProductos(productos, texto) {
  return productos.filter(p =>
    p.title.toLowerCase().includes(texto.toLowerCase())
  );
}

export function ordenarProductos(productos, tipo) {
  const copia = [...productos];

  switch (tipo) {
    case 'precio-asc':
      return copia.sort((a, b) => a.price - b.price);
    case 'precio-desc':
      return copia.sort((a, b) => b.price - a.price);
    case 'nombre-asc':
      return copia.sort((a, b) => a.title.localeCompare(b.title));
    case 'nombre-desc':
      return copia.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return productos;
  }
}