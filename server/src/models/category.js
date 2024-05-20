"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var sequelize_1 = require("sequelize");
var connection_1 = require("../db/connection");
exports.Category = connection_1.default.define('category', {
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
    }
});
