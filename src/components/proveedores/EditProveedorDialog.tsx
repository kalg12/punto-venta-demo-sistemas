"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { proveedoresAPI, Proveedor } from "../../services/proveedores.api";

interface Props {
  proveedor: Proveedor;
  onClose: () => void;
  onSuccess: () => void;
}

const EditProveedorDialog: React.FC<Props> = ({
  proveedor,
  onClose,
  onSuccess,
}) => {
  const [form, setForm] = useState({
    nombre: proveedor.nombre,
    direccion: proveedor.direccion,
    telefono: proveedor.telefono,
    email: proveedor.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await proveedoresAPI.update(proveedor.id, form);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Proveedor</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input name="nombre" value={form.nombre} onChange={handleChange} />
          <Input
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
          />
          <Input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />
          <Input name="email" value={form.email} onChange={handleChange} />
          <Button className="w-full mt-2" onClick={handleUpdate}>
            Actualizar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProveedorDialog;
