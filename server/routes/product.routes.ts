import { Router } from "express";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware";
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router = Router();

// Ver productos es público, como la página "Tienda" del sitio.
router.get("/", listProducts);
router.get("/:id", getProduct);
// Crear, editar y borrar es solo para administradores.
router.post("/", requireAuth, requireAdmin, createProduct);
router.patch("/:id", requireAuth, requireAdmin, updateProduct);
router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

export default router;
