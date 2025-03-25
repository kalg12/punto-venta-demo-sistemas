"use client";

import React, { useEffect, useState } from "react";
import { proveedoresAPI, Proveedor } from "../../services/proveedores.api";
import { Button } from "../ui/button";
import { Trash, Pencil } from "lucide-react";
import AddProveedorDialog from "./AddProveedorDialog";
import EditProveedorDialog from "./EditProveedorDialog";
import DeleteProveedorDialog from "./DeleteProveedorDialog";

const ProveedoresTable = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(
    null
  );
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  const fetchProveedores = async () => {
    try {
      const data = await proveedoresAPI.getAll();
      setProveedores(data);
    } catch (error) {
      console.error("Error al cargar proveedores:", error);
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  return (
    <div className="mt-6">
      <AddProveedorDialog onSuccess={fetchProveedores} />
      <div className="overflow-x-auto mt-4 border rounded-md">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Dirección</th>
              <th className="p-2">Teléfono</th>
              <th className="p-2">Email</th>
              <th className="p-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.id} className="border-b">
                <td className="p-2">{proveedor.nombre}</td>
                <td className="p-2">{proveedor.direccion}</td>
                <td className="p-2">{proveedor.telefono}</td>
                <td className="p-2">{proveedor.email}</td>
                <td className="p-2 text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedProveedor(proveedor);
                      setDialogType("edit");
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedProveedor(proveedor);
                      setDialogType("delete");
                    }}
                  >
                    <Trash size={16} />
                  </Button>
                </td>
              </tr>
            ))}
            {proveedores.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-4 text-muted-foreground"
                >
                  No hay proveedores registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {dialogType === "edit" && selectedProveedor && (
        <EditProveedorDialog
          proveedor={selectedProveedor}
          onClose={() => {
            setDialogType(null);
            setSelectedProveedor(null);
          }}
          onSuccess={fetchProveedores}
        />
      )}

      {dialogType === "delete" && selectedProveedor && (
        <DeleteProveedorDialog
          proveedor={selectedProveedor}
          onClose={() => {
            setDialogType(null);
            setSelectedProveedor(null);
          }}
          onSuccess={fetchProveedores}
        />
      )}
    </div>
  );
};

export default ProveedoresTable;
