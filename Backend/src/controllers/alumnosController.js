import AppError from '../errors/AppError.js';
import AlumnoService from '../services/alumnoService.js';


export const obtenerAlumnoPorMatricula = async (req, res) => {
    try {
        const matricula = req.query.matricula;
        const result = await AlumnoService.obtenerAlumnoPorMatricula(matricula);
        return res.status(200).json({ ok: true, data: result });
    } catch (error) {
        if (error instanceof AppError) return res.status(error.status).json({ error: error.message });
        return res.status(400).json({ error: error.message });
    }
};