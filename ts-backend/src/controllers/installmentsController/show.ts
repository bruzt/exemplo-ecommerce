import { Request, Response } from "express";

interface IBody {
    amount: number;
}

export default async function show(req: Request, res: Response) {

    const { amount } = req.body as IBody;

    const freeInstallments = 6 // parcelas sem juros
    const maxInstallments = 12 // maximo de parcelas
    const interestRate = 10; // juros (10 = 10%)

    const installments = [];

    // parcelas sem juros
    for (let i = 1; i <= freeInstallments; i++) {
        const calcAmount = amount / i;
        installments.push(Math.round((calcAmount + Number.EPSILON) * 100) / 100);
    }

    // parcelas com juros
    if (maxInstallments > freeInstallments) {
        for (let i = freeInstallments + 1; i <= maxInstallments; i++) {
            const calcAmount = (amount * (1 + interestRate / 100)) / i;
            installments.push(Math.round((calcAmount + Number.EPSILON) * 100) / 100);
        }
    }

    return res.json({ freeInstallments, maxInstallments, interestRate, installments});
}
