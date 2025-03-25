import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const proveedores = await prisma.proveedor.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(proveedores);
  } catch {
    return NextResponse.json(
      { error: "Error al obtener proveedores" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, direccion, telefono, email } = body;

    if (!nombre || !direccion || !telefono || !email) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const nuevoProveedor = await prisma.proveedor.create({
      data: { nombre, direccion, telefono, email },
    });

    return NextResponse.json(nuevoProveedor, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear proveedor" },
      { status: 500 }
    );
  }
}
