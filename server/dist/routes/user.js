"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.post('/', user_1.newUser);
router.post('/login', user_1.loginUser);
router.get('/', validate_token_1.default, user_1.getUserInfo);
exports.default = router;
