import {Request, Response} from 'express';
import { User } from '../models/user';
import { createUser } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const newUser = async (req: Request, res: Response) => {
    try {
    const { name, surname, email, password } = req.body;

    const newUser = await createUser({ name, surname, email, password });
    
    res.json({
        msg: `Usuario ${email} creado exitosamente!`
    })
    return res.status(201).json(newUser);
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
        
        // Generamos token
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

