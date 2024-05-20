"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var product_1 = require("../controllers/product");
var router = (0, express_1.Router)();
router.get('/', /*validateToken*/ product_1.getProducts);
exports.default = router;
