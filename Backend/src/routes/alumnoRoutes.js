import { Router } from "express";
import { crearUsuario } from '../controllers/usuarioController.js';
import { body, query } from 'express-validator';
import validateRequest from '../middleware/validateRequest.js';
import { obtenerAlumnoPorMatricula } from '../controllers/alumnosController.js';
const router = Router();

router.post('/', [
    body('nombre').isString().notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un correo válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('fecha_nacimiento').isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida').toDate(),
    validateRequest,
], crearUsuario);

router.get('/',[
    query('matricula').isString().notEmpty().withMessage('La matrícula es obligatoria'),
    validateRequest,
],obtenerAlumnoPorMatricula);

router.get()
export default router;