import AppError from '../errors/AppError.js';
import { AlumnoService } from '../services/alumnoService.js';

export const obtenerAlumnosPorMateria = async (req, res) => {
  try {
    const { maestro_id, materia_id } = req.body;
    const result = await AlumnoService.obtenerAlumnosPorMateria({ maestro_id, materia_id });
    return res.status(200).json({ ok: true, data: result });
  } catch (error) {
    if (error instanceof AppError) return res.status(error.status).json({ error: error.message });
    return res.status(400).json({ error: error.message });
  }
};

export default { loginUser, crearUsuario, modificarRolUsuario };