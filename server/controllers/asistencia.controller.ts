import { Response } from "express";
import { prisma } from "../config/prisma.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { travesias } from "../../src/data/travesias.js";

export async function listMisAsistencias(req: AuthRequest, res: Response) {
  const asistencias = await prisma.travesiaAsistencia.findMany({
    where: { userId: req.userId! },
    orderBy: { createdAt: "desc" },
  });

  return res.json(asistencias);
}

// Solo ADMIN: ve el pasaporte de todos los usuarios (para saber a quién ya
// le cargó qué, y poder borrar si se equivocó).
export async function listAllAsistencias(_req: AuthRequest, res: Response) {
  const asistencias = await prisma.travesiaAsistencia.findMany({
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return res.json(asistencias);
}

// Solo ADMIN: marca que un usuario asistió a una travesía. La travesía tiene
// que existir en src/data/travesias.js (no se puede inventar un id cualquiera).
export async function createAsistencia(req: AuthRequest, res: Response) {
  const { userId, travesiaId } = req.body ?? {};

  if (!userId || !travesiaId) {
    return res.status(400).json({ error: "userId y travesiaId son obligatorios" });
  }
  if (!travesias.some((t) => t.id === travesiaId)) {
    return res.status(400).json({ error: "Esa travesía no existe" });
  }

  const usuario = await prisma.user.findUnique({ where: { id: userId } });
  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  try {
    const asistencia = await prisma.travesiaAsistencia.create({
      data: { userId, travesiaId },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    return res.status(201).json(asistencia);
  } catch {
    return res.status(409).json({ error: "Ese usuario ya tiene esa travesía cargada" });
  }
}

export async function deleteAsistencia(req: AuthRequest, res: Response) {
  const id = String(req.params.id);

  const asistencia = await prisma.travesiaAsistencia.findUnique({ where: { id } });
  if (!asistencia) {
    return res.status(404).json({ error: "No encontrada" });
  }

  await prisma.travesiaAsistencia.delete({ where: { id } });

  return res.status(204).send();
}
