import { QueryTypes } from 'sequelize';
import sequelize from '../db/connection';

interface UserPurchase {
    product_id: number;
    product_name: string;
    cantidad: number;
    purchase_date: Date;
    total: number;
    purchase_id: number;
    calle: string;
    numero: string;
    ciudad: string;
    cp: string;
}

export async function getUserPurchases(userId: number): Promise<UserPurchase[]> {
    const query = `
        SELECT p.id AS product_id, p.name AS product_name, pu.cantidad, pu.purchase_date, pu.total, pu.id as purchase_id, e.calle, e.numero, e.ciudad, e.cp
        FROM users u
        JOIN purchases pu ON u.id = pu.user_id
        JOIN envios e ON pu.id = e.purchase_id
        JOIN purchaseproducts pp ON pu.id = pp.purchase_id
        JOIN products p ON pp.product_id = p.id
        WHERE u.id = :userId;
    `;

    const purchases = await sequelize.query<UserPurchase>(query, {
        replacements: { userId },
        type: QueryTypes.SELECT,
    });

    return purchases;
}
