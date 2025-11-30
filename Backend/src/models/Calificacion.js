import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import AlumnoGrupoPeriodo from "./AlumnoGrupoPeriodo.js";
import GrupoMateriaMaestro from "./GrupoMateriaMaestro.js";
import Periodo from "./Periodo.js";
import EstatusCalificacion from "./EstatusCalificacion.js";
import { now } from "sequelize/lib/utils";

const Calificacion = sequelize.define(
  "Calificacion",
  {
    calificacion_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    alumno_grupo_periodo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: AlumnoGrupoPeriodo, key: "alumno_grupo_periodo_id" },
      onDelete: "CASCADE"
    },

    grupo_materia_maestro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: GrupoMateriaMaestro, key: "grupo_materia_maestro_id" },
    },

    periodo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Periodo, key: "periodo_id" }
    },

    nota: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    observaciones: { type: DataTypes.TEXT },

    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    estatus_calificacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: EstatusCalificacion, key: "estatus_calificacion_id" }
    }
  },
  {
    tableName: "calificaciones",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["alumno_grupo_periodo_id", "grupo_materia_maestro_id"]
      }
    ]
  }
);

export default Calificacion;
