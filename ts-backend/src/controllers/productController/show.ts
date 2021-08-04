import { Request, Response } from 'express';
import { Any, MoreThan } from 'typeorm';

import ProductModel from '../../models/ProductModel';
import OrderProductModel from '../../models/OrderProductModel';

function SortElemByFrequency(arr: string[]) {
    const frequency: { [key: string]: number } = arr.reduce((obj, curr) => {
        //@ts-ignore
        obj[curr] = (obj[curr] || 0) + 1;
        return obj;
    }, {});
    //@ts-ignore
    return [...new Set(Object.entries(frequency).sort((a, b) => b[1] - a[1]).flatMap(item => Array(item[1]).fill(item[0])))];
}

export default async function show(req: Request, res: Response) {

    const { id } = req.params;

    try {

        const product = await ProductModel.findOne(id, {
            relations: ['category', 'images']
        });

        if (!product) return res.status(404).json({ message: 'product not found' });

        // get ordersProducts who buyed this product
        const ordersProducts = await OrderProductModel.find({
            where: {
                product_id: product.id,
            },
        });

        // get order ids that have buyed this product
        const orderIds = ordersProducts.map((orderProduct) => orderProduct.order_id);

        // get ordersProducts who buyed this product but with other products
        const ordersProductsByOrderId = await OrderProductModel.find({
            where: {
                order_id: Any(orderIds),
            },
        });

        // get products ids
        const productsIds = ordersProductsByOrderId.map((orderProductByOrderId) => orderProductByOrderId.product_id);

        // remove this product id
        const buyedWithProductsIds = productsIds.filter((productsId) => productsId != product.id);

        // cast ids to string
        const buyedWithProductsIdsAsString = buyedWithProductsIds.map((buyedWithProductsId) => String(buyedWithProductsId));

        // sort by frequency
        const sortedIds = SortElemByFrequency(buyedWithProductsIdsAsString);

        // get products thas was most buyed with this product
        const productsBuyedWith: ProductModel[] = [];
        for (const sortedId of sortedIds) {
            const productBuyedWith = await ProductModel.findOne({
                where: {
                    id: sortedId,
                    quantity_stock: MoreThan(0),
                },
            });
            if (productBuyedWith) productsBuyedWith.push(productBuyedWith);
            if (productsBuyedWith.length == 4) break;
        }

        return res.json({ product, productsBuyedWith });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
