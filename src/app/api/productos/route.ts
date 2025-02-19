import { NextRequest, NextResponse } from "next/server";
import { Producto } from "app/entities/Productos";
import { AppDataSource } from "app/lib/data-source";

/**
 * Obtener todos los productos
 */
export async function GET() {
  try {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const productoRepo = AppDataSource.getRepository(Producto);
    const productos = await productoRepo.find();

    return NextResponse.json({ success: true, data: productos });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error obteniendo productos", error },
      { status: 500 }
    );
  }
}

/**
 * Crear un nuevo producto
 */
export async function POST(req: NextRequest) {
  try {
    const {
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      imagenUrl,
      disponible,
    } = await req.json();

    if (!nombre || !precio || !stock || !categoria) {
      return NextResponse.json(
        { success: false, message: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const productoRepo = AppDataSource.getRepository(Producto);

    const nuevoProducto = productoRepo.create({
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      imagenUrl,
      disponible,
    });
    await productoRepo.save(nuevoProducto);

    return NextResponse.json(
      { success: true, data: nuevoProducto },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creando producto", error },
      { status: 500 }
    );
  }
}

/**
 * Obtener un producto por ID
 */
export async function GET_BY_ID(
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
 * Actualizar un producto por ID
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      imagenUrl,
      disponible,
    } = await req.json();

    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const productoRepo = AppDataSource.getRepository(Producto);
    const producto = await productoRepo.findOneBy({ id: Number(params.id) });

    if (!producto) {
      return NextResponse.json(
        { success: false, message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    productoRepo.merge(producto, {
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      imagenUrl,
      disponible,
    });
    await productoRepo.save(producto);

    return NextResponse.json({ success: true, data: producto });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error actualizando producto", error },
      { status: 500 }
    );
  }
}

/**
 * Eliminar un producto por ID
 */
export async function DELETE(
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

    await productoRepo.remove(producto);
    return NextResponse.json({ success: true, message: "Producto eliminado" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error eliminando producto", error },
      { status: 500 }
    );
  }
}
