import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Rol = sequelize.define(
  "Rol",
  {
    rol_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  },
  { tableName: "roles", timestamps: false }
);

export default Rol;
