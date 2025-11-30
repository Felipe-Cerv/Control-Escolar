import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const EstatusPeriodo = sequelize.define(
  "EstatusPeriodo",
  {
    estatus_periodo_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: DataTypes.STRING(50), allowNull: false },
  },
  { tableName: "estatus_periodo", timestamps: false }
);

export default EstatusPeriodo;
