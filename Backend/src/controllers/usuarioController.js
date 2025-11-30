import UsuarioService from '../services/usuarioService.js';
import AppError from '../errors/AppError.js';
import NotFoundError from '../errors/NotFoundError.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await UsuarioService.autenticarUsuario({ email, password });
    return res.status(200).json({ ok: true, data: { token, user } });
  } catch (error) {
    // Map custom AppError to its status, otherwise return 400 for business errors
    if (error instanceof AppError) return res.status(error.status).json({ error: error.message });
    return res.status(400).json({ error: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, fecha_nacimiento } = req.body;
    const user = await UsuarioService.crearUsuario({ nombre, email, password, fecha_nacimiento });
    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof AppError) return res.status(error.status).json({ error: error.message });
    return res.status(400).json({ error: error.message });
  }
};

export default { loginUser, crearUsuario };