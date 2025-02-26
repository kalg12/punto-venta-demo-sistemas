"use client";

import { useEffect, useState } from "react";
import Layout from "app/layout/Layout";
import ProductForm from "app/components/productos/ProductForm";
import ProductCard from "app/components/productos/ProductCard";
import { getProducts } from "../api/products.api";
import { Product } from "../../types/product"; // Importa la interfaz

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await getProducts();
    if (response.success) {
      setProducts(response.data);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

        {/* Formulario para agregar producto */}
        <ProductForm onProductAdded={fetchProducts} />

        {/* Lista de productos */}
        {loading ? (
          <p className="text-gray-500">Cargando productos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={fetchProducts}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
