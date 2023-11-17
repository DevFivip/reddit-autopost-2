

function generarCombinacionesSinRepetir(dias, collection) {
    var combinaciones = [];
    var today = new Date();

    for (var i = 1; i <= dias; i++) {
        var combinacionDia = [];

        // Copiar la lista de collection para no modificar la original
        var collectionDisponibles = collection.slice();

        while (combinacionDia.length < 5) {
            var frutaAleatoria = collectionDisponibles[Math.floor(Math.random() * collectionDisponibles.length)];

            // Agregar la fruta al día actual y quitarla de las disponibles
            combinacionDia.push(frutaAleatoria);
            collectionDisponibles.splice(collectionDisponibles.indexOf(frutaAleatoria), 1);
        }

        var fechaDia = new Date(today);
        fechaDia.setDate(today.getDate() + i);

        combinaciones.push({
            dia: i,
            fecha: fechaDia.toISOString().split('T')[0],
            collection: combinacionDia
        });
    }
    let nc = [];
    combinaciones.forEach((com) => {
        com.collection.forEach((sub, h) => [
            nc.push({ fecha: `${com.fecha} ${10 + h}:00`, subreddit_id: sub })
        ])
    })

    console.log(nc);

    return nc;
}


export const makeShuffelCalendar = (subreddit: number[]) => {


    // Función para generar combinaciones sin repetir collection en días consecutivos
    // Obtén la fecha de mañana
    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    // Obtén el último día del mes actual
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Calcula la diferencia en días entre mañana y el último día del mes
    const daysUntilEndOfMonth = Math.ceil((lastDay - tomorrow) / (1000 * 60 * 60 * 24));

    // Generar combinaciones para 30 días sin repetir collection
    const combinacionesPara30DiasSinRepetir = generarCombinacionesSinRepetir(daysUntilEndOfMonth + 1, subreddit);

    // Mostrar las combinaciones en la consola
    return combinacionesPara30DiasSinRepetir;


}