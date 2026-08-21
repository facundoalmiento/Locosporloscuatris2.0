import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { enviarRecordatorioMantenimiento } from "../services/email";
import {
  TIPOS_MANTENIMIENTO,
  DIAS_AVISO_TRAVESIA,
  DIAS_CHEQUEO_FINAL,
  diasHasta,
  proximaTravesia,
  estaVencido,
} from "../../src/utils/mantenimiento.js";

// La dispara Vercel Cron una vez por día (ver "crons" en vercel.json).
// Vercel manda el header Authorization: Bearer <CRON_SECRET> automáticamente
// en cada invocación programada — así nos aseguramos de que no la dispare
// cualquiera pegándole a la URL.
export async function ejecutarRecordatoriosMantenimiento(req: Request, res: Response) {
  if (process.env.CRON_SECRET) {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ error: "No autorizado" });
    }
  }

  const travesia = proximaTravesia();
  if (!travesia || diasHasta(travesia.fechaInicio) > DIAS_AVISO_TRAVESIA) {
    return res.json({ enviados: 0, motivo: "No hay travesía próxima dentro del rango de aviso" });
  }

  const dias = diasHasta(travesia.fechaInicio);
  const chequeoFinal = dias <= DIAS_CHEQUEO_FINAL;

  const usuarios = await prisma.user.findMany({
    where: { vehicles: { some: {} } },
    include: { vehicles: { include: { maintenanceLogs: true } } },
  });

  let enviados = 0;
  const errores: string[] = [];

  for (const usuario of usuarios) {
    const grupos = usuario.vehicles
      .map((v) => ({
        vehiculo: `${v.brand} ${v.model}`,
        items: TIPOS_MANTENIMIENTO.filter((t) => estaVencido(v, t.value)).map((t) => t.label),
      }))
      .filter((g) => g.items.length > 0);

    if (grupos.length === 0 && !chequeoFinal) continue;

    const firma = `${travesia.id}|chequeoFinal:${chequeoFinal}|${grupos.map((g) => `${g.vehiculo}:${g.items.join(",")}`).join("|")}`;

    // Ya le mandamos exactamente este mismo aviso: no lo repetimos.
    if (usuario.lastReminderSignature === firma) continue;

    try {
      await enviarRecordatorioMantenimiento({
        to: usuario.email,
        nombre: usuario.name,
        tituloTravesia: travesia.titulo,
        dias,
        chequeoFinal,
        grupos,
      });
      await prisma.user.update({ where: { id: usuario.id }, data: { lastReminderSignature: firma } });
      enviados++;
    } catch (err) {
      errores.push(`${usuario.email}: ${err instanceof Error ? err.message : "error desconocido"}`);
    }
  }

  return res.json({ enviados, revisados: usuarios.length, errores });
}
