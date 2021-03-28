import {  Request, Response, NextFunction} from 'express';

export default function multerErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {

    if (err) {
        return res.status(400).json({ message: err })
    }

    return next();
}
