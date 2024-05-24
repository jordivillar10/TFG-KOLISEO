"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPurchases = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
function getUserPurchases(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        SELECT p.id AS product_id, p.name AS product_name, pu.cantidad, pu.purchase_date, pu.total, pu.id as purchase_id, e.calle, e.numero, e.ciudad, e.cp
        FROM users u
        JOIN purchases pu ON u.id = pu.user_id
        JOIN envios e ON pu.id = e.purchase_id
        JOIN purchaseproducts pp ON pu.id = pp.purchase_id
        JOIN products p ON pp.product_id = p.id
        WHERE u.id = :userId;
    `;
        const purchases = yield connection_1.default.query(query, {
            replacements: { userId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        return purchases;
    });
}
exports.getUserPurchases = getUserPurchases;
