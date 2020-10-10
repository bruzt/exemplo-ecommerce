const express = require('express');

const UserModel = require('../../models/UserModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    const { id } = req.tokenPayload;
    const { name, email, currentPassword, newPassword } = req.body;

    try {

        let password;
        const user = await UserModel.findByPk(id);

        if(!user) return res.status(400).json({ message: 'user not found' });

        if(currentPassword && newPassword){

            if(await user.checkPassword(currentPassword)){

                password = newPassword;

            } else {

                return res.status(400).json({ message: 'wrong current password' })
            }
        }

        if(!password) password = undefined;
        
        const updated = await user.update({
                name,
                email,
                password
            },
            { 
                individualHooks: true 
            }
        );

        if(Object.keys(updated._changed).length == 0) return res.status(400).json({ message: 'no update has been made' });
    
        return res.sendStatus(200);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal error" });
    }
}
