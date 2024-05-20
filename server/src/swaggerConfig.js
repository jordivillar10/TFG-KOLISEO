"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_jsdoc_1 = require("swagger-jsdoc");
var options = {
    swaggerDefinition: {
        info: {
            title: 'whatever',
            version: '1.0.0',
            description: 'Descripción de tu whatever',
        },
    },
    apis: ['./routes/*.ts'], // Rutas de tu API
};
var specs = (0, swagger_jsdoc_1.default)(options);
exports.default = specs;
