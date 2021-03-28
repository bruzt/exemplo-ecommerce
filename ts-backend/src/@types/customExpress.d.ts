interface ITokenPayload {
    userId: number;
    admin: boolean;
}

declare namespace Express {
	export interface Request {
		tokenPayload?: ITokenPayload;
		files?: Express.Multer.File[];
	}
 }
 