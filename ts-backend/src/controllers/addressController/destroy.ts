import { Request, Response } from 'express';

import AddressModel from '../../models/AddressModel';

export default async function destroy(req: Request, res: Response) {

    const id = Number(req.params.id);
    const { userId } = req.tokenPayload;

    try {

        const addresses = await AddressModel.find({
            where: {
                userId
            }
        });

        const [ address ] = addresses.filter( (address) => address.id === id);

        if(! address) return res.status(400).json({ message: 'address not found' });

        await address.remove();

        return res.sendStatus(204);
     
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal error" });
    }
}
