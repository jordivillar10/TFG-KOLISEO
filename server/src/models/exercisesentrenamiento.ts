import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Entrenamiento } from "./entrenamientos";
import { Exercise } from './excercise';
import { Serie } from "./serie";

export const ExercisesEntramiento = sequelize.define('exercisesentramiento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    entrenamiento_id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        references: {
            model: Entrenamiento,
            key: 'id'
        }
    },
    exercise_id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        references: {
            model: Exercise,
            key: 'id'
        }
    },
    // serie_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Serie,
    //         key: 'id'
    //     }
    // }
    // n_exercises: {
    //     type: DataTypes.INTEGER,
    //     // allowNull: false
    // }, 

});