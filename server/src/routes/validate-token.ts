import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: { id: number }; // Define the 'user' property
}

const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log('validate token');
    const headerToken = req.headers['authorization'];
    
    if (headerToken && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7);
            const decodedToken = jwt.verify(bearerToken, process.env.SECRET_KEY || 'pepito123') as { id: number };
            req.user = { id: decodedToken.id }; // Agrega el ID del usuario al objeto req
            next();
        } catch (error) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }
    } else {
        next();
    }
};


export default validateToken;