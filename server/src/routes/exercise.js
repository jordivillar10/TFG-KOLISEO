"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var excercises_1 = require("../controllers/excercises");
var router = (0, express_1.Router)();
router.get('/', /*validateToken*/ excercises_1.getExercises);
exports.default = router;
