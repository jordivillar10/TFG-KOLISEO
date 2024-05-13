import {Request, Response} from 'express';
import bcrypt from "bcrypt";
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {

    const { name, surname, email, password } = req.body;

    //validamos si el usuario ya existe en la db
    const user = await User.findOne({where: { email: email } })

    if (user) {
        return res.status(400).json({
            msg: `Ya existe una cuenta con el correo ${email}`
        })
    }
    //securizamos la passwd
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        //guardamos usuario en la base de datos
        await User.create({
            name: name,
            surname: surname,
            email: email,
            password: hashedPassword
        })
    
        res.json({
            msg: `Usuario ${email} creado exitosamente!`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upss ocurrio un error',
            error
        })
    }

}

export const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    
    try {
        //Validamos si el usuario existe en la db
        const user: any = await User.findOne({where: { email: email } })

        if(!user){
            return res.status(400).json({
                msg: `No existe un usuario con el correo ${email}`
            })
        }

        //Validamos password
        const passwordValid = await bcrypt.compare(password, user.password)
        if(!passwordValid) {
            return res.status(400).json({
                msg: `Password Incorrecta`
            })
        }
        

        //Generamos token
        const token = jwt.sign({
            email: email
        }, process.env.SECRET_KEY || 'pepito123');

        res.json({token, user});
    } catch (error: any) {
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error.message
        });
    }
}

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const userId = req.userId; // Suponiendo que `userId` está disponible en la solicitud después de pasar por el middleware de autenticación

        const user: any = await User.findByPk(userId); // Obtener el usuario por su ID

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Aquí puedes devolver toda la información del usuario o seleccionar campos específicos según tus necesidades
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
    }
};

