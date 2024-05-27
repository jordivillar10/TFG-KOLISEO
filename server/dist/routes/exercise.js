"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const excercises_1 = require("../controllers/excercises");
const router = (0, express_1.Router)();
router.get('/', /*validateToken*/ excercises_1.getExercises);
router.post('/entrenamiento', excercises_1.saveTrain);
exports.default = router;
