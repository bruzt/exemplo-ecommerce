import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';
import AddressModel from '../../models/AddressModel';

interface IAddressData {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
}

export default async function(req: Request, res: Response) {

    const { id } = req.tokenPayload;
    const bodyData = req.body as IAddressData;
        
    try {

        const user = await UserModel.findOne(id);

        if(! user) return res.status(404).json({ message: 'user not found' });       
        
        const address = AddressModel.create({ user, ...bodyData });
        
        await address.save();

        const serializedAddress = { ...address, user: undefined };

        return res.status(201).json(serializedAddress);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal error" });
    }
}
