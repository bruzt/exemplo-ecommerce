import { CelebrateError, isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

export default (err: CelebrateError | Error, req: Request, res: Response, next: NextFunction) => {

	if (isCelebrateError(err)) {

		const headersDetails = err.details.get('headers')?.details;
		const paramsDetails = err.details.get('params')?.details;
		const bodyDetails = err.details.get('body')?.details;

		if(headersDetails){

			const messages = headersDetails.map( (detail) => {
				return detail.message;
			});

			const status = headersDetails[0].context?.key == 'authorization' ? 401 : 400;

			return res.status(status).json({ 
				source: 'headers',
				message: messages 
			});
		}

		else if(paramsDetails){

			const messages = paramsDetails.map( (detail) => {
				return detail.message;
			});
			
			return res.status(400).json({ 
				source: 'params',
				message: messages 
			});
		}

		else if(bodyDetails){

			const messages = bodyDetails.map( (detail) => {
				return detail.message;
			});

			return res.status(400).json({ 
				source: 'body',
				message: messages
			});
		}
	}

	return next(err);
}