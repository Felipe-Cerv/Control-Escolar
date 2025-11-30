import { Router } from "express";
import { loginUser } from '../controllers/usuarioController.js';
import { body } from 'express-validator';
import validateRequest from '../middleware/validateRequest.js';
const router = Router();

router.post('/login',[
    body('email').isEmail().withMessage('Debe ser un correo válido'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    validateRequest,
], loginUser);

export default router;