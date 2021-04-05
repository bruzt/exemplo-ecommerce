import { Request, Response, NextFunction } from 'express';

import typeormConnection from '../../databases/typeorm/connection';
import truncate from '../../testUtils/truncateTypeorm';
import UserModel from '../../models/UserModel';
import jwtAuthentication from '../jwtAuthentication'; 

const fakeUser = {
    name: "fake admin",
    cpf: "61311682023",
    email: "fake@admin.com",
    password: "123456"
}

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

describe('Middleware jwtAuthentication Test Suit', () => {

    beforeAll( () => {

        return typeormConnection;
    });

    beforeEach( () => {
              
        return truncate();
    });

    afterAll( async () => {

        return (await typeormConnection).close();
    });

    it('should call next() for valid token', async () => {

        const user = UserModel.create(fakeUser);
        const token = user.generateJwt();

        const result: IReq = await new Promise( (resolve) => {

            const req = {
                headers: { authorization: 'Bearer ' + token }
            }

            const next = (err: any) => {
                if(!err) return resolve(req);
            };

            jwtAuthentication(req as Request, {} as Response, next);
        });

        expect(result).toHaveProperty('tokenPayload');
        expect(result.tokenPayload?.id).toBe(user.id);
    });

    it('should return error for Bearer token bad formatted', async () => {

        const user = UserModel.create(fakeUser);
        const token = user.generateJwt();
    
        const req = {
            headers: { authorization: token }
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

            jwtAuthentication(req as Request, res as Response, {} as NextFunction);
        });

        expect(result.code).toBe(401);
        expect(result.data.message).toBe('invalid credentials');
    });

    it('should return error for token not valid', async () => {

        const req = {
            headers: { authorization: 'Bearer a98we4g9a4ge98a4weg' }
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

            jwtAuthentication(req as Request, res as Response, {} as NextFunction);
        });

        expect(result.code).toBe(401);
        expect(result.data.message).toBe('invalid credentials');
    });
});
