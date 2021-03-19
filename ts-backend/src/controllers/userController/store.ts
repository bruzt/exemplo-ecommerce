import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';
import validateCpf from '../../utils/validateCPF';

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
        if(user?.cpf === cpf) return res.status(400).json({ message: 'CPF already in use' });

        if(validateCpf(cpf) == false) return res.status(400).json({ message: 'invalid cpf' });
        
        const newUser = UserModel.create({ name, email, cpf, password });

        await newUser.save();

        const serializedUser = { ...newUser, password: undefined, tempPassword: undefined };

        return res.status(201).json({ user: serializedUser, token: newUser.generateJwt() });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal error" });
    }
}
