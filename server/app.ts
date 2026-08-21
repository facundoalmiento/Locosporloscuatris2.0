import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./config/prisma.js";
import authRoutes from "./routes/auth.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cronRoutes from "./routes/cron.routes.js";
import asistenciaRoutes from "./routes/asistencia.routes.js";
import userRoutes from "./routes/user.routes.js";

// Este archivo NO llama a app.listen(): en Vercel, la función serverless
// (api/[...slug].ts) es la que invoca a `app` por cada request. Para correrlo
// local con un servidor de verdad, usá server/local.ts (`npm run server:dev`).
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "connected" });
  } catch (error) {
    res.status(500).json({ status: "error", db: "disconnected" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cron", cronRoutes);
app.use("/api/asistencias", asistenciaRoutes);
app.use("/api/users", userRoutes);

export default app;
