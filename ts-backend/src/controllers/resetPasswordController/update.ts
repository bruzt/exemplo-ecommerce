import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';

interface IBody {
    token: string;
    password: string;
}

export default async function store(req: Request, res: Response) {

    const { token, password } = req.body as IBody;

    const splitedToken = token.split('$');

    if(splitedToken.length != 2) return res.status(400).json({ message: 'invalid token' });

    const [ id, rawToken ] = splitedToken;

    if(isNaN(Number(id))) return res.status(400).json({ message: 'invalid token' });
   
    try {

        const user = await UserModel.findOne(id);

        if(!user) return res.status(404).json({ message: 'user not found' });

        if(rawToken !== user.reset_password_token) return res.status(400).json({ message: 'invalid token' });
        if(user.reset_password_expires == null || new Date > user.reset_password_expires) return res.status(400).json({ message: 'token expired' });

        user.password = password;
        user.reset_password_token = null;
        user.reset_password_expires = null;

        await user.save();

        return res.sendStatus(204);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
