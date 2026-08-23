import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createVehicle, listMyVehicles, deleteVehicle } from "../controllers/vehicle.controller.js";
import {
  listMaintenanceLogs,
  createMaintenanceLog,
  deleteMaintenanceLog,
} from "../controllers/maintenance.controller.js";

const router = Router();

// Todas las rutas de este archivo requieren estar logueado.
router.use(requireAuth);

router.post("/", createVehicle);
router.get("/", listMyVehicles);
router.delete("/:id", deleteVehicle);

// Registro de mantenimiento de un vehículo propio.
router.get("/:vehicleId/maintenance", listMaintenanceLogs);
router.post("/:vehicleId/maintenance", createMaintenanceLog);
router.delete("/:vehicleId/maintenance/:logId", deleteMaintenanceLog);

export default router;
