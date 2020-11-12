const express = require('express');

const UserModel = require('../../models/UserModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    const { id } = req.params;

    try {
        
        let user = await UserModel.findByPk(id, { 
            attributes: ['id', 'name', 'email', 'admin'],
            include: [{
                association: 'addresses',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                required: false
            }]
        });

        if(!user) return res.status(400).json({ message: 'user not found'});
    
        return res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal error" });
    }
}
