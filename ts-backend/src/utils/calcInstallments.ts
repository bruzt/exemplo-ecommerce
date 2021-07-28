
export default function(amount: number){

    const freeInstallments = Number(process.env.FREE_INSTALLMENTS); // parcelas sem juros
    const maxInstallments = Number(process.env.MAX_INSTALLMENTS); // maximo de parcelas
    const interestRate = Number(process.env.INTEREST_RATE); // juros (10 = 10%)

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

    return {
        freeInstallments,
        maxInstallments,
        interestRate,
        installments
    }
}
