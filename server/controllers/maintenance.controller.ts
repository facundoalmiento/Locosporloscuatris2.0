import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

const TIPOS_VALIDOS = ["ACEITE", "GENERAL"];

// Confirma que el vehículo exista y sea del usuario logueado. Se usa antes de
// leer o escribir su bitácora, así nadie ve ni toca el mantenimiento de un
// cuatriciclo ajeno.
async function getVehiculoPropio(vehicleId: string, userId: string) {
  const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
  if (!vehicle || vehicle.userId !== userId) return null;
  return vehicle;
}

export async function listMaintenanceLogs(req: AuthRequest, res: Response) {
  const vehicleId = String(req.params.vehicleId);

  const vehicle = await getVehiculoPropio(vehicleId, req.userId!);
  if (!vehicle) {
    return res.status(404).json({ error: "Vehículo no encontrado" });
  }

  const logs = await prisma.maintenanceLog.findMany({
    where: { vehicleId },
    orderBy: { date: "desc" },
  });

  return res.json(logs);
}

export async function createMaintenanceLog(req: AuthRequest, res: Response) {
  const vehicleId = String(req.params.vehicleId);
  const { type, date, note } = req.body ?? {};

  if (!TIPOS_VALIDOS.includes(type)) {
    return res.status(400).json({ error: `type tiene que ser uno de: ${TIPOS_VALIDOS.join(", ")}` });
  }
  if (!date || Number.isNaN(Date.parse(date))) {
    return res.status(400).json({ error: "date es obligatorio (fecha válida)" });
  }

  const vehicle = await getVehiculoPropio(vehicleId, req.userId!);
  if (!vehicle) {
    return res.status(404).json({ error: "Vehículo no encontrado" });
  }

  const log = await prisma.maintenanceLog.create({
    data: { vehicleId, type, date: new Date(date), note: note || null },
  });

  return res.status(201).json(log);
}

export async function deleteMaintenanceLog(req: AuthRequest, res: Response) {
  const vehicleId = String(req.params.vehicleId);
  const logId = String(req.params.logId);

  const vehicle = await getVehiculoPropio(vehicleId, req.userId!);
  if (!vehicle) {
    return res.status(404).json({ error: "Vehículo no encontrado" });
  }

  const log = await prisma.maintenanceLog.findUnique({ where: { id: logId } });
  if (!log || log.vehicleId !== vehicleId) {
    return res.status(404).json({ error: "Registro no encontrado" });
  }

  await prisma.maintenanceLog.delete({ where: { id: logId } });

  return res.status(204).send();
}
