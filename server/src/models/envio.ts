import { DataTypes } from "sequelize";
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
        type: DataTypes.STRING
    }
    ,
    surname: {
        type: DataTypes.STRING
    },
    calle: {
        type: DataTypes.STRING
    },
    numero: {
        type: DataTypes.STRING
    },
    ciudad: {
        type: DataTypes.STRING
    },
    pais: {
        type: DataTypes.STRING
    },
    cp: {
        type: DataTypes.STRING
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