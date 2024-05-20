import { Response, Request } from 'express';
import { createEnvio } from "../repositories/envioRepository";
import Stripe from "stripe";

const stripe = new Stripe('sk_test_51PHOSuDJExqBi5rhXletOD60IRNjaIaynn0sTH5np0DZPkHtVUc8prsSpICOD8jNLQjhrzHjGBpTyKykynlR7h670082yVlkGe');

export const createSession = async(req: Request, res: Response) => {
    try {
        const cart = req.body.cart
        console.log('Carrito recibido en backend:', cart); 
        
        if (!cart || !Array.isArray(cart)) {
            return res.status(400).json({ error: 'Carrito inválido' });
          }

        const lineItems = cart.map((product: { name: string; cantidad: number; price: number }) => ({
            price_data: {
                currency: 'eur',
                unit_amount: Math.round(product.price * 100), // Convertir el precio a centimos
                product_data: {
                    name: product.name,
                },
            },
            quantity: product.cantidad,
        }));
        // creo la sesión de Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:4200/inicioTienda',
            cancel_url: 'http://localhost:4200/direccion-envio',
        });

        // Envía la URL de la sesión a tu cliente
        return res.json({ id: session.id, url: session.url });
    }catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'No se pudo crear la sesión de pago' });
    }
}
    export const newEnvio = async (req: Request, res: Response) => {
        try {
            const {name, surname, calle, numero, ciudad, pais, cp} = req.body

            const newEnvio = await createEnvio({name, surname, calle, numero, ciudad, pais, cp});



             res.status(201).json(newEnvio);
            }catch (error) {
            res.status(400).json({
                msg: 'Upss ocurrio un error',
                error
            });
        }
    }
