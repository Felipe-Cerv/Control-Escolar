import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const EstatusCalificacion = sequelize.define(
  "EstatusCalificacion",
  {
    estatus_calificacion_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: DataTypes.STRING(50) }
  },
  { tableName: "estatus_calificacion", timestamps: false }
);

export default EstatusCalificacion;
