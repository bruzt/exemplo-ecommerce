const express = require('express');

const UserModel = require('../models/UserModel');
const AddressModel = require('../models/AddressModel');

module.exports = {

    /** @param {express.Request} req * @param {express.Response} res */
    async index(req, res){
        
        const { id } = req.tokenPayload;
        
        try {

            const user = await UserModel.findByPk(id, {
                include: { association: 'addresses' }
            });

            if(! user) return res.status(400).json({ message: 'user not found' });
        
            return res.json(user.addresses);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "internal error" });
        }
    },
    
    /** @param {express.Request} req * @param {express.Response} res */
    async store(req, res){
        
        const user_id = req.tokenPayload.id;
        
        try {

            const user = await UserModel.findByPk(user_id);

            if(! user) return res.status(400).json({ message: 'user not found' });       
            
            const address = await AddressModel.create({ user_id, ...req.body });
    
            return res.json(address);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "internal error" });
        }
    },

    /** @param {express.Request} req * @param {express.Response} res */
    async update(req, res){

        const id = req.params.id;
        const user_id = req.tokenPayload.id;

        try {

            const user = await UserModel.findByPk(user_id, {
                include: [{
                    association: 'addresses',
                    where: { id },
                    required: false
                }]
            });

            if(! user) return res.status(400).json({ message: "user not found" });
            if(user.addresses.length < 1) return res.status(400).json({ message: "address not found" });

            await AddressModel.update(req.body, { where: { id } });

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "internal error" });
        }
    },

    /** @param {express.Request} req * @param {express.Response} res */
    async destroy(req, res){

        const id = req.params.id;
        const user_id = req.tokenPayload.id;

        try {

            const user = await UserModel.findByPk(user_id, {
                include: { 
                    association: 'addresses',
                    where: { id },
                    required: false
                }
            });

            if(! user) return res.status(400).json({ message: "user not found" });
            if(user.addresses.length < 1) return res.status(400).json({ message: "address not found" });

            AddressModel.destroy({ where: { id }});

            return res.sendStatus(200);
         
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "internal error" });
        }
    }
}