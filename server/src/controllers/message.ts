import { Response, Request } from 'express';
import { enviarCorreo } from '../mail';

export const mandarCorreo = async(req: Request, res: Response): Promise<void> => {
    const formulario = req.body;

  try {
    const info = await enviarCorreo(formulario);
    console.log(info);
    res.status(200).send({ message: 'Correo enviado correctamente', info });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error al enviar el correo', error: err });
  }
}