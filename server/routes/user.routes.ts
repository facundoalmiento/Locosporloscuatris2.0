import { Router } from "express";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware";
import { listUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", requireAuth, requireAdmin, listUsers);

export default router;
