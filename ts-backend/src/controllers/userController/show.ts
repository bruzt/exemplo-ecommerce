import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';

export default async function show(req: Request, res: Response) {

    const { id } = req.tokenPayload;
    const paramsId = Number(req.params.id);

    if(id !== paramsId) return res.status(403).json({ message: 'token id must be equal to params id' });

    try {

        const user = await UserModel.findOne(id, {
            select: ['id', 'name', 'email', 'cpf', 'admin'],
            relations: ['addresses'],
        });

        if(user == null) return res.status(404).json({ message: 'user not found'});

        const serializedUser = { ...user, password: undefined, tempPassword: undefined };
    
        return res.json(serializedUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal error" });
    }
}
