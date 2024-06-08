import  nodemailer  from "nodemailer";

interface Formulario {
    name: string;
    email: string;
    asunto: string;
    message: string;
  }
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'koliseogym@gmail.com', // Cambia esto por tu email
      pass: 'k u z d g i q d s l g s cr l z' // Cambia esto por tu password
    }
  });

  export const enviarCorreo = (formulario: Formulario) => {
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
