import { Request, Response, NextFunction } from 'express';

import typeormConnection from '../../databases/typeorm/connection';
import truncate from '../../testUtils/truncateTypeorm';
import UserModel from '../../models/UserModel';
import adminJwtAuthentication from '../adminJwtAuthentication'; 
import { fakeUser } from '../../testUtils/fakeData';

interface IReq {
    headers: {
        authorization: string;
    };
    tokenPayload?: {
        id: number;
        admin: boolean;
    };
}

interface IRes {
    code: number;
    data: {
        message: string;
    };
}

describe('Middleware adminJwtAuthentication Test Suit', () => {

    beforeAll( () => {

        return typeormConnection;
    });

    beforeEach( () => {
              
        return truncate();
    });

    afterAll( async () => {

        return (await typeormConnection).close();
    });

    it('should call next() for valid admin token', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const result: IReq = await new Promise( (resolve) => {

            const req = {
                headers: { authorization: 'Bearer ' + token }
            }

            const next = (err: any) => {
                if(!err) return resolve(req);
            };

            adminJwtAuthentication(req as Request, {} as Response, next);
        });

        expect(result).toHaveProperty('tokenPayload');
        expect(result.tokenPayload?.id).toBe(user.id);
    });

    it('should return error for "not an admin"', async () => {

        const user = UserModel.create(fakeUser);
        const token = user.generateJwt();
    
        const req = {
            headers: { authorization: 'Bearer ' + token }
        }

        const result: IRes = await new Promise( (resolve) => {

            const response = {} as IRes;

            const res = {
                status: (code: number) => {
                    response['code'] = code;
                    return res;
                },
                json: (message: { message: string }) => {
                    response['data'] = message;
                    return resolve(response);
                }
            }

            adminJwtAuthentication(req as Request, res as any, {} as NextFunction);
        });

        expect(result.code).toBe(403);
        expect(result.data.message).toBe('not an admin');
    });
});
