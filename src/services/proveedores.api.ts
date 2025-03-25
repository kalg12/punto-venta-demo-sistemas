/* The `export interface Proveedor` in the TypeScript code snippet is defining a TypeScript interface
named `Proveedor`. An interface in TypeScript is a way to define the shape of an object. In this
case, the `Proveedor` interface specifies the structure of an object representing a provider with
the following properties: */
export interface Proveedor {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  createdAt: string;
}

/* The `export interface ProveedorPayload` in the TypeScript code snippet is defining another
TypeScript interface named `ProveedorPayload`. This interface specifies the structure of an object
that represents the payload data needed to create a new provider. It includes properties for
`nombre`, `direccion`, `telefono`, and `email`, which are the required fields for creating a new
provider. This interface helps to enforce the structure of the data that should be provided when
creating a new provider through the `create` method in the `proveedoresAPI` object. */
export interface ProveedorPayload {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
}

const API_URL = "/api/proveedores";

export const proveedoresAPI = {
  // Obtener todos los proveedores
  async getAll(): Promise<Proveedor[]> {
    const res = await fetch(API_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Error al obtener proveedores");
    }

    return res.json();
  },

  // Crear nuevo proveedor
  async create(data: ProveedorPayload): Promise<Proveedor> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Error al crear proveedor");
    }

    return res.json();
  },

  // Actualizar proveedor por ID
  async update(
    id: number,
    data: Partial<ProveedorPayload>
  ): Promise<Proveedor> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Error al actualizar proveedor");
    }

    return res.json();
  },

  // Eliminar proveedor por ID
  async remove(id: number): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Error al eliminar proveedor");
    }

    return res.json();
  },
};
