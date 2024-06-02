import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Exercise } from './excercise';
import { User } from "./user";

export const Entrenamiento = sequelize.define('entrenamiento',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    entrenamiento_date: {
        type: DataTypes.DATE,
        // allowNull: false,
        defaultValue: DataTypes.NOW
    }
})