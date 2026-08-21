import { Router } from "express";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";
import { listCategories, createCategory } from "../controllers/category.controller.js";

const router = Router();

// Ver categorías es público (para que la tienda las pueda listar sin login).
router.get("/", listCategories);
// Crear una categoría es solo para administradores.
router.post("/", requireAuth, requireAdmin, createCategory);

export default router;
