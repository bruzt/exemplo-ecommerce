
export default function formatPhone(phone: string | number){
        
    phone = String(phone);

    phone = phone.replace(/[^0-9]/g, "");

    if (phone.length == 10) {

        const part1 = phone.slice(0, 2);
        const part2 = phone.slice(2, 6);
        const part3 = phone.slice(6, 10);

        phone = `(${part1}) ${part2}-${part3}`;
    }

    if (phone.length == 11) {

        const part1 = phone.slice(0, 2);
        const part2 = phone.slice(2, 3);
        const part3 = phone.slice(3, 7);
        const part4 = phone.slice(7, 11);

        phone = `(${part1}) ${part2}-${part3}-${part4}`;
    }

    return phone;
}