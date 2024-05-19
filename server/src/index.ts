import dotenv from 'dotenv';
import Server from './models/server';
// Configuramos dotenv
dotenv.config();

export const server = new Server();


// Exporta STRIPER_PRIVATE_KEY

