import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Usuario from "./Usuario.js";

const Alumno = sequelize.define(
  "Alumno",
  {
    alumno_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    matricula: { type: DataTypes.STRING(10), unique: true },
    usuario_id: { type: DataTypes.INTEGER, references: { model: Usuario, key: "usuario_id" }}
  },
  {
    tableName: "alumnos",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Alumno;
