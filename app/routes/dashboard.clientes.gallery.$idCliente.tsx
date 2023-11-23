
import { Form, useLoaderData, useRevalidator } from '@remix-run/react';

import { redirect } from "@remix-run/node"; // or cloudflare/deno

import { ActionFunctionArgs, LoaderFunctionArgs, unstable_createFileUploadHandler, unstable_parseMultipartFormData } from '@remix-run/node';
import { ComponentClienteFormulario } from '~/components/clientes/formulario'

import fs from "fs"
import path from 'path';
// import { AutorizeUser } from '~/models/usuarios';
import { getAutorizeUser } from '~/middlewares/getAutorizeUser';
import { CreateCustomer } from 'prisma/types/customer';
import { create } from 'prisma/customer';
import { AuthUser } from 'prisma/types/user';
import { ComponentClientGallery } from '~/components/gallery/componentClienteGallery';
import { __public } from '~/utils/publicdir';

export const obtenerArchivosEnCarpeta = (rutaCarpeta: string, prefix: string): string[] => {
    // Obtiene la lista de archivos en la carpeta
    console.log(rutaCarpeta)
    if (rutaCarpeta === null) {
        return []
    }
    try {
        const archivos = fs.readdirSync(rutaCarpeta);

        // Itera sobre la lista de archivos y filtra solo los archivos (no directorios)
        const archivosFiltrados = archivos.filter(archivo => {
            const rutaCompleta = path.join(rutaCarpeta, archivo);
            return fs.statSync(rutaCompleta).isFile();
        });
        const files = archivosFiltrados.map((img) => prefix + "/" + img);
        // console.log({ files });
        return files;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
    const id = params.idCliente as string;
    const user: AuthUser | null = await getAutorizeUser(request)
    if (user === null) throw new Error('Usuario no autenticado')

    const pub = __public(id);

    const carpetaEjemplo = pub.public_customer;
    // const assets = pub.public_customer;
    let archivos: string[] = obtenerArchivosEnCarpeta(carpetaEjemplo, pub.prefix);

    console.log({ archivos })
    // archivos = archivos.map((dir) => assets + '/' + dir);

    const idCliente = params.idCliente;
    return { user, archivos, idCliente };
}


export default function DashboardClienteCreate() {

    const { user, archivos, idCliente } = useLoaderData<typeof loader>();
    return (<>
        <ComponentClientGallery modoEdicion={false} usuario={user} archivos={archivos} idCliente={idCliente} />
    </>);
}


export const action = async ({ request, params }: ActionFunctionArgs) => {


    switch (request.method) {
        case 'DELETE':
            const formData = request.formData();
            const dir = (await formData).get('dir') as string;
            fs.unlinkSync('./' + dir);
            return redirect(`/dashboard/clientes/gallery/${params.idCliente}`);
            break;

        case "POST":
            const id = params.idCliente as string;
            const pu = __public(id);

            const getCurrentUnixTimestamp = () => {
                return Math.floor(new Date().getTime() / 1000);
            }

            const uploadHandler = unstable_createFileUploadHandler({
                avoidFileConflicts: true,
                maxPartSize: 5_000_000,
                directory: pu.public_dir_save,
                file: ({ filename }) => `${getCurrentUnixTimestamp()}_${filename}`,
            });


            await unstable_parseMultipartFormData(request, uploadHandler);

            return redirect(`/dashboard/clientes/gallery/${params.idCliente}`);

            break;
        default:


            break;
    }


};
