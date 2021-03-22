import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';

export default async function list(req: Request, res: Response) {

    const { userId } = req.tokenPayload;
    
    try {

        const user = await UserModel.findOne(userId, {
            relations: ['addresses'],
        });

        if(! user) return res.status(404).json({ message: 'user not found'});

        return res.json(user.addresses);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'error creating address' });
    }
}
