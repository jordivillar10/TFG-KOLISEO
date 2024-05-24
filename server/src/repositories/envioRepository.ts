import { Envio } from "../models/envio";

export const createEnvio = async ({ name, surname, calle, numero, ciudad, pais, cp, user_id, purchase_id}: any) => {
    try {

        // Introducir la direccion de envio
        const newEnvio = await Envio.create({
            name: name,
            surname: surname,
            calle: calle,
            numero: numero,
            ciudad: ciudad,
            pais: pais,
            cp: cp,
            user_id: user_id,
            purchase_id: purchase_id
        });

        return newEnvio;
    } catch (error) {
        throw new Error('Error al crear envio: ' + error);

    }
};
