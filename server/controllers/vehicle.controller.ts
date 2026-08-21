import { Response } from "express";
import { prisma } from "../config/prisma.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

export async function createVehicle(req: AuthRequest, res: Response) {
  const { brand, model, engineCc, lastOilChange, lastGeneralMaintenance } = req.body ?? {};

  if (!brand || !model || !engineCc) {
    return res.status(400).json({ error: "brand, model y engineCc son obligatorios" });
  }

  // Las dos fechas son opcionales: si el usuario las sabe, arrancamos la
  // bitácora ahí mismo (sin tener que ir a cargarla aparte). Si no las sabe,
  // el vehículo se crea igual y queda como "nunca registrado".
  const logsIniciales: { type: "ACEITE" | "GENERAL"; date: Date }[] = [];

  if (lastOilChange) {
    if (Number.isNaN(Date.parse(lastOilChange))) {
      return res.status(400).json({ error: "lastOilChange tiene que ser una fecha válida" });
    }
    logsIniciales.push({ type: "ACEITE", date: new Date(lastOilChange) });
  }
  if (lastGeneralMaintenance) {
    if (Number.isNaN(Date.parse(lastGeneralMaintenance))) {
      return res.status(400).json({ error: "lastGeneralMaintenance tiene que ser una fecha válida" });
    }
    logsIniciales.push({ type: "GENERAL", date: new Date(lastGeneralMaintenance) });
  }

  const vehicle = await prisma.vehicle.create({
    data: {
      brand,
      model,
      engineCc: Number(engineCc),
      userId: req.userId!,
      ...(logsIniciales.length > 0 && { maintenanceLogs: { create: logsIniciales } }),
    },
    include: { maintenanceLogs: true },
  });

  return res.status(201).json(vehicle);
}

export async function listMyVehicles(req: AuthRequest, res: Response) {
  const vehicles = await prisma.vehicle.findMany({
    where: { userId: req.userId! },
    // Traemos la bitácora de una vez para no pedirla vehículo por vehículo:
    // con esto alcanza para mostrar "último cambio de aceite" en la lista.
    include: { maintenanceLogs: { orderBy: { date: "desc" } } },
    orderBy: { brand: "asc" },
  });

  return res.json(vehicles);
}

export async function deleteVehicle(req: AuthRequest, res: Response) {
  const id = String(req.params.id);

  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) {
    return res.status(404).json({ error: "Vehículo no encontrado" });
  }
  // Solo el dueño puede borrar su propio vehículo (los admins no gestionan vehículos ajenos acá).
  if (vehicle.userId !== req.userId) {
    return res.status(403).json({ error: "No podés borrar un vehículo que no es tuyo" });
  }

  await prisma.vehicle.delete({ where: { id } });

  return res.status(204).send();
}
