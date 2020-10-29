import validateCpf from './validateCpf';

export default function formatCpf(cpf: string | number){

    cpf = String(cpf).replace(/[^0-9]/g, "");

    if (cpf.length == 11) {

        const part1 = cpf.slice(0, 3);
        const part2 = cpf.slice(3, 6);
        const part3 = cpf.slice(6, 9);
        const part4 = cpf.slice(9, 11);

        cpf = `${part1}.${part2}.${part3}-${part4}`;
    }

    const valid = validateCpf(cpf);

    return { cpf, valid };
}