import UserService from '../services/usuarioService.js';
import AppError from '../errors/AppError.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await UserService.autenticarUsuario({ email, password });
    return res.status(200).json({ ok: true, data: { token, user } });
  } catch (error) {
    if (error instanceof AppError) return res.status(error.status).json({ error: error.message });
    return res.status(400).json({ error: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, fecha_nacimiento, rol_id } = req.body;
    const user = await UserService.crearUsuario({ nombre, email, password, fecha_nacimiento, rol_id });
    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof AppError) return res.status(error.status).json({ error: error.message });
    return res.status(400).json({ error: error.message });
  }
};

export const modificarRolUsuario = async (req, res) => {
  try {
    const { usuario_id, rol_id } = req.body;
    const result = await UserService.modificarRolUsuario({ usuario_id, rol_id });
    return res.status(200).json({ ok: true, data: result });
  } catch (error) {
    if (error instanceof AppError) return res.status(error.status).json({ error: error.message });
    return res.status(400).json({ error: error.message });
  }
};
export default { loginUser, crearUsuario, modificarRolUsuario };