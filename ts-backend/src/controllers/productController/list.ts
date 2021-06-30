import { Request, Response } from 'express';
import { ILike, Any, LessThan, MoreThan, MoreThanOrEqual } from 'typeorm';

import findCategoriesChildrenIds from '../../utils/findCategoriesChildrenIds';

import ProductModel from '../../models/ProductModel';
import CategoryModel from '../../models/CategoryModel';
import sonicSearch from '../../databases/sonic/search';

declare global {
    interface Array<T>  {
        move: (from: number, to: number) => void;
    }
}

Array.prototype.move = function(from: number, to: number) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

interface IAnyObject {
    [key:string]: string
}

function serializeOrder(arrayOrder: IAnyObject[]){

    const order: IAnyObject = {};

    for(const aOrder of arrayOrder){

        const [ orderKey ] = Object.keys(aOrder)
        order[orderKey] = aOrder[orderKey];
    }

    return order;
}

export default async function list(req: Request, res: Response) {

    const title = req.query.title ? String(req.query.title) : undefined;
    const categoryId = req.query.category ? Number(req.query.category) : undefined;
    const section = req.query.section ? String(req.query.section) : undefined;

    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const offset = req.query.offset ? Number(req.query.offset) : undefined;
    
    const arrayOrder: IAnyObject[] = [
        { quantity_stock: 'DESC' },
        { discount_percent: 'DESC' },
        { quantity_sold: 'DESC' },
    ];

    if(req.query.filter == 'lowest-price') arrayOrder.splice(0, 0, { price: 'ASC' });
    else if(req.query.filter == 'biggest-price') arrayOrder.splice(0, 0, { price: 'DESC' });
    if(req.query.filter == 'id') arrayOrder.splice(0, 0, { id: 'DESC' });

    let order = serializeOrder(arrayOrder);
    
    let products: ProductModel[] = [];
    let count = 0;

    try {
        if(title){ // Busca por titulo

            const ids = await sonicSearch.searchProduct(title, limit, offset);
            
            if(Array.isArray(ids) && ids.length > 0){ // Pesquisa com relevância

                [ products, count ] = await ProductModel.findAndCount({
                    where: {
                        id: Any(ids)
                    },
                    relations: ['category', 'images'],
                    order,
                });

            } else { // Pesquisa burra
                
                const splitedTitle = title.split(' ').map( (word) => ({ title: ILike(`%${word}%`) }));
                
                [ products, count ] = await ProductModel.findAndCount({
                    where: splitedTitle,
                    take: limit,
                    skip: offset,
                    order,
                    relations: ['category', 'images']
                });
            }
            
        } else if(categoryId){ // Busca por categoria

            const categories = await CategoryModel.find();

            const serializedCategories = categories.map( (category) => ({
                id: category.id,
                parent_id: category.parent_id
            }));

            const categoriesIds = findCategoriesChildrenIds(categoryId, serializedCategories);
            
            [ products, count ] = await ProductModel.findAndCount({
                take: limit,
                skip: offset,
                order,
                relations: ['category', 'images'],
                where: {
                    category_id: Any(categoriesIds)
                }
            });

        } else if (section){ // Busca por seção

            let where = undefined;

            if(section == 'on-sale'){
                
                const dateNow = new Date().toUTCString();

                where = {
                    discount_datetime_start: LessThan(dateNow),
                    discount_datetime_end: MoreThan(dateNow),
                    discount_percent: MoreThan(0),
                    quantity_stock: MoreThan(0),
                }
        
            } else if(section == 'best-sellers'){ 
        
                arrayOrder.move(2, 0);
                order = serializeOrder(arrayOrder);
                
                where = {
                    quantity_sold: MoreThan(0),
                    quantity_stock: MoreThan(0),
                };
        
            } else if(section == 'news'){
        
                arrayOrder.splice(0, 0, { created_at: 'DESC' });
                order = serializeOrder(arrayOrder);
        
                const date = new Date();
                date.setMonth(date.getMonth() - 1);
        
                where = {
                    created_at: MoreThanOrEqual(date),
                    quantity_stock: MoreThan(0),
                };
            }
            
            [ products, count ] = await ProductModel.findAndCount({
                where,
                take: limit,
                skip: offset,
                order,
                relations: ['category', 'images']
            });

        } else { // Busca sem filtro (where)

            [ products, count ] = await ProductModel.findAndCount({
                take: limit,
                skip: offset,
                order,
                relations: ['category', 'images']
            });
        }
        
        return res.json({ count, products: products });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
