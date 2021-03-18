import { Request, Response, NextFunction } from 'express';

import jwtAuthentication from './jwtAuthentication';

//import UserModel from '../models/UserModel';

export default async function adminJwtAuthentication(req: Request, res: Response, next: NextFunction){

    jwtAuthentication(req, res, async () => {

        const { admin } = req.tokenPayload;
    
        try {
    
            //const user = await UserModel.findByPk(id);
            
            if(!admin) return res.status(400).json({ message: 'not an admin' });
            //if(!user.admin) return res.status(400).json({ message: 'you are not allowed to do that' });
    
            return next();
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    });
}
