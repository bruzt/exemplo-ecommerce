import { Request, Response } from 'express';

import AddressModel from '../../models/AddressModel';

/*interface IAddress {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
}*/

export default async function list(req: Request, res: Response) {

    const { userId } = req.tokenPayload;
    
    try {

        const addresses = await AddressModel.find({
            where: {
                userId
            }
        });

        return res.json(addresses);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'error creating address' });
    }
}
