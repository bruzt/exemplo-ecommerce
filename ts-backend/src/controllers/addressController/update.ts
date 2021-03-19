import { Request, Response } from 'express';

import AddressModel from '../../models/AddressModel';

interface IAddressData {
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipcode?: string;
}

export default async function update(req: Request, res: Response) {

    const id = Number(req.params.id);
    const { userId } = req.tokenPayload;

    const {
        street,
        number,
        neighborhood,
        city,
        state,
        zipcode,
    } = req.body as IAddressData;

    try {

        const addresses = await AddressModel.find({
            where: { 
                userId 
            }
        });

        const [ address ] = addresses?.filter( (address) => address.id === id );
        
        if(! address) return res.status(400).json({ message: "address not found" });

        if(street) address.street = street;
        if(number) address.number = number;
        if(neighborhood) address.neighborhood = neighborhood;
        if(city) address.city = city;
        if(state) address.state = state;
        if(zipcode) address.zipcode = zipcode;

        await address.save();

        return res.sendStatus(204);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal error" });
    }
}
