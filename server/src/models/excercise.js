"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercise = void 0;
var sequelize_1 = require("sequelize");
var connection_1 = require("../db/connection");
exports.Exercise = connection_1.default.define('exercise', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    seleccionado: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
