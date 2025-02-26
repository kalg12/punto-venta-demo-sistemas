import { createProduct } from "app/app/api/products.api";
import { useState } from "react";

interface ProductFormProps {
  onProductAdded: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    imagenUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct(formData);
    onProductAdded();
    setFormData({
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      categoria: "",
      imagenUrl: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6"
    >
      <h2 className="text-lg font-bold mb-4">Agregar Producto</h2>
      <input
        name="nombre"
        placeholder="Nombre"
        onChange={handleChange}
        value={formData.nombre}
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        onChange={handleChange}
        value={formData.descripcion}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="precio"
        type="number"
        placeholder="Precio"
        onChange={handleChange}
        value={formData.precio}
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="stock"
        type="number"
        placeholder="Stock"
        onChange={handleChange}
        value={formData.stock}
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="categoria"
        placeholder="Categoría"
        onChange={handleChange}
        value={formData.categoria}
        required
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="imagenUrl"
        placeholder="URL Imagen"
        onChange={handleChange}
        value={formData.imagenUrl}
        className="w-full mb-2 p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar
      </button>
    </form>
  );
};

export default ProductForm;
