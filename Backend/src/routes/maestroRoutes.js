import { Router } from 'express';
import auth from '../middleware/auth.js';
import { requireRole } from '../middleware/authorize.js';
import validateRequest from '../middleware/validateRequest.js';
import Roles from '../utils/enums.js';
import { obtenerReporteMaestro, obtenerGruposDeMaestro, obtenerMateriasDeMaestro, actualizarCalificacion} from '../controllers/maestroController.js';
import { body, query } from 'express-validator';
import { obtenerMaterias } from '../controllers/materiasController.js';

const router = Router();

router.get('/reporte', auth, requireRole(Roles.MAESTRO), obtenerReporteMaestro);

router.get('/grupos', auth, requireRole(Roles.MAESTRO), [
    query('maestro_id').isInt().withMessage('Debe proporcionar un ID de maestro válido'),
], validateRequest,
    obtenerGruposDeMaestro);

router.get('/materias', auth, requireRole(Roles.MAESTRO), [
    query('maestro_id').isInt().withMessage('Debe proporcionar un ID de maestro válido'),
], validateRequest,
    obtenerMateriasDeMaestro);

router.patch('/calificacion', auth, requireRole(Roles.MAESTRO), [
    body('calificacion_id').isInt().withMessage('Debe proporcionar un ID de calificación válido'),
    body('nueva_nota').isFloat({ min: 0, max: 10 }).withMessage('La nota debe ser un número entre 0 y 10'),
], validateRequest,
    actualizarCalificacion);

export default router;
