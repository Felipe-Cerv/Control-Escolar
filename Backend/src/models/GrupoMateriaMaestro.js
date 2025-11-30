import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Grupo from "./Grupo.js";
import Materia from "./Materia.js";
import Maestro from "./Maestro.js";

const GrupoMateriaMaestro = sequelize.define(
  "GrupoMateriaMaestro",
  {
    grupo_materia_maestro_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    grupo_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Grupo, key: "grupo_id" }},
    materia_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Materia, key: "materia_id" }},
    maestro_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Maestro, key: "maestro_id" }},
  },
  { tableName: "grupo_materia_maestro", timestamps: false }
);

export default GrupoMateriaMaestro;
