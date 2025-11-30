import AppError from '../errors/AppError.js';
import CalificacionService from '../services/calificacionService.js';

export const obtenerPromediosPorMateria = async (req, res) => {
  try {
    let materias = req.query.materias || '';
    const result = await CalificacionService.obtenerPromediosPorMateria(materias);
    return res.status(200).json({ ok: true, data: result });
  } catch (error) {
    if (error instanceof AppError) return res.status(error.status).json({ error: error.message });
    return res.status(400).json({ error: error.message });
  }
};

export const obtenerPromediosGeneral = async (req, res) => {
    try {
        const result = await CalificacionService.obtenerPromediosGeneral();
        return res.status(200).json({ ok: true, data: result });
    } catch (error) {
        if (error instanceof AppError) return res.status(error.status).json({ error: error.message });
        return res.status(400).json({ error: error.message });
    }
}

export const obtenerCalificacionesPorAlumno = async (req, res) => {
    try {
        const alumno_id = req.params.alumno_id;
        const result = await CalificacionService.obtenerCalificacionesPorAlumno(alumno_id);
        return res.status(200).json({ ok: true, data: result });
    } catch (error) {
        if (error instanceof AppError) return res.status(error.status).json({ error: error.message });
        return res.status(400).json({ error: error.message });
    }
};


export default { obtenerPromediosPorMateria, obtenerPromediosGeneral, obtenerCalificacionesPorAlumno};