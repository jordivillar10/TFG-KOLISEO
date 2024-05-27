"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesEntramiento = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const entrenamientos_1 = require("./entrenamientos");
const excercise_1 = require("./excercise");
exports.ExercisesEntramiento = connection_1.default.define('exercisesentramiento', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    entrenamiento_id: {
        type: sequelize_1.DataTypes.INTEGER,
        // allowNull: false,
        references: {
            model: entrenamientos_1.Entrenamiento,
            key: 'id'
        }
    },
    exercise_id: {
        type: sequelize_1.DataTypes.INTEGER,
        // allowNull: false,
        references: {
            model: excercise_1.Exercise,
            key: 'id'
        }
    },
    // n_exercises: {
    //     type: DataTypes.INTEGER,
    //     // allowNull: false
    // }, 
});
