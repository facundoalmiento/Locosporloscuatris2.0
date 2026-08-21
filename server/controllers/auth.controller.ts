import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "../config/prisma";
import { enviarBienvenida } from "../services/email";

// Manda el mail de bienvenida sin bloquear la respuesta del login/registro:
// si Resend está lento o falla, el usuario igual entra sin demora ni error.
function enviarBienvenidaEnSegundoPlano(to: string, nombre: string) {
  enviarBienvenida({ to, nombre }).catch((err) => {
    console.error("No se pudo mandar el mail de bienvenida:", err);
  });
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = "7d";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// Nunca devolvemos el hash de la contraseña en las respuestas.
function toPublicUser(user: {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: string;
}) {
  return { id: user.id, email: user.email, name: user.name, phone: user.phone, role: user.role };
}

export async function register(req: Request, res: Response) {
  const { email, password, name, phone } = req.body ?? {};

  if (!email || !password || !name) {
    return res.status(400).json({ error: "email, password y name son obligatorios" });
  }
  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "Ya existe un usuario con ese email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name, phone },
  });

  enviarBienvenidaEnSegundoPlano(user.email, user.name);

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return res.status(201).json({ user: toPublicUser(user), token });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ error: "email y password son obligatorios" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    // Sin user.password: o no existe la cuenta, o es una cuenta creada solo con Google
    // (nunca tuvo contraseña). En ambos casos devolvemos el mismo error genérico.
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return res.json({ user: toPublicUser(user), token });
}

// Login/registro con "Iniciar sesión con Google". El frontend nos manda el idToken
// que devuelve Google; acá lo verificamos con Google y, si es válido, buscamos o
// creamos el usuario correspondiente en NUESTRA base de datos y emitimos NUESTRO JWT
// (el mismo formato que usa el login con contraseña).
export async function googleLogin(req: Request, res: Response) {
  const { idToken } = req.body ?? {};

  if (!idToken || typeof idToken !== "string") {
    return res.status(400).json({ error: "idToken es obligatorio" });
  }
  if (!GOOGLE_CLIENT_ID) {
    return res.status(500).json({ error: "Login con Google no está configurado en el servidor" });
  }

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch {
    return res.status(401).json({ error: "Token de Google inválido" });
  }

  if (!payload?.sub || !payload.email) {
    return res.status(401).json({ error: "Token de Google inválido" });
  }
  if (!payload.email_verified) {
    return res.status(401).json({ error: "El email de Google no está verificado" });
  }

  const googleId = payload.sub;
  const email = payload.email;
  const name = payload.name ?? email.split("@")[0];

  // 1) ¿Ya inició sesión con Google antes? -> lo encontramos por googleId.
  let user = await prisma.user.findUnique({ where: { googleId } });

  // 2) ¿No, pero ya tenía cuenta creada con email/contraseña? -> vinculamos esa cuenta.
  if (!user) {
    const existingByEmail = await prisma.user.findUnique({ where: { email } });
    if (existingByEmail) {
      user = await prisma.user.update({
        where: { id: existingByEmail.id },
        data: { googleId },
      });
    }
  }

  // 3) Primera vez que lo vemos -> creamos el usuario (sin contraseña, solo Google).
  if (!user) {
    user = await prisma.user.create({
      data: { email, name, googleId },
    });
    enviarBienvenidaEnSegundoPlano(user.email, user.name);
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return res.json({ user: toPublicUser(user), token });
}
