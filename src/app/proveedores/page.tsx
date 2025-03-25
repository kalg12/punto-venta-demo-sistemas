import ProveedoresTable from "app/components/proveedores/ProveedoresTable";
import Layout from "app/layout/Layout";
import React from "react";

const page = () => {
  return (
    <>
      <Layout>
        <main className="container mx-auto mt-4 mb-4">
          <h1 className="text-2xl font-bold mb-4">Gestión de Proveedores</h1>
          <ProveedoresTable />
        </main>
      </Layout>
    </>
  );
};

export default page;
