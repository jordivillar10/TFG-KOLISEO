"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_1 = require("../controllers/payment");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.post("/create-checkout-session", validate_token_1.default, payment_1.createSession);
router.get("/success", payment_1.handleSuccess);
router.get("/cancel", (req, res) => res.send('https://44.201.148.171/direccion-envio'));
// router.get("/cancel", (req,res) => res.send('http://localhost:4200/direccion-envio'));
exports.default = router;
