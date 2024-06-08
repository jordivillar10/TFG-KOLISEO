"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_1 = require("../controllers/message");
const router = (0, express_1.Router)();
router.post('/contactanos', message_1.mandarCorreo);
exports.default = router;
