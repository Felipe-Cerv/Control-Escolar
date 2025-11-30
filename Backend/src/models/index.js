import sequelize from "../config/sequelize.js";
import applyAssociations from "./associations.js";

import Usuario from "./Usuario.js";
import Rol from "./Rol.js";
import UsuarioRol from "./UsuarioRol.js";
import Alumno from "./Alumno.js";
import Grupo from "./Grupo.js";
import Materia from "./Materia.js";
import Maestro from "./Maestro.js";
import EstatusPeriodo from "./EstatusPeriodo.js";
import Periodo from "./Periodo.js";
import GrupoMateriaMaestro from "./GrupoMateriaMaestro.js";
import AlumnoGrupoPeriodo from "./AlumnoGrupoPeriodo.js";
import EstatusCalificacion from "./EstatusCalificacion.js";
import Calificacion from "./Calificacion.js";

const models = {
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
};

applyAssociations(models);

export { sequelize };
export default models;
