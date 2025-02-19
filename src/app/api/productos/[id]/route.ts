import { Producto } from "app/entities/Productos";
import { AppDataSource } from "app/lib/data-source";
import { NextRequest, NextResponse } from "next/server";

/**
 * Obtener un producto por ID
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const productoRepo = AppDataSource.getRepository(Producto);
    const producto = await productoRepo.findOneBy({ id: Number(params.id) });

    if (!producto) {
      return NextResponse.json(
        { success: false, message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: producto });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo producto", error },
      { status: 500 }
    );
  }
}

/**
 * Actualizar un producto por ID (PUT)
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const productoRepo = AppDataSource.getRepository(Producto);

    // Validar que el ID sea un número válido
    const productoId = Number(params.id);
    if (isNaN(productoId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    // Buscar el producto en la base de datos
    const producto = await productoRepo.findOneBy({ id: productoId });

    if (!producto) {
      return NextResponse.json(
        { success: false, message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Obtener datos del body
    const {
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      imagenUrl,
      disponible,
    } = await req.json();

    // Actualizar solo los campos proporcionados
    productoRepo.merge(producto, {
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      imagenUrl,
      disponible,
    });
    const productoActualizado = await productoRepo.save(producto);

    return NextResponse.json({ success: true, data: productoActualizado });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando producto", error },
      { status: 500 }
    );
  }
}

/**
 * Eliminar un producto por ID (DELETE)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const productoRepo = AppDataSource.getRepository(Producto);

    // Validar que el ID sea un número válido
    const productoId = Number(params.id);
    if (isNaN(productoId)) {
      return NextResponse.json(
        { success: false, message: "ID inválido" },
        { status: 400 }
      );
    }

    // Buscar el producto en la base de datos
    const producto = await productoRepo.findOneBy({ id: productoId });

    if (!producto) {
      return NextResponse.json(
        { success: false, message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Eliminar el producto
    await productoRepo.remove(producto);

    return NextResponse.json({
      success: true,
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando producto", error },
      { status: 500 }
    );
  }
}
