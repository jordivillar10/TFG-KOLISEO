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
exports.getUserPurchasesController = exports.handleSuccess = exports.createSession = void 0;
// import { createEnvio } from "../repositories/envioRepository";
const stripe_1 = __importDefault(require("stripe"));
const purchase_1 = require("../models/purchase");
const envio_1 = require("../models/envio");
const purchaseproducts_1 = require("../models/purchaseproducts");
const purchaseRepository_1 = require("../repositories/purchaseRepository");
// import { Envio } from '../models/envio';
const stripe = new stripe_1.default('sk_test_51PHOSuDJExqBi5rhXletOD60IRNjaIaynn0sTH5np0DZPkHtVUc8prsSpICOD8jNLQjhrzHjGBpTyKykynlR7h670082yVlkGe');
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const cart = req.body.cart
        const { cart, user_id, name, surname, calle, numero, ciudad, pais, cp } = req.body;
        console.log('Carrito recibido en backend:', cart);
        // console.log('Carrito recibido en backend:', user_id); 
        if (!cart || !Array.isArray(cart)) {
            return res.status(400).json({ error: 'Carrito inválido' });
        }
        const lineItems = cart.map((product) => ({
            price_data: {
                currency: 'eur',
                unit_amount: Math.round(product.price * 100), // Convertir el precio a centimos
                product_data: {
                    name: product.name,
                },
            },
            quantity: product.cantidad,
        }));
        const totalQuantity = cart.reduce((total, product) => total + product.cantidad, 0);
        const encodedName = encodeURIComponent(name);
        const encodedSurname = encodeURIComponent(surname);
        const encodedCalle = encodeURIComponent(calle);
        const encodedNumero = encodeURIComponent(numero);
        const encodedCiudad = encodeURIComponent(ciudad);
        const encodedPais = encodeURIComponent(pais);
        const encodedCp = encodeURIComponent(cp);
        const successUrl = `http://koliseo.duckdns.org/compra-hecha?session_id={CHECKOUT_SESSION_ID}&user_id=${user_id}&name=${encodedName}&surname=${encodedSurname}&calle=${encodedCalle}&numero=${encodedNumero}&ciudad=${encodedCiudad}&pais=${encodedPais}&cp=${encodedCp}&totalQuantity=${totalQuantity}`;
        // creo la sesión de Stripe
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successUrl,
            cancel_url: 'http://koliseo.duckdns.org/direccion-envio',
            metadata: {
                user_id: user_id,
                cart: JSON.stringify(cart)
            }
        });
        return res.json({ id: session.id, url: session.url });
    }
    catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'No se pudo crear la sesión de pago' });
    }
});
exports.createSession = createSession;
const handleSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { session_id, user_id, name, surname, calle, numero, ciudad, pais, cp, totalQuantity } = req.query;
    if (!session_id) {
        return res.status(400).send('No session ID provided');
    }
    try {
        const session = yield stripe.checkout.sessions.retrieve(session_id);
        // const customer = await stripe.customers.retrieve(session.customer as string);
        const cart = JSON.parse(session.metadata.cart);
        const newPurchase = yield purchase_1.Purchase.create({
            user_id: user_id,
            purchase_date: new Date(),
            total: session.amount_total / 100,
            cantidad: totalQuantity
        });
        const purchaseproducts = cart.map((product) => ({
            product_id: product.id,
            cantidad: product.cantidad,
            price: product.price,
            purchase_id: newPurchase.id,
        }));
        yield purchaseproducts_1.PurchaseProducts.bulkCreate(purchaseproducts);
        const newEnvio = yield envio_1.Envio.create({
            name: name,
            surname: surname,
            calle: calle,
            numero: numero,
            ciudad: ciudad,
            pais: pais,
            cp: cp,
            user_id: user_id,
            purchase_id: newPurchase.id
        });
        return res.status(200).send('Purchase and shipment created successfully');
    }
    catch (error) {
        console.error('Error handling success:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.handleSuccess = handleSuccess;
const getUserPurchasesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.user_id, 10);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }
    try {
        const purchases = yield (0, purchaseRepository_1.getUserPurchases)(userId);
        res.json(purchases);
    }
    catch (error) {
        console.error('Error fetching user purchases:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getUserPurchasesController = getUserPurchasesController;
