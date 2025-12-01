import models from '../models/index.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import  UsuarioService from './usuarioService.js';
import GrupoService from './grupoService.js';
import calificacionService from './calificacionService.js';

class AlumnoService {

    async findById(id) {
        return models.Alumno.findOne({ where: { alumno_id: id } });
    }

    async obtenerAlumnoPorMatricula(matricula) {
        const alumno = await models.Alumno.findOne({
            where: { matricula: matricula },
        });
        if (!alumno) throw new NotFoundError('No se encontró un alumno con esa matrícula');
        alumno.usuario = await UsuarioService.findById(alumno.usuario_id);
        const grupo =  await GrupoService.findByAlumnoId(alumno.alumno_id);
        const calificaciones = await calificacionService.obtenerCalificacionesPorAlumno(alumno.alumno_id);
        const response = { ...alumno.toJSON(), nombre: alumno.usuario.nombre, grupo: grupo.descripcion, calificaciones };
        
        return response;
    }

}

export default new AlumnoService();