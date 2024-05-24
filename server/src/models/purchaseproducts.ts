import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Product } from "./product";
import { Purchase } from "./purchase";

export const PurchaseProducts = sequelize.define('purchaseproducts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    purchase_id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        references: {
            model: Purchase,
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        // allowNull: false
    }, 
    price: {
        type: DataTypes.FLOAT,
        // allowNull: false
    },
});
