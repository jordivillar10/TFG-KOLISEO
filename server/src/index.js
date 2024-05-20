"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var dotenv_1 = require("dotenv");
var server_1 = require("./models/server");
// Configuramos dotenv
dotenv_1.default.config();
exports.server = new server_1.default();
// Exporta STRIPER_PRIVATE_KEY
