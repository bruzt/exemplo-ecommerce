import { Request, Response } from "express";

import calcIntallments from '../../utils/calcInstallments';

interface IBody {
    amount: number;
}

export default async function show(req: Request, res: Response) {

    const { amount } = req.body as IBody;

    return res.json(calcIntallments(amount));
}
