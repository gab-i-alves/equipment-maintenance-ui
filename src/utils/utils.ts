//retorna no formato brasileiro
export function dateToString(date: Date) : string{
    let day = date.getDay().toString();
    let month = date.getMonth().toString();
    let year = date.getFullYear().toString();
    
    return `${day}/${month}/${year}`
}

export function stringToDate(string: String): Date{
    const[day, month, year] = string.split('/').map(Number);

    console.log(day, month, year);

    let date = new Date(year, month -1, day);

    return date
}

//retorna no formato correto para input tipo date
export function dateToStringInput(date: Date) : string{
    let day = date.getDay().toString();
    let month = date.getMonth().toString();
    let year = date.getFullYear().toString();

    return `${year}-${month}-${day}`;


}
