


export const format =(value:number) =>{
    const formater = new Intl.NumberFormat('es-ES',{
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits:2,
        maximumFractionDigits:2

    })
    return formater.format (value)

}