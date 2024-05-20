import { Envio } from "../models/envio";

export const createEnvio = async ({ name, surname, calle, numero, ciudad, pais, cp}: any) => {
    try {

        // Introducir la direccion de envio
        const newEnvio = await Envio.create({
            name: name,
            surname: surname,
            calle: calle,
            numero: numero,
            ciudad: ciudad,
            pais: pais,
            cp: cp
        });

        return newEnvio;
    } catch (error) {
        throw new Error('Error al crear envio: ' + error);

    }
};
