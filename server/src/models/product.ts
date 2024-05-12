import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Category } from "./category";

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
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    }
});