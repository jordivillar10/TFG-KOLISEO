import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Entrenamiento } from "./entrenamientos";
import { Exercise } from "./excercise";


export const Serie = sequelize.define('serie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    entrenamiento_id: {
        type:DataTypes.INTEGER,
        references: {
            model: Entrenamiento,
            key: 'id'
        }
    },
    exercise_id: {
        type:DataTypes.INTEGER,
        references: {
            model: Exercise,
            key: 'id'
        }
    },
    repeticiones: {
        type: DataTypes.INTEGER
    },
    peso: {
        type: DataTypes.INTEGER
    },
    

}
)