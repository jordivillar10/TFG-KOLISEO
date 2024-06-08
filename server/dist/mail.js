"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarCorreo = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'koliseogym@gmail.com', // Cambia esto por tu email
        pass: 'k u z d g i q d s l g s cr l z' // Cambia esto por tu password
    }
});
const enviarCorreo = (formulario) => {
    const mailOptions = {
        from: `"${formulario.name} " <${formulario.email}>`,
        to: 'koliseogym@gmail.com', // Cambia esta parte por el destinatario
        subject: formulario.asunto,
        html: `
        <strong>Nombre:</strong> ${formulario.name} <br/>
        <strong>Email:</strong> ${formulario.email} <br/>
        <strong>Mensaje:</strong> ${formulario.message}
      `
    };
    return transporter.sendMail(mailOptions);
};
exports.enviarCorreo = enviarCorreo;
