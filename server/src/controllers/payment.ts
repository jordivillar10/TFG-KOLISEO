import { Response, Request } from 'express';
// import { createEnvio } from "../repositories/envioRepository";
import Stripe from "stripe";
import { Purchase } from '../models/purchase';
import {Envio} from '../models/envio';
import { PurchaseProducts } from '../models/purchaseproducts';
import { getUserPurchases } from '../repositories/purchaseRepository';
// import { Envio } from '../models/envio';

const stripe = new Stripe('sk_test_51PHOSuDJExqBi5rhXletOD60IRNjaIaynn0sTH5np0DZPkHtVUc8prsSpICOD8jNLQjhrzHjGBpTyKykynlR7h670082yVlkGe');

export const createSession = async(req: Request, res: Response) => {
    try {
        // const cart = req.body.cart
        const { cart, user_id, name, surname, calle, numero, ciudad, pais, cp } = req.body;

        console.log('Carrito recibido en backend:', cart); 
        // console.log('Carrito recibido en backend:', user_id); 
        
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

        const totalQuantity = cart.reduce((total: number, product: { cantidad: number }) => total + product.cantidad, 0);

        const encodedName = encodeURIComponent(name);
        const encodedSurname = encodeURIComponent(surname);
        const encodedCalle = encodeURIComponent(calle);
        const encodedNumero = encodeURIComponent(numero);
        const encodedCiudad = encodeURIComponent(ciudad);
        const encodedPais = encodeURIComponent(pais);
        const encodedCp = encodeURIComponent(cp);
        const successUrl = `https://koliseo.duckdns.org/compra-hecha?session_id={CHECKOUT_SESSION_ID}&user_id=${user_id}&name=${encodedName}&surname=${encodedSurname}&calle=${encodedCalle}&numero=${encodedNumero}&ciudad=${encodedCiudad}&pais=${encodedPais}&cp=${encodedCp}&totalQuantity=${totalQuantity}`;
        // creo la sesión de Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successUrl,
            cancel_url: 'https://koliseo.duckdns.org/direccion-envio',
            metadata: {
                user_id: user_id,
                cart: JSON.stringify(cart)
            }
        });
        return res.json({ id: session.id, url: session.url });
    }catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'No se pudo crear la sesión de pago' });
    }
}

export const handleSuccess = async (req: Request, res: Response) => {
    const { session_id, user_id, name, surname, calle, numero, ciudad, pais, cp, totalQuantity } = req.query;

    if (!session_id) {
        return res.status(400).send('No session ID provided');
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id as string);
        // const customer = await stripe.customers.retrieve(session.customer as string);
       

        const cart = JSON.parse(session.metadata!.cart as string);

        const newPurchase = await Purchase.create({
            user_id: user_id as string,
            purchase_date: new Date(),
            total: session.amount_total! / 100,
            cantidad: totalQuantity
        });

        const purchaseproducts = cart.map((product: { id: number, cantidad: number, price: number }) => ({
            product_id: product.id,
            cantidad: product.cantidad,
            price: product.price,
            purchase_id: newPurchase.id,
        }));

        await PurchaseProducts.bulkCreate(purchaseproducts);

        const newEnvio = await Envio.create({
            name: name as string,
            surname: surname as string,
            calle: calle as string,
            numero: numero as string,
            ciudad: ciudad as string,
            pais: pais as string,
            cp: cp as string,
            user_id: user_id as string,
            purchase_id: newPurchase.id
        });

        return res.status(200).send('Purchase and shipment created successfully');
    } catch (error) {
        console.error('Error handling success:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const getUserPurchasesController = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id, 10);
  
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
  
    try {
      const purchases = await getUserPurchases(userId);
      res.json(purchases);
    } catch (error) {
      console.error('Error fetching user purchases:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

