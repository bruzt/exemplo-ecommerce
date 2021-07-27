import { Request, Response } from 'express';

import ProductModel from '../../models/ProductModel';
import CategoryModel from '../../models/CategoryModel';
import sonicIngest from '../../databases/sonic/ingest';

interface IBody {
    category_id: number;
    title: string;
    description: string;
    html_body?: string;
    price: string;
    quantity_stock?: number;
    quantity_sold?: number;
    discount_percent?: number;
    discount_datetime_start?: Date;
    discount_datetime_end?: Date;
    tangible: boolean;
    weight: number;
    length: number;
    height: number;
    width: number;
}

export default async function store(req: Request, res: Response) {

    const bodyData = req.body as IBody;

    bodyData.price = Number(bodyData.price).toFixed(2);
    
    try {

        if(bodyData.discount_datetime_start) bodyData.discount_datetime_start = new Date(bodyData.discount_datetime_start);
        if(bodyData.discount_datetime_end) bodyData.discount_datetime_end = new Date(bodyData.discount_datetime_end);

        const category = await CategoryModel.findOne(bodyData.category_id);

        if(!category) return res.status(404).json({ message: 'category not found' });

        const product = ProductModel.create(bodyData);
        await product.save();

        await sonicIngest.ingestProduct(product.id, product.title);

        return res.status(201).json(product);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
