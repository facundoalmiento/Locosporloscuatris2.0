import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export async function listProducts(req: Request, res: Response) {
  const { categoryId } = req.query;

  const products = await prisma.product.findMany({
    where: categoryId ? { categoryId: String(categoryId) } : undefined,
    include: { category: true },
    orderBy: { name: "asc" },
  });

  return res.json(products);
}

export async function getProduct(req: Request, res: Response) {
  const id = String(req.params.id);

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  return res.json(product);
}

export async function createProduct(req: Request, res: Response) {
  const { name, description, price, stock, images, categoryId } = req.body ?? {};

  if (!name || price === undefined || stock === undefined || !categoryId) {
    return res.status(400).json({ error: "name, price, stock y categoryId son obligatorios" });
  }
  if (images !== undefined && !Array.isArray(images)) {
    return res.status(400).json({ error: "images tiene que ser un array de URLs (puede ir vacío: [])" });
  }

  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) {
    return res.status(400).json({ error: "La categoría indicada no existe" });
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      images: images ?? [],
      categoryId,
    },
  });

  return res.status(201).json(product);
}

export async function updateProduct(req: Request, res: Response) {
  const id = String(req.params.id);
  const { name, description, price, stock, images, categoryId } = req.body ?? {};

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  if (images !== undefined && !Array.isArray(images)) {
    return res.status(400).json({ error: "images tiene que ser un array de URLs (puede ir vacío: [])" });
  }

  if (categoryId) {
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      return res.status(400).json({ error: "La categoría indicada no existe" });
    }
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(price !== undefined && { price: Number(price) }),
      ...(stock !== undefined && { stock: Number(stock) }),
      ...(images !== undefined && { images }),
      ...(categoryId !== undefined && { categoryId }),
    },
  });

  return res.json(product);
}

export async function deleteProduct(req: Request, res: Response) {
  const id = String(req.params.id);

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  try {
    await prisma.product.delete({ where: { id } });
  } catch {
    // El producto tiene órdenes asociadas (OrderItem) y Postgres no deja borrarlo.
    return res.status(409).json({
      error: "No se puede borrar: el producto tiene compras asociadas. Marcá stock 0 en vez de borrarlo.",
    });
  }

  return res.status(204).send();
}
