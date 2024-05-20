"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../controllers/user");
var validate_token_1 = require("./validate-token");
var router = (0, express_1.Router)();
router.post('/', user_1.newUser);
router.post('/login', validate_token_1.default, user_1.loginUser);
exports.default = router;
