const express = require('express');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = (req, res, next) => {

    Object.entries(req.body).forEach( ([key, value]) => {

        if(typeof value == 'string') value = value.trim();

        req.body[key] = value;
    });

    next();
}