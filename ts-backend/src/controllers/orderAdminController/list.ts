import { Request, Response } from 'express';

import OrderModel from '../../models/OrderModel';

export default async function list(req: Request, res: Response) {

    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const offset = req.query.offset ? Number(req.query.offset) : undefined;

    try {

        const [ orders, count ] = await OrderModel.findAndCount({
            order: {
                id: 'DESC'
            },
            take: limit,
            skip: offset,
            relations: ['ordersProducts', 'ordersProducts.product'],
        })
    
        return res.json({ count, orders });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
