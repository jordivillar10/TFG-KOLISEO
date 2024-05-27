"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entrenamiento = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = require("./user");
exports.Entrenamiento = connection_1.default.define('entrenamiento', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.User,
            key: 'id'
        }
    },
    repeticiones: {
        type: sequelize_1.DataTypes.INTEGER,
        // allowNull: false
    },
    peso: {
        type: sequelize_1.DataTypes.FLOAT,
        // allowNull: false
    },
    entrenamiento_date: {
        type: sequelize_1.DataTypes.DATE,
        // allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
});
