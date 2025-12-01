import models from "../models/index.js";
import calificacionService from "./calificacionService.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export class MaestroService {
	async obtenerReportePorUsuario(usuario_id) {
		const maestro = await models.Maestro.findOne({ where: { usuario_id } });
		if (!maestro) throw new NotFoundError('No se encontró maestro para este usuario');
		return calificacionService.obtenerCalificacionesDeMaestro(maestro.maestro_id);
	}

    async obtenerGruposDeMaestro(maestro_id) {
        const grupos = await models.GrupoMateriaMaestro.findAll({ where: { maestro_id } });
        if(!grupos || grupos.length === 0) throw new NotFoundError('No encontró información para este maestro');
        const grupoIds = grupos.map(g => g.grupo_id);
        const gruposInfo = await models.Grupo.findAll({ where: { grupo_id: grupoIds } });
        return gruposInfo;
    }

    async obtenerMateriasDeMaestro(maestro_id) {
        const materias = await models.GrupoMateriaMaestro.findAll({ where: { maestro_id } });
        if(!materias || materias.length === 0) throw new NotFoundError('No encontró información para este maestro');
        const materiaIds = materias.map(m => m.materia_id);
        const materiasInfo = await models.Materia.findAll({ where: { materia_id: materiaIds } });
        return materiasInfo;
    }

    async actualizarCalificacion(calificacion_id, nueva_nota, observaciones) {
        const calificacion = await models.Calificacion.findOne({ where: { calificacion_id } });
        if (!calificacion) throw new NotFoundError('No se encontró la calificación especificada');
        calificacion.nota = nueva_nota;
        if(observaciones) calificacion.observaciones = observaciones;
        await calificacion.save();
        return calificacion;
    }
}

export default new MaestroService();