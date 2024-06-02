import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user";

export const Purchase = sequelize.define('purchase', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
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
        type: DataTypes.INTEGER,
        // allowNull: false
    },
    purchase_date: {
        type: DataTypes.DATE,
        // allowNull: false,
        defaultValue: DataTypes.NOW
    }
});
