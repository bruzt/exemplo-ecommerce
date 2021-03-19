import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function jwtAuthentication(req: Request, res: Response, next: NextFunction) {

	const { authorization } = req.headers;

	try {

		if (!authorization) throw new Error();

		const splitBearer = authorization.split(' ');

		if (splitBearer.length !== 2 || splitBearer[0] !== "Bearer") throw new Error();

		req.tokenPayload = jwt.verify(splitBearer[1], process.env.APP_SECRET as string) as ITokenPayload;

		return next();

	} catch (error) {

		return res.status(400).json({ message: 'invalid credentials' });
	}
}
