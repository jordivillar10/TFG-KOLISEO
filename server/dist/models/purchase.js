"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = require("./user");
exports.Purchase = connection_1.default.define('purchase', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.User,
            key: 'id'
        }
    },
    // product_id: {
    //     type: DataTypes.INTEGER,
    //     // allowNull: false,
    //     references: {
    //         model: Product,
    //         key: 'id'
    //     }
    // },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        // allowNull: false
    },
    purchase_date: {
        type: sequelize_1.DataTypes.DATE,
        // allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
});
