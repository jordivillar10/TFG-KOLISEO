"use strict";
// import { Sequelize } from "sequelize";
Object.defineProperty(exports, "__esModule", { value: true });
// const sequelize = new Sequelize('rrhh', 'root', 'Nohay2sin3', {
//     host: 'localhost',
//     dialect: 'mysql',
// });
// export default sequelize;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('koliseo', 'jordi', 'Admin123', {
    host: '3.95.174.10',
    dialect: 'mysql',
});
exports.default = sequelize;
