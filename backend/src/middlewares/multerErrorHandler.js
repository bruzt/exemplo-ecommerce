const express = require('express');

/**
 * @param {express.Errback} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = (err, req, res, next) => {

    if (err) {
        return res.status(400).json({ message: err })
    }

    return next();
}