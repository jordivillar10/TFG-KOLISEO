"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var validateToken = function (req, res, next) {
    console.log('validate token');
    var headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //tiene token 
        try {
            var bearerToken = headerToken.slice(7);
            var decodedToken = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'pepito123');
            // req.user = { id: decodedToken.id };
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'Token no válido'
            });
        }
    }
    else {
        // res.status(401).json({
        //     msg: "Acceso Denegado"
        // })
        next();
    }
};
exports.default = validateToken;
