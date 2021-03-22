import { CelebrateError, isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

export default (err: CelebrateError | Error, req: Request, res: Response, next: NextFunction) => {

	if (isCelebrateError(err)) {

		const headersDetails = err.details.get('headers')?.details;
		const paramsDetails = err.details.get('params')?.details;
		const bodyDetails = err.details.get('body')?.details;

		if(headersDetails){

			const detail = headersDetails[0];
			let status: number;
			
			if(detail.context?.key == 'authorization') status = 401;
			else status = 400;

			return res.status(status).json({ 
				source: 'headers',
				message: detail.message 
			});
		}

		else if(paramsDetails){

			const detail = paramsDetails[0];
			
			return res.status(400).json({ 
				source: 'params',
				message: detail.message 
			});
		}

		else if(bodyDetails){

			const detail = bodyDetails[0];

			return res.status(400).json({ 
				source: 'body',
				message: detail.message 
			});
		}
	}

	return next(err);
}