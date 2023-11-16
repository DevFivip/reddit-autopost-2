
import { Form, useLoaderData, useRevalidator } from '@remix-run/react';

import { redirect } from "@remix-run/node"; // or cloudflare/deno

import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

import { getAutorizeUser } from '~/middlewares/getAutorizeUser';

import { AuthUser } from 'prisma/types/user';

import { CalendarCreate } from '~/components/clientes/calendarCreate';


export async function loader({ request, params }: LoaderFunctionArgs) {
    const idCliente = params.idCliente as string;
    const user: AuthUser | null = await getAutorizeUser(request)
    if (user === null) throw new Error('Usuario no autenticado')


    // Lista de frutas
    var frutas = [
        "Manzana", "Plátano", "Fresa", "Uva", "Kiwi",
        "Piña", "Naranja", "Mango", "Melocotón", "Sandía",
        "Papaya", "Ciruela", "Pera", "Granada", "Arándano",
        "Cereza", "Limón", "Frambuesa", "Mandarina", "Pomelo",
        "Mora", "Guayaba", "Higo", "Pepino", "Carambola",
        "Maracuyá", "Melón", "Acerola", "Grosella", "Kiwano"
    ];

    // Función para generar combinaciones sin repetir frutas en días consecutivos
    function generarCombinacionesSinRepetir(dias, frutas) {
        var combinaciones = [];

        for (var i = 1; i <= dias; i++) {
            var combinacionDia = [];

            // Copiar la lista de frutas para no modificar la original
            var frutasDisponibles = frutas.slice();

            while (combinacionDia.length < 5) {
                var frutaAleatoria =
                    frutasDisponibles[Math.floor(Math.random() * frutasDisponibles.length)];

                // Agregar la fruta al día actual y quitarla de las disponibles
                combinacionDia.push(frutaAleatoria);
                frutasDisponibles.splice(frutasDisponibles.indexOf(frutaAleatoria), 1);
            }

            combinaciones.push({
                dia: i,
                frutas: combinacionDia
            });
        }

        return combinaciones;
    }

    // Generar combinaciones para 30 días sin repetir frutas
    var combinacionesPara30DiasSinRepetir = generarCombinacionesSinRepetir(30, frutas);

    // Mostrar las combinaciones en la consola
    console.log(combinacionesPara30DiasSinRepetir);



    return { user, idCliente };
}


export default function DashboardCalendarCreate() {

    const { user, idCliente } = useLoaderData<typeof loader>();
    return (<CalendarCreate idCliente={idCliente} />);
}


export const action = async ({ request, params }: ActionFunctionArgs) => {

    switch (request.method) {
        case 'DELETE':

            break;

        case "POST":
            // const getCurrentUnixTimestamp = () => {
            //     return Math.floor(new Date().getTime() / 1000);
            // }

            // const uploadHandler = unstable_createFileUploadHandler({
            //     avoidFileConflicts: true,
            //     maxPartSize: 5_000_000,
            //     directory: `./public/uploads/${params.idCliente}`,
            //     file: ({ filename }) => `${getCurrentUnixTimestamp()}_${filename}`,
            // });


            // await unstable_parseMultipartFormData(request, uploadHandler);


            break;
        default:
            break;

    }

    return redirect(`/dashboard/clientes`);

};
