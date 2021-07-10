import { Request, Response } from 'express';
import crypto from 'crypto';

import UserModel from '../../models/UserModel';
import queue from '../../queue';

export default async function store(req: Request, res: Response) {

    const { email } = req.body;

    try {

        const user = await UserModel.findOne({ where: { email }});

        if(!user) return res.status(404).json({ message: 'user not found' });

        const rawToken = crypto.randomBytes(20).toString('hex');

        const expires = new Date();
        expires.setHours(expires.getHours() + 1);

        user.reset_password_token = rawToken;
        user.reset_password_expires = expires;

        await user.save();

        await queue.add('ResetPasswordEmail', { user });

        return res.sendStatus(204);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
