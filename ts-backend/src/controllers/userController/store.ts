import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';
//import validateCpf from '../../util/validateCpf';

interface IBody extends ReadableStream<Uint8Array> {
    name: string;
    email: string;
    cpf: string;
    password: string;
}

export default async function store(req: Request, res: Response){

    const { name, email, cpf, password } = req.body as IBody;
    
    try {

        const user = await UserModel.findOne({
            where: [
                { email },
                { cpf }                
            ]
        });

        if(user?.email === email) return res.status(400).json({ message: 'email already in use' });
        if(user?.cpf === cpf) return res.status(400).json({ message: 'cpf already in use' });
        //if(validateCpf(cpf) == false) return res.status(400).json({ message: 'invalid cpf' });
        
        const newUser = UserModel.create({ name, email, cpf, password });

        await newUser.save();

        newUser.password = 'null';

        return res.json({ user: newUser, token: newUser.generateJwt() });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal error" });
    }
}
