
export default function validateCpf(cpf: string | number) {

    cpf = String(cpf).replace('.', '').replace('.', '').replace('-', '');
    
    if (
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    ){

        return false;
    }
    
    let sum = 0;
    let i = 0;
    let j = 10;

    while(i < 9){
        while(j > 1){

            sum += Number(cpf[i]) * j;

            i++;
            j--;
            break;
        }
    }

    const first = (sum*10)%11;

    if(first != Number(cpf[9])) return false;
    
    sum = 0;
    i = 0;
    j = 11;

    while(i < 10){
        while(j > 1){

            sum += Number(cpf[i]) * j;

            i++;
            j--;
            break;
        }
    }
    
    const second = (sum*10)%11;

    if(second != Number(cpf[10])) return false;
    
    return true;
}
