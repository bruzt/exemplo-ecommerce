import { Request, Response } from 'express';

import ProductModel from '../../models/ProductModel';
import CategoryModel from '../../models/CategoryModel';
import sonicFlushObject from '../../databases/sonic/flushObject';
import sonicIngest from '../../databases/sonic/ingest';

interface IParams {
    id: number;
}

interface IBody {
    category_id?: number;
    title?: string;
    description?: string;
    html_body?: string;
    price?: number;
    quantity_stock?: number;
    quantity_sold?: number;
    discount_percent?: number;
    discount_datetime_start?: Date;
    discount_datetime_end?: Date;
    tangible?: boolean;
    weight?: string;
    length?: number;
    height?: number;
    width?: number;
}

export default async function update(req: Request, res: Response) {

    const { id }: IParams = req.params as any;
    const body = req.body as IBody;

    try {

        const product = await ProductModel.findOne(id);

        if(product == null) return res.status(404).json({ message: 'product not found' });

        if(body.category_id){

            const category = await CategoryModel.findOne(body.category_id);

            if(category == null) return res.status(404).json({ message: 'category not found' });

            product.category_id = body.category_id;
        }
        
        if(body.title) product.title = body.title;
        if(body.description) product.description = body.description;
        if(body.discount_datetime_start) product.discount_datetime_start = body.discount_datetime_start;
        if(body.discount_datetime_end) product.discount_datetime_end = body.discount_datetime_end;
        if(body.discount_percent) product.discount_percent = body.discount_percent;
        if(body.html_body) product.html_body = body.html_body;
        if(body.price) product.price = String(body.price);
        if(body.quantity_sold) product.quantity_sold = body.quantity_sold;
        if(body.quantity_stock) product.quantity_stock = body.quantity_stock;
        if(body.tangible) product.tangible = body.tangible;
        if(body.weight) product.weight = body.weight;
        if(body.height) product.height = body.height;
        if(body.width) product.width = body.width;
        if(body.length) product.length = body.length;
        
        await product.save();

        if(body.title){

            await sonicFlushObject.flushProduct(id);
            await sonicIngest.ingestProduct(id, body.title);
        }

        return res.json(product);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
