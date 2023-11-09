
import { Form } from '@remix-run/react';

import { redirect } from "@remix-run/node"; // or cloudflare/deno

import { ActionFunctionArgs } from '@remix-run/node';
import { NewTypeUsuarios, create } from '~/models/usuario';
import { ComponentClienteFormulario } from '~/components/clientes/formulario'

export const action = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData();
    const usuario: NewTypeUsuarios = {
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
    console.log({usuario})
    await create(usuario);
    return redirect(`/dashboard/clientes`);
};

// export async function loader({params}: LoaderFunctionArgs) {

// }


export default function DashboardClienteCreate() {
    return (<>
        <Form method="POST" >
            <ComponentClienteFormulario modoEdicion={false} />
        </Form>
    </>);
}
