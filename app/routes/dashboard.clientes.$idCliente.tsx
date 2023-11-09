import { Form, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import {ComponentClienteFormulario} from "~/components/clientes/formulario";
import { findOne } from "~/models/usuario";


export async function loader({ params }: LoaderFunctionArgs) {
    const id = params.idCliente as string;
    const usuario = await findOne(id);
    if (!usuario) throw new Response("Usuario no encontrado", { status: 404 });
    return json(usuario);
}


export default function DashboardClienteEdit() {
    const user = useLoaderData<typeof loader>();
    console.log(user)
    return (<Form method="POST" >
        <ComponentClienteFormulario modoEdicion={true} usuarioEditar={user} />
    </Form>);
}
