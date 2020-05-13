const factories = require('../../utils/factories');
const jwtAuthentication = require('../../../src/middlewares/jwtAuthentication'); 
const truncate = require('../../utils/truncate');

describe('Middleware jwtAuthentication Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should call next() for valid token', async () => {

        const user = await factories.create('User');

        const token = user.generateToken();

        const result = await new Promise( (resolve) => {

            const req = {
                headers: { authorization: 'Bearer ' + token }
            }

            const next = (err) => {
                if(!err) return resolve(req);
            };

            jwtAuthentication(req, {}, next);
        });

        expect(result).toHaveProperty('tokenPayload');
        expect(result.tokenPayload.id).toBe(user.id);
    });

    it('should return error for Bearer token bad formatted', async () => {

        const user = await factories.create('User');

        const token = user.generateToken();
    
        let req = {
            headers: { authorization: token }
        }

        const result = await new Promise( (resolve) => {

            let res = {
                status: (code) => {
                    res['code'] = code;
                    return res;
                },
                json: (message) => {
                    res['data'] = message;
                    return resolve(res);
                }
            }

            jwtAuthentication(req, res, {});
        });

        expect(result.code).toBe(400);
        expect(result.data.message).toBe('invalid credentials');
    });

    it('should return error for token not valid', async () => {

        let req = {
            headers: { authorization: 'Bearer a98we4g9a4ge98a4weg' }
        }

        const result = await new Promise( (resolve) => {

            let res = {
                status: (code) => {
                    res['code'] = code;
                    return res;
                },
                json: (message) => {
                    res['data'] = message;
                    return resolve(res);
                }
            }

            jwtAuthentication(req, res, {});
        });

        expect(result.code).toBe(400);
        expect(result.data.message).toBe('invalid credentials');
    });
});