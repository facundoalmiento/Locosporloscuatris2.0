import { Router } from "express";
import { ejecutarRecordatoriosMantenimiento } from "../controllers/cron.controller";

const router = Router();

// Sin requireAuth: la protege el CRON_SECRET (ver cron.controller.ts),
// porque quien la llama es Vercel, no un usuario logueado del sitio.
router.get("/recordatorios", ejecutarRecordatoriosMantenimiento);

export default router;
