"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseProducts = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const product_1 = require("./product");
const purchase_1 = require("./purchase");
exports.PurchaseProducts = connection_1.default.define('purchaseproducts', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    purchase_id: {
        type: sequelize_1.DataTypes.INTEGER,
        // allowNull: false,
        references: {
            model: purchase_1.Purchase,
            key: 'id'
        }
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        // allowNull: false,
        references: {
            model: product_1.Product,
            key: 'id'
        }
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        // allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        // allowNull: false
    },
});
