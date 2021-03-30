import { Request, Response } from 'express';

import OrderModel from '../../models/OrderModel';

export default async function list(req: Request, res: Response) {

    const { userId } = req.tokenPayload;
    
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const offset = req.query.offset ? Number(req.query.offset) : undefined;

    try {

        const [ orders, count ] = await OrderModel.findAndCount(
            {
            where: {
                user_id: Number(userId),
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

        return res.json({ count, orders });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
