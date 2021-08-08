import { Request, Response } from 'express';
import { In, MoreThan } from 'typeorm';

import ProductModel from '../../models/ProductModel';
import OrderProductModel from '../../models/OrderProductModel';

function SortIdsByFrequency(arr: number[]) {
    const frequency = arr.reduce<{ [key: string]: number }>((obj, curr) => {
        obj[curr] = (obj[curr] || 0) + 1;
        return obj;
    }, {});
    const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    const uniqueIds = sorted.map((id) => id[0])
    return uniqueIds.map(Number);
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
                order_id: In(orderIds),
            },
        });

        // get products ids
        const productsIds = ordersProductsByOrderId.map((orderProductByOrderId) => orderProductByOrderId.product_id);

        // remove this product id
        const buyedWithProductsIds = productsIds.filter((productsId) => productsId != product.id);

        // sort by frequency
        const sortedIds = SortIdsByFrequency(buyedWithProductsIds);

        // get products thas was most buyed with this product
        const productsBuyedWith = await ProductModel.find({
            where: {
                id: In(sortedIds.splice(0,8)),
                quantity_stock: MoreThan(0),
            },
            relations: ['category', 'images'],
            take: 4,
        });

        /*const productsBuyedWith: ProductModel[] = [];
        for (const sortedId of sortedIds) {
            const productBuyedWith = await ProductModel.findOne({
                where: {
                    id: sortedId,
                    quantity_stock: MoreThan(0),
                },
                relations: ['category', 'images'],
            });
            if (productBuyedWith) productsBuyedWith.push(productBuyedWith);
            if (productsBuyedWith.length == 4) break;
        }*/

        return res.json({ product, productsBuyedWith });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
