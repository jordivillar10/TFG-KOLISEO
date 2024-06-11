"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const exercise_1 = __importDefault(require("../routes/exercise"));
const message_1 = __importDefault(require("../routes/message"));
const product_2 = require("./product");
const user_2 = require("./user");
const cors_1 = __importDefault(require("cors"));
const excercise_1 = require("./excercise");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = __importDefault(require("../swaggerConfig")); // Ruta al archivo de configuración de Swagger
const payments_1 = __importDefault(require("../routes/payments"));
const envio_1 = require("./envio");
const purchase_1 = require("./purchase");
const purchaseproducts_1 = require("./purchaseproducts");
// import { ExercisesEntramiento } from './exercisesentrenamiento';
const entrenamientos_1 = require("./entrenamientos");
const serie_1 = require("./serie");
require("../mail");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.send('Bienvenido a la API');
        });
        this.app.use('/api/products', product_1.default);
        this.app.use('/api/users', user_1.default, message_1.default);
        this.app.use('/api/exercises', exercise_1.default);
        this.app.use('/api/payment', payments_1.default);
    }
    midlewares() {
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.default));
        //Parseo body   
        this.app.use(express_1.default.json());
        //Cors
        this.app.use((0, cors_1.default)());
        //middleware de autenticación
        // this.app.use(this.authMiddleware);
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_2.Product.sync();
                yield user_2.User.sync();
                yield excercise_1.Exercise.sync();
                yield purchase_1.Purchase.sync();
                yield envio_1.Envio.sync();
                yield purchaseproducts_1.PurchaseProducts.sync();
                yield entrenamientos_1.Entrenamiento.sync();
                // await ExercisesEntramiento.sync()
                yield serie_1.Serie.sync();
            }
            catch (error) {
                console.error('No se pudo conectar a la base de datos:', error);
            }
        });
    }
}
exports.default = Server;
