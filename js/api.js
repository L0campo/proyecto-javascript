const API_URL = 'https://fakestoreapi.com/products';

export async function obtenerProductos() {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (error) {
    console.error('Error al consumir la API', error);
    return [];
  }
}