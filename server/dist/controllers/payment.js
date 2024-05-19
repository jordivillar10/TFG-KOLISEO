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
exports.createSession = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51PHOSuDJExqBi5rhXletOD60IRNjaIaynn0sTH5np0DZPkHtVUc8prsSpICOD8jNLQjhrzHjGBpTyKykynlR7h670082yVlkGe');
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = req.body.cart;
        console.log('Carrito recibido en backend:', cart);
        if (!cart || !Array.isArray(cart)) {
            return res.status(400).json({ error: 'Carrito inválido' });
        }
        const lineItems = cart.map((product) => ({
            price_data: {
                currency: 'eur',
                unit_amount: Math.round(product.price * 100), // Convertir el precio a centavos
                product_data: {
                    name: product.name,
                    // Otros datos del producto
                },
            },
            quantity: product.cantidad,
        }));
        // creo la sesión de Stripe
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3001/api/payment/success',
            cancel_url: 'http://localhost:3001/api/payment/cancel',
        });
        // Envía la URL de la sesión a tu cliente
        return res.json({ id: session.id, url: session.url });
    }
    catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'No se pudo crear la sesión de pago' });
    }
});
exports.createSession = createSession;
