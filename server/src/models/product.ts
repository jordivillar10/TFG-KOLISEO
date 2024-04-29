import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT
    },
    description: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.INTEGER
    },
});