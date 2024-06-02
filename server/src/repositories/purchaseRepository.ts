import { QueryTypes } from 'sequelize';
import sequelize from '../db/connection';

interface Product {
  product_id: number;
  product_name: string;
  cantidad: number;
}

interface PurchaseWithProducts {
  purchase_id: number;
  total: number;
  purchase_date: Date;
  calle: string;
  numero: string;
  ciudad: string;
  cp: string;
  products: Product[];
}

export const getUserPurchases = async (userId: number): Promise<PurchaseWithProducts[]> => {
  const purchasesWithProducts = await sequelize.query(
    `
    SELECT 
      pu.id AS purchase_id,
      pu.total,
      pu.purchase_date,
      e.calle,
      e.numero,
      e.ciudad,
      e.cp,
      p.id AS product_id,
      p.name AS product_name,
      pp.cantidad
      FROM purchases pu
      JOIN envios e ON pu.id = e.purchase_id
      JOIN purchaseproducts pp ON pu.id = pp.purchase_id
      JOIN products p ON pp.product_id = p.id
      WHERE pu.user_id = :userId
    `,
    {
      type: QueryTypes.SELECT,
      replacements: { userId },
    }
  );

  const purchasesMap: { [key: number]: PurchaseWithProducts } = {};

  purchasesWithProducts.forEach((purchase: any) => {
    const {
      purchase_id,
      total,
      purchase_date,
      calle,
      numero,
      ciudad,
      cp,
      product_id,
      product_name,
      cantidad,
    } = purchase;

    if (!purchasesMap[purchase_id]) {
      purchasesMap[purchase_id] = {
        purchase_id,
        total,
        purchase_date,
        calle,
        numero,
        ciudad,
        cp,
        products: [],
      };
    }

    purchasesMap[purchase_id].products.push({ product_id, product_name, cantidad });
  });

  return Object.values(purchasesMap);
};
