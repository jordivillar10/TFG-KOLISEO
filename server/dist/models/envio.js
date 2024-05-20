"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Envio = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = require("./user");
const purchase_1 = require("./purchase");
exports.Envio = connection_1.default.define('envio', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    surname: {
        type: sequelize_1.DataTypes.STRING
    },
    calle: {
        type: sequelize_1.DataTypes.STRING
    },
    numero: {
        type: sequelize_1.DataTypes.STRING
    },
    ciudad: {
        type: sequelize_1.DataTypes.STRING
    },
    pais: {
        type: sequelize_1.DataTypes.STRING
    },
    cp: {
        type: sequelize_1.DataTypes.STRING
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.User,
            key: 'id'
        }
    },
    purchase_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: purchase_1.Purchase,
            key: 'id'
        }
    }
});
