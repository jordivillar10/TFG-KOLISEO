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
exports.createUser = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, surname, email, password }) {
    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = yield user_1.User.findOne({ where: { email: email } });
        if (existingUser) {
            throw new Error(`Ya existe una cuenta con el correo ${email}`);
        }
        // if (user) {
        //     return res.status(400).json({
        //         msg: `Ya existe una cuenta con el correo ${email}`
        //     })
        // }
        // securizamos Hash de la contraseña
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Crear un nuevo usuario
        const newUser = yield user_1.User.create({
            name: name,
            surname: surname,
            email: email,
            password: hashedPassword
        });
        return newUser;
    }
    catch (error) {
        throw new Error('Error al crear usuario: ' + error);
        // res.status(400).json({
        //     msg: 'Upss ocurrio un error',
        //     error
        // })
    }
});
exports.createUser = createUser;
// export const getUserInfo = async (userId: number) => {
//     try {
//         const user = await User.findByPk(userId);
//         if(!user) {
//             return null
//         }
//         return user;
//     }catch(error) {
//         throw new Error("Error al obtener información del usuario:" + error);
//     }
// }
