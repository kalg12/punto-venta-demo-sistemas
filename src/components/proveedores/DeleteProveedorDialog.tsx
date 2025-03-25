"use client";

import React from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Proveedor, proveedoresAPI } from "../../services/proveedores.api";

interface Props {
  proveedor: Proveedor;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteProveedorDialog: React.FC<Props> = ({
  proveedor,
  onClose,
  onSuccess,
}) => {
  const handleDelete = async () => {
    try {
      await proveedoresAPI.remove(proveedor.id);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Proveedor</DialogTitle>
        </DialogHeader>
        <p className="text-sm mb-4">
          ¿Estás seguro de que deseas eliminar a{" "}
          <strong>{proveedor.nombre}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Eliminar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProveedorDialog;
