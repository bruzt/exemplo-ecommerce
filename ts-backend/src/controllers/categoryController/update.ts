import { Request, Response } from 'express';

import CategoryModel from '../../models/CategoryModel';

interface IParams {
    id: number;
}

interface IBody {
    name: string;
    parent_id: number;
}

export default async function(req: Request, res: Response) {

    const { id }: IParams = req.params as any;
    const bodyData = req.body as IBody;

    try {

        if(id == bodyData.parent_id) return res.status(400).json({ message: 'category can not have itself as a parent' });

        const category = await CategoryModel.findOne(id);
        if(category == null) return res.status(404).json({ message: 'category not found' });

        if(bodyData.name) category.name = bodyData.name;

        if(bodyData.parent_id){
            const parent = await CategoryModel.findOne(bodyData.parent_id);
            if(parent == null) return res.status(404).json({ message: 'parent not found' });

            category.parent_id = bodyData.parent_id;
        }

        await category.save();

        return res.json(category);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
