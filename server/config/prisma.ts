import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// El driver de Neon conecta por HTTPS/WebSocket (puerto 443) en vez del
// puerto tradicional de Postgres (5432). Necesario en redes que bloquean
// 5432 (redes corporativas/gubernamentales suelen hacerlo).
neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });

// Evita crear múltiples instancias de PrismaClient en desarrollo
// (ts-node-dev reinicia el proceso pero el module cache a veces persiste).
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma = global.__prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}
