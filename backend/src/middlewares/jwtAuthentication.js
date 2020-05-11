const jwt = require('jsonwebtoken');
const express = require('express');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = function verifyJwt(req, res, next) {
    
    const { authorization } = req.headers;

    const splitBearer = authorization.split(' ');

    if(splitBearer.length !== 2 || splitBearer[0] !== "Bearer") return res.status(400).json({ error: 'invalid credentials' });

    try {
        
        req.tokenPayload = jwt.verify(splitBearer[1], process.env.APP_SECRET);

        return next();

    } catch(error){
        
        return res.status(400).json({ error: 'invalid credentials' });
    }
}