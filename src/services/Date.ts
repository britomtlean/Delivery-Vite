
export function checkDate(input: string, data: string): boolean {

    const dataFormatada = new Date(data).toLocaleDateString('sv-SE', {
        timeZone: 'America/Sao_Paulo',
    });

    if(dataFormatada === input) return true

    return false

}
