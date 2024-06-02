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
const getUserPurchases = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const purchasesWithProducts = yield connection_1.default.query(`
    SELECT 
      pu.id AS purchase_id,
      pu.total,
      pu.purchase_date,
      e.calle,
      e.numero,
      e.ciudad,
      e.cp,
      p.id AS product_id,
      p.name AS product_name,
      pp.cantidad
      FROM purchases pu
      JOIN envios e ON pu.id = e.purchase_id
      JOIN purchaseproducts pp ON pu.id = pp.purchase_id
      JOIN products p ON pp.product_id = p.id
      WHERE pu.user_id = :userId
    `, {
        type: sequelize_1.QueryTypes.SELECT,
        replacements: { userId },
    });
    const purchasesMap = {};
    purchasesWithProducts.forEach((purchase) => {
        const { purchase_id, total, purchase_date, calle, numero, ciudad, cp, product_id, product_name, cantidad, } = purchase;
        if (!purchasesMap[purchase_id]) {
            purchasesMap[purchase_id] = {
                purchase_id,
                total,
                purchase_date,
                calle,
                numero,
                ciudad,
                cp,
                products: [],
            };
        }
        purchasesMap[purchase_id].products.push({ product_id, product_name, cantidad });
    });
    return Object.values(purchasesMap);
});
exports.getUserPurchases = getUserPurchases;
