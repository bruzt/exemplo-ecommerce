import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';

export default async function show(req: Request, res: Response) {

    const { userId } = req.tokenPayload;
    const paramsId = Number(req.params.id);

    if(userId !== paramsId) return res.status(400).json({ message: 'token id must be equal to params id' });

    try {

        const user = await UserModel.findOne(userId, {
            select: ['id', 'name', 'email', 'cpf', 'admin']
        });
        
        /*let user = await UserModel.findByPk(id, { 
            attributes: { 
                exclude: [
                    'password', 
                    'reset_password_token', 
                    'reset_password_expires',
                    'createdAt',
                    'updatedAt'
                ]
            },
            include: [{
                association: 'addresses',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                required: false
            }]
        });*/

        if(!user) return res.status(400).json({ message: 'user not found'});

        const serializedUser = { ...user, password: undefined, tempPassword: undefined };
    
        return res.json(serializedUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal error" });
    }
}