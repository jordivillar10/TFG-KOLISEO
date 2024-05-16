import { User } from "../models/user";
import bcrypt from "bcrypt";

export const createUser = async ({ name, surname, email, password }: any) => {
    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            throw new Error(`Ya existe una cuenta con el correo ${email}`);
        }
        // if (user) {
        //     return res.status(400).json({
        //         msg: `Ya existe una cuenta con el correo ${email}`
        //     })
        // }
        // securizamos Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = await User.create({
            name: name,
            surname: surname,
            email: email,
            password: hashedPassword
        });

        return newUser;
    } catch (error) {
        throw new Error('Error al crear usuario: ' + error);
        // res.status(400).json({
        //     msg: 'Upss ocurrio un error',
        //     error
        // })
    }
};

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