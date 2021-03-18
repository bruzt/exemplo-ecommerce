import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';

export default async function list(req: Request, res: Response){

    try {

        const users = await UserModel.find();

        const serializedUsers = users.map( (user) => ({ ...user, password: undefined, tempPassword: undefined }) );
        
        return res.json(serializedUsers);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'error finding users' });
    }
}