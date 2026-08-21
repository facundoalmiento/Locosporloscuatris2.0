import { Router } from "express";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";
import { createOrder, listMyOrders, listAllOrders, updateOrderStatus, deleteOrder } from "../controllers/order.controller.js";

const router = Router();

// Comprar y ver "mis compras" requiere estar logueado.
router.use(requireAuth);

router.post("/", createOrder);
router.get("/", listMyOrders);
router.get("/all", requireAdmin, listAllOrders);
router.patch("/:id/status", requireAdmin, updateOrderStatus);
router.delete("/:id", requireAdmin, deleteOrder);

export default router;
