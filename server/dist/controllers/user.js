"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const user_1 = require("../models/user");
const userRepository_1 = require("../repositories/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, surname, email, password } = req.body;
        const newUser = yield (0, userRepository_1.createUser)({ name, surname, email, password });
        res.json({
            msg: `Usuario ${email} creado exitosamente!`
        });
        return res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upss ocurrio un error',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //Validamos si el usuario existe en la db
        const user = yield user_1.User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({
                msg: `No existe un usuario con el correo ${email}`
            });
        }
        //Validamos password
        const passwordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: `Password Incorrecta`
            });
        }
        // Generamos token
        const token = jsonwebtoken_1.default.sign({
            email: email
        }, process.env.SECRET_KEY || 'pepito123');
        res.json({ token, user });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error.message
        });
    }
});
exports.loginUser = loginUser;
