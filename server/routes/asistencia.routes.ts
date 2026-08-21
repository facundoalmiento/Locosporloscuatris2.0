import { Router } from "express";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware";
import {
  listMisAsistencias,
  listAllAsistencias,
  createAsistencia,
  deleteAsistencia,
} from "../controllers/asistencia.controller";

const router = Router();

router.use(requireAuth);

router.get("/", listMisAsistencias);
router.get("/all", requireAdmin, listAllAsistencias);
router.post("/", requireAdmin, createAsistencia);
router.delete("/:id", requireAdmin, deleteAsistencia);

export default router;
