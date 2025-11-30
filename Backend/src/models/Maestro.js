import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Usuario from "./Usuario.js";

const Maestro = sequelize.define(
  "Maestro",
  {
    maestro_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    matricula: { type: DataTypes.STRING(10) },
    usuario_id: { type: DataTypes.INTEGER, references: { model: Usuario, key: "usuario_id" }},
  },
  { tableName: "maestros", timestamps: false }
);

export default Maestro;
