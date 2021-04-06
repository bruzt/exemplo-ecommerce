import { Request, Response } from 'express';

import OrderModel from '../../models/OrderModel';

interface IAny {
    [key: string]: any;
}

export default async function list(req: Request, res: Response) {

    const { id } = req.tokenPayload;
    
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const offset = req.query.offset ? Number(req.query.offset) : undefined;

    try {

        const [ orders, count ] = await OrderModel.findAndCount(
            {
            where: {
                user_id: Number(id),
            },
            take: limit, 
            skip: offset,
           
            order: { id: 'DESC' },
            relations: [
                'address', 
                'ordersProducts', 
                'ordersProducts.product', 
                'ordersProducts.product.images'
            ],
            withDeleted: true,
        });

        const serializedOrders = orders.map( (order) => {

            const products = order.ordersProducts?.map( (orderProduct) => {
                
                const productCopy: IAny = { ...orderProduct.product };

                const orderProductCopy = { ...orderProduct };
                delete orderProductCopy.product;

                productCopy.orders_products = orderProductCopy;

                return productCopy;
            });

            const orderCopy: IAny = { ...order };
            delete orderCopy.ordersProducts;
            orderCopy.products = products;

            orderCopy.createdAt = orderCopy.created_at;
            delete orderCopy.created_at;

            return orderCopy;
        });

        return res.json({ count, orders: serializedOrders });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
