import { Form, useLoaderData, useParams } from "@remix-run/react";
import { LoaderFunctionArgs, json, ActionFunctionArgs, redirect } from "@remix-run/node";
import { ComponentClienteFormulario } from "~/components/clientes/formulario";

import { getAutorizeUser } from "~/middlewares/getAutorizeUser";


import { findById, update, remove } from "prisma/customer";
import { Customer } from "@prisma/client";
import { UpdateCustomer } from "prisma/types/customer";

import { AuthUser } from 'prisma/types/user';



export async function loader({ params, request }: LoaderFunctionArgs) {
    const id = params.idCliente as string;
    const customer: Customer | null = await findById(+id);
    if (!customer) throw new Response("customer no encontrado", { status: 404 });

    const user: AuthUser | null = await getAutorizeUser(request)
    if (user === null) throw new Error('Usuario no autenticado')
    return { customer, user };
}


export default function DashboardClienteEdit() {
    const { customer, user } = useLoaderData<typeof loader>();
    return (<Form method="POST" action={`/dashboard/clientes/${customer.id}`} >
        <ComponentClienteFormulario modoEdicion={true} clienteEditar={customer} usuario={user} />
    </Form>);
}



export const action = async ({ request, params }: ActionFunctionArgs) => {

    switch (request.method) {
        case 'POST': // editar
            const form = await request.formData();
            const idValue = form.get('id');
            const customer: UpdateCustomer = {
                id: parseInt(idValue as string),
                firstName: form.get('firstName') as string,
                lastName: form.get('lastName') as string,
                email: form.get('email') as string,
                tags: form.get('tags') as string,
                user_id: parseInt(form.get('user_id') as string),
                reddit_username: form.get('reddit_username') as string,
                reddit_password: form.get('reddit_password') as string,
                reddit_clientId: form.get('reddit_clientId') as string,
                reddit_clientSecret: form.get('reddit_clientSecret') as string,
                imgur_username: form.get('imgur_username') as string,
                imgur_password: form.get('imgur_password') as string,
                imgur_clientId: form.get('imgur_clientId') as string,
                imgur_clientSecret: form.get('imgur_clientSecret') as string,
                telegram_channel: form.get('telegram_channel') as string
            }
            await update(customer.id, customer);

            return redirect(`/dashboard/clientes`);
            break;
        case 'DELETE': // Eliminar
            const cliente_id = params.idCliente || '';
            await remove(+cliente_id);
            return json({ message: 'Cliente eliminado' });
            break;

        default:
            break;
    }

};

