import { Response } from "express";
import { prisma } from "../config/prisma.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

// Solo ADMIN: lista básica de usuarios, para elegir a quién asignarle una
// travesía en el Pasaporte Off-Road. Nunca incluye password ni googleId.
export async function listUsers(_req: AuthRequest, res: Response) {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return res.json(users);
}
