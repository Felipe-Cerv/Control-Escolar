import { Router } from "express";
import { query, param } from 'express-validator';
import validateRequest from '../middleware/validateRequest.js';
import auth from '../middleware/auth.js';
import { requireRole } from '../middleware/authorize.js';
import Roles from '../utils/enums.js';
import { obtenerPromediosPorMateria, obtenerPromediosGeneral, obtenerCalificacionesPorAlumno, inactivarCalificacion } from '../controllers/adminController.js';

const router = Router();

router.get('/promediosPorMateria', auth, requireRole(Roles.ADMINISTRADOR), obtenerPromediosPorMateria);
router.get('/promediosGenerales', auth, requireRole(Roles.ADMINISTRADOR), [
    query('periodo_id').isInt().withMessage('Debe proporcionar un ID de periodo válido'),
    validateRequest,
], obtenerPromediosGeneral);
router.get('/calificaciones', auth, requireRole(Roles.ADMINISTRADOR), [
    query('alumno_id').isInt().withMessage('Debe proporcionar un ID de alumno válido'),
    query('periodo_id').isInt().withMessage('Debe proporcionar un ID de periodo válido'),
    validateRequest,
], obtenerCalificacionesPorAlumno);
router.patch('/calificaciones', auth, requireRole(Roles.ADMINISTRADOR), [
    query('calificacion_id').isInt().withMessage('Debe proporcionar un ID de calificación válido'),
    validateRequest,
], obtenerCalificacionesPorAlumno);

router.delete('/calificaciones/:calificacion_id', auth, requireRole(Roles.ADMINISTRADOR), [
    param('calificacion_id').isInt().withMessage('Debe proporcionar un ID de calificación válido'),
    validateRequest,
], inactivarCalificacion);

export default router;