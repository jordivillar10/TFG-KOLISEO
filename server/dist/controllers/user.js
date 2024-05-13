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
exports.getUserInfo = exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname, email, password } = req.body;
    //validamos si el usuario ya existe en la db
    const user = yield user_1.User.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe una cuenta con el correo ${email}`
        });
    }
    //securizamos la passwd
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        //guardamos usuario en la base de datos
        yield user_1.User.create({
            name: name,
            surname: surname,
            email: email,
            password: hashedPassword
        });
        res.json({
            msg: `Usuario ${email} creado exitosamente!`
        });
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
        //Generamos token
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
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId; // Suponiendo que `userId` está disponible en la solicitud después de pasar por el middleware de autenticación
        const user = yield user_1.User.findByPk(userId); // Obtener el usuario por su ID
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        // Aquí puedes devolver toda la información del usuario o seleccionar campos específicos según tus necesidades
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
    }
});
exports.getUserInfo = getUserInfo;
