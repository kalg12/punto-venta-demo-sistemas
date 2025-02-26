const API_URL = "http://localhost:3000/api/productos";

/**
 * Obtener todos los productos
 */
export const getProducts = async () => {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    return await res.json();
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return { success: false, message: "Error de conexión" };
  }
};

/**
 * Obtener un producto por ID
 */
export const getProductById = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    return await res.json();
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    return { success: false, message: "Error de conexión" };
  }
};

/**
 * Crear un nuevo producto
 */
export const createProduct = async (productData: {
  nombre: string;
  descripcion: string;
  precio: string;
  stock: string;
  categoria: string;
  imagenUrl?: string;
}) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    return await res.json();
  } catch (error) {
    console.error("Error creando producto:", error);
    return { success: false, message: "Error de conexión" };
  }
};

/**
 * Actualizar un producto por ID
 */
export const updateProduct = async (
  id: number,
  productData: Partial<{
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    imagenUrl: string;
  }>
) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    return await res.json();
  } catch (error) {
    console.error("Error actualizando producto:", error);
    return { success: false, message: "Error de conexión" };
  }
};

/**
 * Eliminar un producto por ID
 */
export const deleteProduct = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return await res.json();
  } catch (error) {
    console.error("Error eliminando producto:", error);
    return { success: false, message: "Error de conexión" };
  }
};
