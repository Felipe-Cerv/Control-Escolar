import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Materia = sequelize.define(
  "Materia",
  {
    materia_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    codigo: { type: DataTypes.STRING(50), unique: true },
    nombre: { type: DataTypes.STRING(150), allowNull: false },
  },
  {
    tableName: "materias",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Materia;
