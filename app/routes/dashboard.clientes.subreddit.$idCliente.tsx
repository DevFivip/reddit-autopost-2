import { Form, useLoaderData, useParams } from "@remix-run/react";
import { LoaderFunctionArgs, json, ActionFunctionArgs, redirect } from "@remix-run/node";


import { getAutorizeUser } from "~/middlewares/getAutorizeUser";


import { getAll } from "prisma/subreddit";
import { findById, update, customersWithSubreddits } from "prisma/customer";
import { asingnationUpdate } from "prisma/subreddit";
// import { Customer } from "@prisma/client";
// import { UpdateCustomer } from "prisma/types/customer";
import { Customer, Subreddit, CustomerOnSubreddit } from "@prisma/client";
import { typeSubredditOnCustomer } from "prisma/types/subreddit";

import { AuthUser } from 'prisma/types/user';
import { ComponentAsignarSubredditFormulario } from "~/components/clientes/asignarSubreddit";



export async function loader({ params, request }: LoaderFunctionArgs) {
    const id = params.idCliente as string;

    const customer: Customer | null = await customersWithSubreddits(+id);
    if (!customer) throw new Response("customer no encontrado", { status: 404 });

    const subreddits: Subreddit[] | null = await getAll({ where: { status: true } });
    if (!subreddits) throw new Response("subreddits no encontrados", { status: 404 });

    const user: AuthUser | null = await getAutorizeUser(request)
    if (user === null) throw new Error('Usuario no autenticado')

    const SubredditsOnCustomers: typeSubredditOnCustomer[] = subreddits.map((s: Subreddit, k) => {
        let fund: typeSubredditOnCustomer = customer.CustomerOnSubreddit.find((asignado: CustomerOnSubreddit) => asignado.subreddit_id === s.id);
        s.status = !!fund
        // if (fund) {
        //     s.asingnado = true
        // } else {
        //     s.asingnado = false
        // }
        return s
    })
    console.log(customer);
    console.log(subreddits);
    console.log(SubredditsOnCustomers);

    return { customer, user, SubredditsOnCustomers };
}


export default function DashboardClienteEdit() {
    const { customer, user, SubredditsOnCustomers } = useLoaderData<typeof loader>();
    return (<Form method="POST">
        <ComponentAsignarSubredditFormulario modoEdicion={true} subredditOnCustomerEditar={SubredditsOnCustomers} usuario={user} />
    </Form>);
}



export const action = async ({ request, params }: ActionFunctionArgs) => {
    
    switch (request.method) {
        case 'POST': // editar
            const customer_id= params.idCliente || 0;
            const form = await request.formData();
            const asignadosRes = form.getAll('asignado');
            const asignados: number[] = asignadosRes.map((v,k)=>+v);
            await asingnationUpdate(+customer_id, asignados);
            // return json(asignados);
            return redirect(`/dashboard/clientes`);
            break;

        default:
            break;
    }

};

