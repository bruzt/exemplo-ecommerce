const express = require('express');

const correios = require('../../services/freights/correios');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    const { pac, sedex } = await correios(req.body);

    return res.json({ pac, sedex });
}
