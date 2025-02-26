import { useState } from "react";
import { deleteProduct } from "app/app/api/products.api";
import DeleteProductModal from "./DeleteProductModal";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagenUrl?: string;
}

interface ProductCardProps {
  product: Product;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteProduct(product.id);
    onDelete();
    setIsDeleting(false);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-800">
      <img
        src={product.imagenUrl || "/placeholder.png"}
        alt={product.nombre}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-bold mt-2">{product.nombre}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {product.descripcion}
      </p>
      <p className="text-gray-800 dark:text-gray-200 font-semibold">
        Precio: ${product.precio}
      </p>
      <p className="text-gray-500 dark:text-gray-400">Stock: {product.stock}</p>

      <div className="flex justify-between mt-3">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md"
          onClick={() => setIsDeleting(true)}
        >
          Eliminar
        </button>
      </div>

      {isDeleting && (
        <DeleteProductModal
          onConfirm={handleDelete}
          onCancel={() => setIsDeleting(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;
