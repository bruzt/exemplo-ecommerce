import { Request, Response } from 'express';

import ProductModel from '../../models/ProductModel';

export default async function show(req: Request, res: Response) {

    const { id } = req.params;

    try {

        const product = await ProductModel.findOne(id, {
            relations: ['category', 'images']
        });

        if(!product) return res.status(404).json({ message: 'product not found' });

        return res.json(product);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
