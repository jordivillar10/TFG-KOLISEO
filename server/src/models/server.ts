import express, { Application } from 'express';
import routesProduct from "../routes/product";
import routesUser from "../routes/user";
import routesExercise from "../routes/exercise"
import { Product } from "./product";
import { User } from "./user";
import cors from "cors";
import { Exercise } from './excercise';

import swaggerUi from 'swagger-ui-express';
import specs from '../swaggerConfig'; // Ruta al archivo de configuración de Swagger

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
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/exercises', routesExercise);
    }

    midlewares() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
        //Parseo body   
        this.app.use(express.json());

        //Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await Product.sync()
            await User.sync()
            await Exercise.sync()
        } catch (error) {
            console.error('No se pudo conectar a la base de datos:', error);
        }
    }
}

export default Server;