const express = require('express');

const UserModel = require('../../models/UserModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    const { name, email, password } = req.body;
    
    try {

        const user = await UserModel.findOne({ where: { email }});

        if(user) return res.status(400).json({ message: 'email already in use' });
        
        const newUser = await UserModel.create({ name, email, password });

        newUser.password = undefined;

        return res.json({ user: newUser, token: newUser.generateToken() });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal error" });
    }
}