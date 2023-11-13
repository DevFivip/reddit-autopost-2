export const dateFormat = (fecha: string) => {
    const fechaHora = new Date(fecha);
    const año = fechaHora.getFullYear();
    const mes = fechaHora.getMonth() + 1; // Los meses son indexados desde 0, así que sumamos 1
    const dia = fechaHora.getDate();
    const horas = fechaHora.getHours();
    const minutos = fechaHora.getMinutes();
    const segundos = fechaHora.getSeconds();

    // Formatea la fecha y hora como desees
    return `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${año} ${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;

}