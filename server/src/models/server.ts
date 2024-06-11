require("dotenv").config()
import https from 'https';
import fs from 'fs';
import express, { Application, Request, Response } from 'express';
import routesProduct from "../routes/product";
import routesUser from "../routes/user";
import routesExercise from "../routes/exercise"
import routesMessage from "../routes/message"
import { Product } from "./product";
import { User } from "./user";
import cors from "cors";
import { Exercise } from './excercise';
import swaggerUi from 'swagger-ui-express';
import specs from '../swaggerConfig'; // Ruta al archivo de configuración de Swagger
import  routesPayment  from "../routes/payments";
import { Envio } from './envio';
import { Purchase } from './purchase';
import { PurchaseProducts } from './purchaseproducts';
// import { ExercisesEntramiento } from './exercisesentrenamiento';
import { Entrenamiento } from './entrenamientos';
import { Serie } from './serie';
import "../mail";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen(); 
        this.midlewares();  
        this.routes();
        this.dbConnect();
    }

    listen() {
        const privateKey = fs.readFileSync('/etc/letsencrypt/live/koliseobackend.duckdns.org/privkey.pem', 'utf8');
        const certificate = fs.readFileSync('/etc/letsencrypt/live/koliseobackend.duckdns.org/cert.pem', 'utf8');
        const ca = fs.readFileSync('/etc/letsencrypt/live/koliseobackend.duckdns.org/fullchain.pem', 'utf8');

        const credentials = { key: privateKey, cert: certificate, ca: ca };

        const httpsServer = https.createServer(credentials, this.app);
        httpsServer.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto ' + this.port);
        });
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Bienvenido a la API');
        });

        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser, routesMessage);
        this.app.use('/api/exercises', routesExercise);
        this.app.use('/api/payment', routesPayment);
    }

    midlewares() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
        //Parseo body   
        this.app.use(express.json());
        //Cors
        this.app.use(cors());
        //middleware de autenticación
        // this.app.use(this.authMiddleware);
    }

    async dbConnect() {
        try {
            await Product.sync()
            await User.sync()
            await Exercise.sync()
            await Purchase.sync()
            await Envio.sync()
            await PurchaseProducts.sync()
            await Entrenamiento.sync()
            // await ExercisesEntramiento.sync()
            await Serie.sync()
        } catch (error) {
            console.error('No se pudo conectar a la base de datos:', error);
        }
    }

    // authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    //     const headerToken = req.headers['authorization']

    //     if (!headerToken) {
    //         return res.status(401).json({ msg: 'Token no proporcionado' });
    //     }
    //     try {
    //         const bearerToken = headerToken.slice(7);
    //         const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY || 'pepito123') as JwtPayload;
    //         req.user = decoded.user; // Agregar el usuario decodificado al objeto req para que las rutas posteriores puedan acceder a él
    //         next();
    //     } catch (error) {
    //         return res.status(401).json({ msg: 'Token no válido' });
    //     }
    // }
}

export default Server;