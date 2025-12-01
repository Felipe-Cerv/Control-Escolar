import { Op } from 'sequelize';
import { Sequelize } from 'sequelize';
import models, { sequelize } from '../models/index.js';
import { MateriasService, fetchAllMaterias } from './materiasService.js';
import { NotFoundError } from '../errors/NotFoundError.js';
export class CalificacionService {

    async obtenerPromediosPorMateria(materiaIds) {
        materiaIds = materiaIds ? materiaIds.split(',').map(id => id.trim()) : null;
        if (!materiaIds) {
            materiaIds = await fetchAllMaterias();
            materiaIds = materiaIds.map((m) => m.materia_id);
        }

        const result = await models.Calificacion.findAll({
            attributes: [
                [Sequelize.col('grupo_materia_maestro.materia_id'), 'materia_id'],
                [Sequelize.col('grupo_materia_maestro->materia.codigo'), 'codigo'],
                [Sequelize.col('grupo_materia_maestro->materia.nombre'), 'nombre'],
                [Sequelize.fn('COUNT', Sequelize.col('calificacion_id')), 'total_alumnos'],
                [Sequelize.fn('AVG', Sequelize.col('nota')), 'promedio'],
            ],
            include: [
                {
                    model: models.GrupoMateriaMaestro,
                    as: 'grupo_materia_maestro',
                    attributes: [],
                    include: [
                        {
                            model: models.Materia,
                            as: 'materia',
                            attributes: []
                        }
                    ]
                }
            ],
            where: {
                ['$grupo_materia_maestro.materia_id$']: { [Op.in]: materiaIds }
            },
            group: ['grupo_materia_maestro.materia_id','grupo_materia_maestro->materia.nombre','grupo_materia_maestro->materia.codigo']
        })
        // Normalize / map result so promedio is a number rounded to 2 decimals
        const mapped = result.map((r) => {
            // r can be a model instance or plain object depending on config
            const row = r && typeof r.get === 'function' ? r.get({ plain: true }) : r;
            const rawProm = row.promedio;
            const num = rawProm === null || rawProm === undefined ? NaN : Number(rawProm);
            const rounded = Number.isNaN(num) ? 0 : Number(num.toFixed(2));
            return {
                codigo: row.codigo,
                nombre: row.nombre,
                total_alumnos: row.total_alumnos,
                promedio: rounded,
            };
        });

        return mapped;
    }

    async obtenerPromediosGeneral(){
        const result = await models.Calificacion.findAll({
            attributes: [
                [Sequelize.col('alumno_grupo_periodo->alumno.matricula'), 'matricula'],
                [Sequelize.col('alumno_grupo_periodo->alumno->usuario.nombre'), 'nombre'],
                [Sequelize.fn('AVG', Sequelize.col('Calificacion.nota')), 'promedio'],
            ],
            include: [
                {
                    model: models.AlumnoGrupoPeriodo, as: 'alumno_grupo_periodo',
                    include: [
                        {
                            model: models.Alumno, as: 'alumno',
                            include: [
                                {
                                    model: models.Usuario, as: 'usuario',
                                    attributes: []
                                }
                            ],
                            attributes: []
                        }
                    ],
                    attributes: []
                }
            ],
            group: ['alumno_grupo_periodo->alumno.alumno_id','alumno_grupo_periodo->alumno->usuario.nombre','alumno_grupo_periodo->alumno.matricula']
        });

        const mapped = result.map((r) => {
            // r can be a model instance or plain object depending on config
            const row = r && typeof r.get === 'function' ? r.get({ plain: true }) : r;
            const rawProm = row.promedio;
            const num = rawProm === null || rawProm === undefined ? NaN : Number(rawProm);
            const rounded = Number.isNaN(num) ? 0 : Number(num.toFixed(2));
            return {
                matricula: row.matricula,
                nombre: row.nombre,
                promedio: rounded,
            };
        });
        return mapped;
    }

    async obtenerCalificacionesPorAlumno(alumno_id) {
        const result = await models.Calificacion.findAll({
            attributes: [
                [Sequelize.col('calificacion_id'), 'calificacion_id'],
                [Sequelize.col('grupo_materia_maestro->materia.codigo'), 'codigo'],
                [Sequelize.col('grupo_materia_maestro->materia.nombre'), 'materia'],
                [Sequelize.col('Calificacion.nota'), 'nota'],
                [Sequelize.col('grupo_materia_maestro->maestro->usuario.nombre'), 'maestro'],
            ],
            include: [
                {
                    model: models.AlumnoGrupoPeriodo,
                    as: 'alumno_grupo_periodo',
                    attributes: []
                },
                {
                    model: models.GrupoMateriaMaestro,
                    as: 'grupo_materia_maestro',
                    attributes: [],
                    include: [
                        {
                            model: models.Materia,
                            as: 'materia',
                            attributes: []
                        },
                        {
                            model: models.Maestro,
                            as: 'maestro',
                            attributes: [],
                            include: [
                                {
                                    model: models.Usuario,
                                    as: 'usuario',
                                    attributes: []
                                }
                            ]
                        }
                    ]
                }
            ],
            where: {
                ['$alumno_grupo_periodo.alumno_id$']: alumno_id, ['$estatus_calificacion_id$']: 1
            },
            raw: true
        });

        // Map results to clean format: codigo, materia, nota, maestro
        const mapped = result.map((row) => ({
            calificacion_id: row.calificacion_id,
            codigo: row.codigo,
            materia: row.materia,
            nota: row.nota,
            maestro: row.maestro
        }));

        return mapped;
    }

    async obtenerCalificacionesDeMaestro(maestro_id) {
        const result = await models.Calificacion.findAll({
            attributes: [
                [Sequelize.col('calificacion_id'), 'calificacion_id'],
                [Sequelize.col('alumno_grupo_periodo->alumno.matricula'), 'matricula'],
                [Sequelize.col('alumno_grupo_periodo->alumno->usuario.nombre'), 'alumno'],
                [Sequelize.col('grupo_materia_maestro->materia.nombre'), 'materia'],
                [Sequelize.col('alumno_grupo_periodo->grupo.descripcion'), 'grupo'],
                [Sequelize.col('Calificacion.nota'), 'nota'],
                [Sequelize.col('Calificacion.observaciones'), 'observaciones'],
            ],
            include: [
                {
                    model: models.GrupoMateriaMaestro,
                    as: 'grupo_materia_maestro',
                    attributes: [],
                    include: [
                        { model: models.Materia, as: 'materia', attributes: [] },
                        { model: models.Maestro, as: 'maestro', attributes: [] }
                    ]
                },
                {
                    model: models.AlumnoGrupoPeriodo,
                    as: 'alumno_grupo_periodo',
                    attributes: [],
                    include: [
                        {
                            model: models.Alumno,
                            as: 'alumno',
                            attributes: [],
                            include: [
                                { model: models.Usuario, as: 'usuario', attributes: [] }
                            ]
                        },
                        { model: models.Grupo, as: 'grupo', attributes: [] }
                    ]
                }
            ],
            where: {
                ['$grupo_materia_maestro.maestro_id$']: maestro_id
            },
            raw: true
        });

        const mapped = result.map((row) => {
            const notaNum = row.nota === null || row.nota === undefined ? null : Number(Number(row.nota).toFixed(2));
            return {
                calificacion_id: row.calificacion_id,
                matricula: row.matricula,
                alumno: row.alumno,
                materia: row.materia,
                grupo: row.grupo,
                nota: notaNum,
                observaciones: row.observaciones || ''
            };
        });

        return mapped;
    }

    async cambiarCalificacion({ calificacion_id, nueva_nota }) {
        await models.Calificacion.update(
            { nota: nueva_nota },
            { where: { calificacion_id } }
        );
        return;
    }

    async inactivarCalificacion(calificacion_id) {
        const [affected] = await models.Calificacion.update(
            { estatus_calificacion_id: 2 },
            { where: { calificacion_id } }
        );
        if (!affected) {
            throw new NotFoundError('No se encontró la calificación');
        }
        return { calificacion_id, estatus_calificacion_id: 2 };
    }
}

export default new CalificacionService();