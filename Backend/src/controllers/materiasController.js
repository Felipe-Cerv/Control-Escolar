import AppError from '../errors/AppError.js';
import { fetchAllMaterias } from '../services/materiasService.js';

export const obtenerMaterias = async (req, res) => {
    try {
        const materias = await fetchAllMaterias();
        return res.status(200).json({ ok: true, data: materias });
    }   catch (error) {
        if (error instanceof AppError) return res.status(error.status).json({ error: error.message });
        return res.status(400).json({ error: error.message });
    }
};

export default { obtenerMaterias };