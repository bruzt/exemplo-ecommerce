import { Request, Response } from 'express';
import { unlink } from 'fs';
import { promisify } from 'util';

import ImageModel from '../../models/ImageModel';
import ProductModel from '../../models/ProductModel';

const unlinkAsync = promisify(unlink);

export default async function store(req: Request, res: Response) {
    
    const { id } = req.params;
    const files = req.files;

    try {

        if(files == null || files.length < 1) return res.status(400).json({ message: 'no image' });

        const product = await ProductModel.findOne(id);

        if(product == null){
            
            files.forEach( async (file) => {
            
                if(process.env.IMG_STORAGE_LOCATION == 'local'){

                    await unlinkAsync(file.path);
                }
            });

            return res.status(404).json({ message: 'product not found' });
        } 
        
        const images: ImageModel[] = [];

        for(const file of files){

            const url = process.env.IMG_STORAGE_LOCATION == 'local' 
                ? `${process.env.BACKEND_URL}/uploads/${file.filename}`
                : file.path
            ;

            images.push(ImageModel.create({
                product_id: Number(id),
                url, 
                filename: file.filename
            }));
        }

        const savedImages = await ImageModel.save(images);
        
        return res.status(201).json(savedImages);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
