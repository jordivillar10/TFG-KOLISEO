"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize('koliseo', 'jordi', 'Admin123', {
    host: '54.226.65.179',
    dialect: 'mysql',
});
exports.default = sequelize;
