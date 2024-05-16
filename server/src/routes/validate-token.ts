import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    console.log('validate token')
    const headerToken = req.headers['authorization']
    
    
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //tiene token 
        try {
            
            const bearerToken = headerToken.slice(7);
            
            const decodedToken = jwt.verify(bearerToken, process.env.SECRET_KEY || 'pepito123') as { id: number };
            // req.user = { id: decodedToken.id };
            next();
            
        } catch (error) {
            res.status(401).json ({
                msg: 'Token no válido'
            })
        }

    } else {
        // res.status(401).json({
        //     msg: "Acceso Denegado"
        // })
        next();
    }

}

export default validateToken;