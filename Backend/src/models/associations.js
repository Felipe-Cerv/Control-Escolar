export default function applyAssociations(models) {
    const {
        Usuario,
        Rol,
        UsuarioRol,
        Alumno,
        Grupo,
        Materia,
        Maestro,
        EstatusPeriodo,
        Periodo,
        GrupoMateriaMaestro,
        AlumnoGrupoPeriodo,
        EstatusCalificacion,
        Calificacion
    } = models;

    // ============================
    // Usuario - Rol
    // ============================
    Usuario.belongsToMany(Rol, {
        through: UsuarioRol,
        foreignKey: "usuario_id",
        as: "roles"
    });

    Rol.belongsToMany(Usuario, {
        through: UsuarioRol,
        foreignKey: "rol_id",
        as: "usuarios"
    });

    // ============================
    // Usuario - Alumno
    // ============================
    Usuario.hasOne(Alumno, {
        foreignKey: "usuario_id",
        as: "alumno"
    });

    Alumno.belongsTo(Usuario, {
        foreignKey: "usuario_id",
        as: "usuario"
    });

    // ============================
    // Usuario - Maestro
    // ============================
    Usuario.hasOne(Maestro, {
        foreignKey: "usuario_id",
        as: "maestro"
    });

    Maestro.belongsTo(Usuario, {
        foreignKey: "usuario_id",
        as: "usuario"
    });

    // ============================
    // EstatusPeriodo - Periodo
    // ============================
    EstatusPeriodo.hasMany(Periodo, {
        foreignKey: "estatus_periodo_id",
        as: "periodos"
    });

    Periodo.belongsTo(EstatusPeriodo, {
        foreignKey: "estatus_periodo_id",
        as: "estatus_periodo"
    });

    // ============================
    // Grupo - GrupoMateriaMaestro
    // ============================
    Grupo.hasMany(GrupoMateriaMaestro, {
        foreignKey: "grupo_id",
        as: "grupo_materia_maestro"
    });

    GrupoMateriaMaestro.belongsTo(Grupo, {
        foreignKey: "grupo_id",
        as: "grupo"
    });

    // ============================
    // Materia - GrupoMateriaMaestro
    // ============================
    Materia.hasMany(GrupoMateriaMaestro, {
        foreignKey: "materia_id",
        as: "grupo_materia_maestro"
    });

    GrupoMateriaMaestro.belongsTo(Materia, {
        foreignKey: "materia_id",
        as: "materia"    
    });

    // ============================
    // Maestro - GrupoMateriaMaestro
    // ============================
    Maestro.hasMany(GrupoMateriaMaestro, {
        foreignKey: "maestro_id",
        as: "grupo_materia_maestro"
    });

    GrupoMateriaMaestro.belongsTo(Maestro, {
        foreignKey: "maestro_id",
        as: "maestro"
    });

    // ============================
    // Alumno - AlumnoGrupoPeriodo
    // ============================
    Alumno.hasMany(AlumnoGrupoPeriodo, {
        foreignKey: "alumno_id",
        as: "alumno_grupo_periodo"
    });

    AlumnoGrupoPeriodo.belongsTo(Alumno, {
        foreignKey: "alumno_id",
        as: "alumno"
    });

    // ============================
    // Grupo - AlumnoGrupoPeriodo
    // ============================
    Grupo.hasMany(AlumnoGrupoPeriodo, {
        foreignKey: "grupo_id",
        as: "alumno_grupo_periodo"
    });

    AlumnoGrupoPeriodo.belongsTo(Grupo, {
        foreignKey: "grupo_id",
        as: "grupo"
    });

    // ============================
    // Periodo - AlumnoGrupoPeriodo
    // ============================
    Periodo.hasMany(AlumnoGrupoPeriodo, {
        foreignKey: "periodo_id",
        as: "alumno_grupo_periodo"
    });

    AlumnoGrupoPeriodo.belongsTo(Periodo, {
        foreignKey: "periodo_id",
        as: "periodo"
    });

    // ============================
    // AlumnoGrupoPeriodo - Calificacion
    // ============================
    AlumnoGrupoPeriodo.hasMany(Calificacion, {
        foreignKey: "alumno_grupo_periodo_id",
        as: "calificaciones"
    });

    Calificacion.belongsTo(AlumnoGrupoPeriodo, {
        foreignKey: "alumno_grupo_periodo_id",
        as: "alumno_grupo_periodo"
    });

    // ============================
    // GrupoMateriaMaestro - Calificacion
    // ============================
    GrupoMateriaMaestro.hasMany(Calificacion, {
        foreignKey: "grupo_materia_maestro_id",
        as: "calificaciones"
    });

    Calificacion.belongsTo(GrupoMateriaMaestro, {
        foreignKey: "grupo_materia_maestro_id",
        as: "grupo_materia_maestro"
    });

    // ============================
    // EstatusCalificacion - Calificacion
    // ============================
    EstatusCalificacion.hasMany(Calificacion, {
        foreignKey: "estatus_calificacion_id",
        as: "calificaciones"
    });

    Calificacion.belongsTo(EstatusCalificacion, {
        foreignKey: "estatus_calificacion_id",
        as: "estatus_calificacion"
    });
}
