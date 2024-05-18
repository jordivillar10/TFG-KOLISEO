"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { createSession } from "../controllers/payment";
const router = (0, express_1.Router)();
// router.get("/create-checkout-session", createSession);
router.get("/success", (req, res) => res.send("success"));
router.get("/cancel", (req, res) => res.send("cancel"));
exports.default = router;
