import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const Exercise = sequelize.define('exercise', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    seleccionado: {
        type: DataTypes.BOOLEAN
    }
    
});