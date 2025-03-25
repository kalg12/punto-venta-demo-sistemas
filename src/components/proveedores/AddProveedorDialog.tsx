"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  proveedoresAPI,
  ProveedorPayload,
} from "../../services/proveedores.api";
import { Button } from "../ui/button";

interface Props {
  onSuccess: () => void;
}

const AddProveedorDialog: React.FC<Props> = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ProveedorPayload>({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await proveedoresAPI.create(form);
      onSuccess();
      setOpen(false);
      setForm({ nombre: "", direccion: "", telefono: "", email: "" });
    } catch (error) {
      console.error("Error al crear proveedor:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Agregar Proveedor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Proveedor</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            placeholder="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          <Input
            placeholder="Dirección"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
          />
          <Input
            placeholder="Teléfono"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />
          <Input
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <Button className="w-full mt-2" onClick={handleSubmit}>
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProveedorDialog;
