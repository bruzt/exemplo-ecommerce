
export default function formatZipCode(zipCode: string | number){

    zipCode = String(zipCode);

    zipCode = zipCode.replace(/[^0-9]/g, "");

    if (zipCode.length == 8) {

        const part1 = zipCode.slice(0, 5);
        const part2 = zipCode.slice(5, 8);

        zipCode = `${part1}-${part2}`;
    }

    return zipCode;
}