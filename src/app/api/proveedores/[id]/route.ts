import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const { nombre, direccion, telefono, email } = body;

  try {
    const proveedorActualizado = await prisma.proveedor.update({
      where: { id: Number(id) },
      data: { nombre, direccion, telefono, email },
    });

    return NextResponse.json(proveedorActualizado);
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar proveedor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.proveedor.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Proveedor eliminado correctamente" });
  } catch {
    return NextResponse.json(
      { error: "Error al eliminar proveedor" },
      { status: 500 }
    );
  }
}
