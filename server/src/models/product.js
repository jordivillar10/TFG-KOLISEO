"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var sequelize_1 = require("sequelize");
var connection_1 = require("../db/connection");
var category_1 = require("./category");
exports.Product = connection_1.default.define('product', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: category_1.Category,
            key: 'id'
        }
    }
});
