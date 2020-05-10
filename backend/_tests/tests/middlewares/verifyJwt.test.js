const factories = require('../../utils/factories');
const verifyJwt = require('../../../src/middlewares/verifyJwt'); 
const truncate = require('../../utils/truncate');

describe('Middleware verifyJwt Test Suit', () => {

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

            verifyJwt(req, {}, next);
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
                json: (error) => {
                    res['data'] = error;
                    return resolve(res);
                }
            }

            verifyJwt(req, res, {});
        });

        expect(result.code).toBe(400);
        expect(result.data).toHaveProperty('error');
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
                json: (error) => {
                    res['data'] = error;
                    return resolve(res);
                }
            }

            verifyJwt(req, res, {});
        });

        expect(result.code).toBe(400);
        expect(result.data).toHaveProperty('error');
    });
});