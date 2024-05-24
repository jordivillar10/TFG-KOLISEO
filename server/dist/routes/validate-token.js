"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    console.log('validate token');
    const headerToken = req.headers['authorization'];
    if (headerToken && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7);
            const decodedToken = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'pepito123');
            req.user = { id: decodedToken.id }; // Agrega el ID del usuario al objeto req
            next();
        }
        catch (error) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }
    }
    else {
        next();
    }
};
exports.default = validateToken;
