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
            },
            {
                association: 'orders',
                attributes: { exclude: ['updatedAt', 'address_id', 'user_id'] },
                required: false,
                include: [{
                    association: 'address',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'user_id']},
                    required: false
                },
                {
                    association: 'products',
                    attributes: ['id', 'title'],
                    through: { attributes: ['quantity_buyed', 'product_price', 'product_discount_percent'] },
                    required: false,
                    paranoid: false,
                    include: {
                        association: 'images',
                        attributes: { exclude: ['product_id', 'createdAt', 'updatedAt'] },
                        required: false
                    }
                }]
            }]
        });

        if(!user) return res.status(400).json({ message: 'user not found'});
    
        return res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal error" });
    }
}
