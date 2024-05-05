"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        info: {
            title: 'whatever',
            version: '1.0.0',
            description: 'Descripción de tu whatever',
        },
    },
    apis: ['./routes/*.ts'], // Rutas de tu API
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.default = specs;
