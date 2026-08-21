import { Response } from "express";
import { prisma } from "../config/prisma.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

interface OrderItemInput {
  productId: string;
  quantity: number;
}

export async function createOrder(req: AuthRequest, res: Response) {
  const { items } = req.body ?? {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "items debe ser un array con al menos un producto" });
  }

  for (const item of items as OrderItemInput[]) {
    if (!item.productId || !item.quantity || item.quantity <= 0) {
      return res.status(400).json({ error: "Cada item necesita productId y quantity > 0" });
    }
  }

  try {
    // Todo dentro de una transacción: si algo falla (stock insuficiente,
    // producto inexistente), no se descuenta stock ni se crea nada.
    const order = await prisma.$transaction(async (tx) => {
      let total = 0;
      const orderItemsData = [];

      for (const item of items as OrderItemInput[]) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });

        if (!product) {
          throw new Error(`El producto ${item.productId} no existe`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Stock insuficiente para "${product.name}" (disponible: ${product.stock})`);
        }

        await tx.product.update({
          where: { id: product.id },
          data: { stock: product.stock - item.quantity },
        });

        total += product.price * item.quantity;
        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        });
      }

      return tx.order.create({
        data: {
          userId: req.userId!,
          totalAmount: total,
          status: "PENDING",
          items: { create: orderItemsData },
        },
        include: { items: true },
      });
    });

    return res.status(201).json(order);
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo crear la orden";
    return res.status(400).json({ error: message });
  }
}

export async function listMyOrders(req: AuthRequest, res: Response) {
  const orders = await prisma.order.findMany({
    // Los cancelados no le sirven de nada al usuario (nunca se concretaron):
    // los sigue viendo el admin en su panel, pero acá quedan afuera.
    where: { userId: req.userId!, status: { not: "CANCELLED" } },
    include: { items: { include: { product: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return res.json(orders);
}

// Solo ADMIN: ve los pedidos de todos los usuarios, para poder confirmarlos
// o cancelarlos (por ejemplo si alguien consultó por WhatsApp y no compró).
export async function listAllOrders(_req: AuthRequest, res: Response) {
  const orders = await prisma.order.findMany({
    include: {
      items: { include: { product: { select: { name: true } } } },
      user: { select: { id: true, name: true, email: true, phone: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return res.json(orders);
}

const ESTADOS_VALIDOS = ["PENDING", "PAID", "CANCELLED"];

// Solo ADMIN. Al cancelar un pedido que no estaba cancelado, le devolvemos el
// stock a cada producto (por eso "Pagado" no toca stock: ya se había
// descontado al crear el pedido; "Cancelado" es lo único que lo restaura).
export async function updateOrderStatus(req: AuthRequest, res: Response) {
  const id = String(req.params.id);
  const { status } = req.body ?? {};

  if (!ESTADOS_VALIDOS.includes(status)) {
    return res.status(400).json({ error: `status tiene que ser uno de: ${ESTADOS_VALIDOS.join(", ")}` });
  }

  const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) {
    return res.status(404).json({ error: "Pedido no encontrado" });
  }
  if (order.status === "CANCELLED") {
    return res.status(409).json({ error: "Este pedido ya está cancelado" });
  }

  const updated = await prisma.$transaction(async (tx) => {
    if (status === "CANCELLED") {
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
    }

    return tx.order.update({ where: { id }, data: { status } });
  });

  return res.json(updated);
}

// Solo ADMIN. Borra el pedido por completo (no solo lo marca cancelado).
// No se puede borrar un pedido "Pagado" (para no perder historial de ventas
// reales) — si hace falta anularlo, primero se cancela y después se borra.
export async function deleteOrder(req: AuthRequest, res: Response) {
  const id = String(req.params.id);

  const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) {
    return res.status(404).json({ error: "Pedido no encontrado" });
  }
  if (order.status === "PAID") {
    return res.status(409).json({
      error: "No se puede borrar un pedido pagado. Si hay que anularlo, cancelalo primero y después borralo.",
    });
  }

  await prisma.$transaction(async (tx) => {
    // Si todavía estaba "Pendiente" (nunca se canceló), el stock sigue
    // descontado: lo devolvemos acá para no perderlo al borrar el registro.
    if (order.status === "PENDING") {
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
    }

    await tx.order.delete({ where: { id } });
  });

  return res.status(204).send();
}
