import { Request, Response } from 'express';

import CategoryModel from '../../models/CategoryModel';
import ProductModel from '../../models/ProductModel';

interface IParams {
    id: number;
}

interface IBody {
    transferToId: number;
}

export default async function destroy(req: Request, res: Response) {

    const { id }: IParams = req.params as any;
    const { transferToId } = req.body as IBody;

    try {

        if(id == transferToId) return res.status(400).json({ message: 'id and transferToId cannot be the same' });

        const category = await CategoryModel.findOne(id);
        if(category == null) return res.status(404).json({ message: 'category not found' });

        const categoryToTransfer = await CategoryModel.findOne(transferToId);
        if(!categoryToTransfer) return res.status(404).json({ message: 'category to transfer not found' });

        const categories = await CategoryModel.find();

        const hasChildren = categories.filter( (categoryItem) => categoryItem.parent_id == id);
        if(hasChildren.length > 0) return res.status(400).json({ message: 'category to delete must not have childrens' });

        const products = await ProductModel.find({
            where: {
                category_id: id
            }
        });

        for(const product of products){

            product.category_id = transferToId;
            await product.save();
        }

        await category.remove();
        
        return res.status(204).json();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Unexpected error deleting category' });
    }
}
