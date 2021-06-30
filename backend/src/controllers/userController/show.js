const express = require('express');

const UserModel = require('../../models/UserModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    const { id } = req.tokenPayload;
    const paramsId = req.params.id;

    if(id != paramsId) return res.status(400).json({ message: 'token id must be equal to params id' });

    try {
        
        let user = await UserModel.findByPk(id, { 
            attributes: { 
                exclude: [
                    'password', 
                    'reset_password_token', 
                    'reset_password_expires',
                    'createdAt',
                    'updatedAt'
                ]
            },
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
