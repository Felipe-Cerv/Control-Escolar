import models from '../models/index.js';
import { NotFoundError } from '../errors/NotFoundError.js';

class GrupoService {

    async findByAlumnoId(id) {
        const alumnoGrupoPeriodo = await models.AlumnoGrupoPeriodo.findOne({ where: { alumno_id: id } });
        if (!alumnoGrupoPeriodo) throw new NotFoundError('No se encontró un grupo para ese alumno');

        const grupo = await models.Grupo.findOne({ where: { grupo_id: alumnoGrupoPeriodo.grupo_id } });
        return grupo;
    }
}

export default new GrupoService();