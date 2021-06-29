const factories = require('../../testUtils/factories');
const adminJwtAuthentication = require('../adminJwtAuthentication'); 
const truncate = require('../../testUtils/truncate');

describe('Middleware adminJwtAuthentication Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should call next() for valid admin token', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const result = await new Promise( (resolve) => {

            const req = {
                headers: { authorization: 'Bearer ' + token }
            }

            const next = (err) => {
                if(!err) return resolve(req);
            };

            adminJwtAuthentication(req, {}, next);
        });

        expect(result).toHaveProperty('tokenPayload');
        expect(result.tokenPayload.id).toBe(user.id);
    });

    it('should return error for "not an admin"', async () => {

        const user = await factories.create('User');
        user.admin = false;
        const token = user.generateToken();
    
        let req = {
            headers: { authorization: 'Bearer ' + token }
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

            adminJwtAuthentication(req, res, {});
        });

        expect(result.code).toBe(400);
        expect(result.data.message).toBe('not an admin');
    });
});