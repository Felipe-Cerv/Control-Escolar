import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Usuario from "./Usuario.js";
import Rol from "./Rol.js";

const UsuarioRol = sequelize.define(
  "UsuarioRol",
  {
    usuario_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: Usuario, key: "usuario_id" }},
    rol_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: Rol, key: "rol_id" }},
  },
  { tableName: "usuario_roles", timestamps: false }
);

export default UsuarioRol;
