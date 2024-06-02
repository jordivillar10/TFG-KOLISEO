"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validate_token_1 = __importDefault(require("./validate-token"));
const payment_1 = require("../controllers/payment");
const excercises_1 = require("../controllers/excercises");
const router = (0, express_1.Router)();
router.post('/', user_1.newUser);
router.get('/', validate_token_1.default);
router.post('/login', validate_token_1.default, user_1.loginUser);
router.get('/:user_id/purchases', payment_1.getUserPurchasesController);
router.get('/:user_id/workouts', excercises_1.getUserWorkoutsController);
exports.default = router;
