const express = require('express');

const UserModel = require('../../models/UserModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    const { id } = req.tokenPayload;

    try {

        const user = await UserModel.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: {
                association: 'orders',
                required: false
            }
        });

        if(!user) return res.status(400).json({ message: 'user not found' });

        return res.json(user.orders);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
