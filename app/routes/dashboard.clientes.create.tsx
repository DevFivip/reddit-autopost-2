
import { Form, useLoaderData } from '@remix-run/react';

import { redirect } from "@remix-run/node"; // or cloudflare/deno

import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { NewTypeCliente, create } from '~/models/cliente';
import { ComponentClienteFormulario } from '~/components/clientes/formulario'
import authenticator from '~/services/auth.server';
import { AutorizeUser, EmptyAutorizeUser } from '~/models/usuarios';

export async function loader({ request }: LoaderFunctionArgs): Promise<{ user: AutorizeUser }> {
    const user: AutorizeUser = (await authenticator.isAuthenticated(request, { failureRedirect: '/login' })) || EmptyAutorizeUser;
    console.log('usuario from create', user);
    return { user };
}


export default function DashboardClienteCreate() {
    const { user } = useLoaderData<typeof loader>();
    return (<>
        <Form method="POST" >
            <ComponentClienteFormulario modoEdicion={false} usuario={user} />
        </Form>
    </>);
}


export const action = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData();
    const cliente: NewTypeCliente = {
        usuario_id: parseInt(form.get('usuario_id') as string),
        nombre: form.get('nombre') as string,
        email: form.get('email') as string,
        reddit_username: form.get('reddit_username') as string,
        reddit_password: form.get('reddit_password') as string,
        reddit_clientId: form.get('reddit_clientId') as string,
        reddit_clientSecret: form.get('reddit_clientSecret') as string,
        imgur_username: form.get('imgur_username') as string,
        imgur_password: form.get('imgur_password') as string,
        imgur_clientId: form.get('imgur_clientId') as string,
        imgur_clientSecret: form.get('imgur_clientSecret') as string
    }
    console.log('to store',{cliente})
    await create(cliente);
    return redirect(`/dashboard/clientes`);
};
