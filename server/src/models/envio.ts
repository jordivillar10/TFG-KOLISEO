import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user";
import { Purchase } from "./purchase";


export const Envio = sequelize.define('envio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    calle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    purchase_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Purchase,
            key: 'id'
        }
    }
});