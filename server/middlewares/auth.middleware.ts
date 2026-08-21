import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Le agregamos userId/userRole al Request una vez que el token es válido,
// así los controllers protegidos saben "quién" está pidiendo algo.
export interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Falta el token de autenticación (header Authorization: Bearer <token>)" });
  }

  const token = authHeader.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    req.userId = payload.userId;
    req.userRole = payload.role;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

// Se usa DESPUÉS de requireAuth (necesita que req.userRole ya esté seteado).
// El rol ADMIN nunca se puede pedir desde /api/auth/register: solo se asigna
// a mano en la base, para que nadie se autopromueva.
export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.userRole !== "ADMIN") {
    return res.status(403).json({ error: "Esta acción requiere permisos de administrador" });
  }
  next();
}
