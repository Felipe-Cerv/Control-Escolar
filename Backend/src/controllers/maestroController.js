import AppError from '../errors/AppError.js';
import MaestroService from '../services/maestroService.js';

export const obtenerReporteMaestro = async (req, res) => {
  try {
    const { usuario_id } = req.user;
    const data = await MaestroService.obtenerReportePorUsuario(usuario_id);
    return res.status(200).json({ ok: true, data });
  } catch (error) {
    if (error instanceof AppError) return res.status(error.status).json({ ok: false, error: error.message });
    return res.status(400).json({ ok: false, error: error.message });
  }
};

export const obtenerGruposDeMaestro = async (req, res) => {
  try {
    const { maestro_id } = req.query;
    const data = await MaestroService.obtenerGruposDeMaestro(maestro_id);
    return res.status(200).json({ ok: true, data });
  } catch (error) {
    if (error instanceof AppError) return res.status(error.status).json({ ok: false, error: error.message });
    return res.status(400).json({ ok: false, error: error.message });
  }  
};

export const obtenerMateriasDeMaestro = async (req, res) => {
  try {
    const { maestro_id } = req.query;
    const data = await MaestroService.obtenerMateriasDeMaestro(maestro_id);
    return res.status(200).json({ ok: true, data });
  }catch (error) {
    if (error instanceof AppError) return res.status(error.status).json({ ok: false, error: error.message });
    return res.status(400).json({ ok: false, error: error.message });
  }
};

export const actualizarCalificacion = async (req, res) => {
  try {
    const { calificacion_id, nueva_nota, observaciones } = req.body;
    const data = await MaestroService.actualizarCalificacion(calificacion_id, nueva_nota, observaciones);
    return res.status(200).json({ ok: true, data });
  } catch (error) {
    if (error instanceof AppError) return res.status(error.status).json({ ok: false, error: error.message });
    return res.status(400).json({ ok: false, error: error.message });
  }
};

export default { obtenerReporteMaestro, obtenerGruposDeMaestro, obtenerMateriasDeMaestro, actualizarCalificacion };