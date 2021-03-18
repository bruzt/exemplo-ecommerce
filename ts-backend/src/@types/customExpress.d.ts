interface ITokenPayload {
    id: number;
    admin: boolean;
}

declare namespace Express {
	export interface Request {
		tokenPayload: ITokenPayload;
	}
 }
 