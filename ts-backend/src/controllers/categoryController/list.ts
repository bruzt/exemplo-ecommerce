import { Request, Response } from 'express';

import CategoryModel from '../../models/CategoryModel';

export default async function list(req: Request, res: Response) {

    try {

        const categories = await CategoryModel.find({
            order: {
                name: 'ASC'
            }
        });
        
        return res.json(categories);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
