import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export async function listCategories(_req: Request, res: Response) {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return res.json(categories);
}

export async function createCategory(req: Request, res: Response) {
  const { name } = req.body ?? {};

  if (!name) {
    return res.status(400).json({ error: "name es obligatorio" });
  }

  const existing = await prisma.category.findUnique({ where: { name } });
  if (existing) {
    return res.status(409).json({ error: "Ya existe una categoría con ese nombre" });
  }

  const category = await prisma.category.create({ data: { name } });
  return res.status(201).json(category);
}
