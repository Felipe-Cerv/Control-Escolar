import { Router } from "express";
import { crearUsuario, modificarRolUsuario } from '../controllers/usuarioController.js';
import { body } from 'express-validator';
import validateRequest from '../middleware/validateRequest.js';
import auth from '../middleware/auth.js';
import { requireRole } from '../middleware/authorize.js';
import Roles from '../utils/enums.js';

const router = Router();

router.post('/', auth, requireRole(Roles.ADMINISTRADOR), [
    body('nombre').isString().notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un correo válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('fecha_nacimiento').isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida').toDate(),
    body('rol_id').isInt().withMessage('Debe proporcionar un rol para el usuario'),
    validateRequest,
], crearUsuario);

router.patch('/rolUsuario/', auth, requireRole(Roles.ADMINISTRADOR), [
    body('usuario_id').isInt().withMessage('Debe proporcionar un ID de usuario válido'),
    body('rol_id').isInt().withMessage('Debe proporcionar un rol válido'),
    validateRequest,
], modificarRolUsuario);
export default router;