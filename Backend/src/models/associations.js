
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

    // relacion usuario-Rol 
    Usuario.belongsToMany(Rol, {
        through: UsuarioRol,
        foreignKey: "usuario_id"
    });

    Rol.belongsToMany(Usuario, {
        through: UsuarioRol,
        foreignKey: "rol_id"
    });

    // relacion usuario alumno
    Usuario.hasOne(Alumno, {
        foreignKey: "usuario_id"
    });
    Alumno.belongsTo(Usuario, {
        foreignKey: "usuario_id"
    });

    // relacion usuario maestro
    Usuario.hasOne(Maestro, {
        foreignKey: "usuario_id"
    });
    Maestro.belongsTo(Usuario, {
        foreignKey: "usuario_id"
    });

    // relacion periodo estatus
    EstatusPeriodo.hasMany(Periodo, {
        foreignKey: "estatus_periodo_id"
    });
    Periodo.belongsTo(EstatusPeriodo, {
        foreignKey: "estatus_periodo_id"
    });

    // relacion grupo-materia-maestro
    Grupo.hasMany(GrupoMateriaMaestro, { foreignKey: "grupo_id" });
    GrupoMateriaMaestro.belongsTo(Grupo, { foreignKey: "grupo_id" });

    Materia.hasMany(GrupoMateriaMaestro, { foreignKey: "materia_id" });
    GrupoMateriaMaestro.belongsTo(Materia, { foreignKey: "materia_id" });

    Maestro.hasMany(GrupoMateriaMaestro, { foreignKey: "maestro_id" });
    GrupoMateriaMaestro.belongsTo(Maestro, { foreignKey: "maestro_id" });

    // relacion alumno-grupo-periodo
    Alumno.hasMany(AlumnoGrupoPeriodo, { foreignKey: "alumno_id" });
    AlumnoGrupoPeriodo.belongsTo(Alumno, { foreignKey: "alumno_id" });

    Grupo.hasMany(AlumnoGrupoPeriodo, { foreignKey: "grupo_id" });
    AlumnoGrupoPeriodo.belongsTo(Grupo, { foreignKey: "grupo_id" });

    Periodo.hasMany(AlumnoGrupoPeriodo, { foreignKey: "periodo_id" });
    AlumnoGrupoPeriodo.belongsTo(Periodo, { foreignKey: "periodo_id" });

    // relacion Calificacion
    AlumnoGrupoPeriodo.hasMany(Calificacion, {
        foreignKey: "alumno_grupo_periodo_id"
    });
    Calificacion.belongsTo(AlumnoGrupoPeriodo, {
        foreignKey: "alumno_grupo_periodo_id"
    });

    GrupoMateriaMaestro.hasMany(Calificacion, {
        foreignKey: "grupo_materia_maestro_id"
    });
    Calificacion.belongsTo(GrupoMateriaMaestro, {
        foreignKey: "grupo_materia_maestro_id"
    });

    Periodo.hasMany(Calificacion, {
        foreignKey: "periodo_id"
    });
    Calificacion.belongsTo(Periodo, {
        foreignKey: "periodo_id"
    });

    EstatusCalificacion.hasMany(Calificacion, {
        foreignKey: "estatus_calificacion_id"
    });
    Calificacion.belongsTo(EstatusCalificacion, {
        foreignKey: "estatus_calificacion_id"
    });
}
