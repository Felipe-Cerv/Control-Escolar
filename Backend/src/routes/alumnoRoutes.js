import { Router } from "express";
import { crearUsuario } from '../controllers/usuarioController.js';
import { body } from 'express-validator';
import validateRequest from '../middleware/validateRequest.js';
const router = Router();

router.post('/', [
    body('nombre').isString().notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un correo válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('fecha_nacimiento').isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida').toDate(),
    validateRequest,
], crearUsuario);

export default router;