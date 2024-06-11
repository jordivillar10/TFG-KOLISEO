"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('rrhh', 'root', 'Nohay2sin3', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = sequelize;
// import { Sequelize } from "sequelize";
// const sequelize = new Sequelize('koliseo', 'jordi', 'Admin123', {
//     host: '54.91.39.132',
//     dialect: 'mysql',
// });
// export default sequelize;
