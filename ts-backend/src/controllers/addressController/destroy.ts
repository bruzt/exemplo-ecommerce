import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';

export default async function destroy(req: Request, res: Response) {

    const paramsId = Number(req.params.id);
    const { id } = req.tokenPayload;

    try {

        const user = await UserModel.findOne(id, {
            relations: ['addresses']
        });

        if(user == null) return res.status(404).json({ message: 'user not found' });

        const filteredAddress = user.addresses?.filter( (address) => address.id === paramsId);

        if(filteredAddress == null || filteredAddress.length === 0) return res.status(404).json({ message: 'address not found' });

        const address = filteredAddress[0];

        await address.softRemove();

        return res.sendStatus(204);
     
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal error" });
    }
}
