const express = require('express');

const UserModel = require('../models/UserModel');

module.exports = {

    /** @param {express.Request} req * @param {express.Response} res */
    async store(req, res){

        const { email, password } = req.body;

        try {
            
            const user = await UserModel.findOne({ where: { email }});
    
            if(! user) return res.status(400).send({ message: "user or password is incorrect" });
    
            const comparePassword = await user.checkPassword(password);
    
            if(! comparePassword) return res.status(400).json({ message: "user or password is incorrect" });
    
            user.password = undefined;

            return res.json({ 
                user, 
                token: user.generateToken() 
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    }
}