import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Alumno from "./Alumno.js";
import Grupo from "./Grupo.js";
import Periodo from "./Periodo.js";

const AlumnoGrupoPeriodo = sequelize.define(
  "AlumnoGrupoPeriodo",
  {
    alumno_grupo_periodo_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    alumno_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Alumno, key: "alumno_id" }},
    grupo_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Grupo, key: "grupo_id" }},
    periodo_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Periodo, key: "periodo_id" }},
  },
  {
    tableName: "alumno_grupo_periodo",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["alumno_id", "periodo_id"]
      }
    ]
  }
);

export default AlumnoGrupoPeriodo;
