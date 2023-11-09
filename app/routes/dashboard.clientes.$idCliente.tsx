import { Form, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json, ActionFunctionArgs, redirect } from "@remix-run/node";
import { ComponentClienteFormulario } from "~/components/clientes/formulario";
import { findOne, TypeUsuarios, update } from "~/models/usuario";


export async function loader({ params }: LoaderFunctionArgs) {
    const id = params.idCliente as string;
    const usuario = await findOne(id);
    if (!usuario) throw new Response("Usuario no encontrado", { status: 404 });
    return json(usuario);
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData();
    const idValue = form.get('id');
    const usuario: TypeUsuarios = {
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
    console.log(usuario);
    await update(usuario.id, usuario);
    return redirect(`/dashboard/clientes`);
};



export default function DashboardClienteEdit() {
    const user = useLoaderData<typeof loader>();
    return (<Form method="POST" action={`/dashboard/clientes/${user.id}`} >
        <ComponentClienteFormulario modoEdicion={true} usuarioEditar={user} />
    </Form>);
}
