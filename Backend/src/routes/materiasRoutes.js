import { Router } from "express";
import auth from '../middleware/auth.js';
import materiasController from "../controllers/materiasController.js";
import { requireRole } from "../middleware/authorize.js";
import Roles from "../utils/enums.js";

const router = Router();

router.get('/',auth,requireRole(Roles.ADMINISTRADOR), materiasController.obtenerMaterias);

export default router;