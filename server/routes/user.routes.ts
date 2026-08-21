import { Router } from "express";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";
import { listUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", requireAuth, requireAdmin, listUsers);

export default router;
