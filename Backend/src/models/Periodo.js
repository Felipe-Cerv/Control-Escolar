import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import EstatusPeriodo from "./EstatusPeriodo.js";

const Periodo = sequelize.define(
  "Periodo",
  {
    periodo_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fecha_inicio: { type: DataTypes.DATE, allowNull: false },
    fecha_fin: { type: DataTypes.DATE, allowNull: false },
    estatus_periodo_id: { type: DataTypes.INTEGER, references: { model: EstatusPeriodo, key: "estatus_periodo_id" }},
  },
  { tableName: "periodos", timestamps: false }
);

export default Periodo;