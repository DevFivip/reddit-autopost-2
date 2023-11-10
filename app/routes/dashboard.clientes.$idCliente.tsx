import { Form, useLoaderData, useParams } from "@remix-run/react";
import { LoaderFunctionArgs, json, ActionFunctionArgs, redirect } from "@remix-run/node";
import { ComponentClienteFormulario } from "~/components/clientes/formulario";
import { findOne, TypeCliente, update, remove } from "~/models/cliente";


export async function loader({ params }: LoaderFunctionArgs) {
    const id = params.idCliente as string;
    const cliente = await findOne(id);
    if (!cliente) throw new Response("cliente no encontrado", { status: 404 });
    return json(cliente);
}

export const action = async ({ request, params }: ActionFunctionArgs) => {

    switch (request.method) {
        case 'POST': // editar
            const form = await request.formData();
            const idValue = form.get('id');
            const cliente: TypeCliente = {
                id: parseInt(idValue as string),
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
            await update(cliente.id, cliente);
            return redirect(`/dashboard/clientes`);
            break;
        case 'DELETE': // editar
            const cliente_id = params.idCliente || '';
            await remove(cliente_id);
            return json({ message: 'Cliente eliminado' });
            break;

        default:
            break;
    }

};



export default function DashboardClienteEdit() {
    const client = useLoaderData<typeof loader>();
    return (<Form method="POST" action={`/dashboard/clientes/${client.id}`} >
        <ComponentClienteFormulario modoEdicion={true} clienteEditar={client} />
    </Form>);
}
