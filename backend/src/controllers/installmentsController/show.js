const { Request, Response } = require("express");

const calcIntallments = require('../../util/calcInstallments');

/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
module.exports = async function show(req, res) {

    const { amount } = req.body;

    return res.json(calcIntallments(amount));
}
