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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnvio = void 0;
const envio_1 = require("../models/envio");
const createEnvio = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, surname, calle, numero, ciudad, pais, cp }) {
    try {
        // Introducir la direccion de envio
        const newEnvio = yield envio_1.Envio.create({
            name: name,
            surname: surname,
            calle: calle,
            numero: numero,
            ciudad: ciudad,
            pais: pais,
            cp: cp
        });
        return newEnvio;
    }
    catch (error) {
        throw new Error('Error al crear envio: ' + error);
    }
});
exports.createEnvio = createEnvio;
