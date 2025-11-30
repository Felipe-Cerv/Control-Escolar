import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Grupo = sequelize.define(
  "Grupo",
  {
    grupo_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: DataTypes.STRING(20), allowNull: false },
  },
  { tableName: "grupos", timestamps: false }
);

export default Grupo;
