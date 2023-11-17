
import { Form, useLoaderData, useRevalidator } from '@remix-run/react';

import { redirect } from "@remix-run/node"; // or cloudflare/deno

import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

import { getAutorizeUser } from '~/middlewares/getAutorizeUser';

import { AuthUser } from 'prisma/types/user';

import { CalendarCreate } from '~/components/clientes/calendarCreate';
import { getAssignSubreddits } from 'prisma/subreddit';
import { makeShuffelCalendar } from '~/utils/makeShuffleCalendar';
import { create, remove } from 'prisma/events';


export async function loader({ request, params }: LoaderFunctionArgs) {
    const idCliente = params.idCliente as string;
    const user: AuthUser | null = await getAutorizeUser(request)
    if (user === null) throw new Error('Usuario no autenticado')

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
            const customer_id = parseInt(params.idCliente as string);

            const asignSubreddits = (await getAssignSubreddits(customer_id)).map((as) => as.subreddit_id)
            // console.log(asignSubreddits)
            const calendar: any[] = makeShuffelCalendar(asignSubreddits);
            calendar.map((e) => {
                e.customer_id = customer_id;
                e.status = 1;
                e.fechaAt = new Date(e.fecha);
                delete e.fecha;
                return e
            })
            
            await remove(customer_id);
            await create(calendar);

            return redirect(`/dashboard/clientes/calendar/${params.idCliente}`);

            break;
        default:
            break;

    }



};
