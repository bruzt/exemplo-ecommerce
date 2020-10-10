const express = require('express');

const UserModel = require('../../models/UserModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    const { id } = req.tokenPayload;

    try {

        const user = await UserModel.destroy({ where: { id } });

        if(user === 0) return res.status(400).json({ message: 'user not found'});

        return res.sendStatus(200);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal error" });
    }
}
