import { json, LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import fs from 'fs';
import path from "path";
import { __public } from "~/utils/publicdir";
export const loader = ({ request, params }: LoaderFunctionArgs) => {
    // So you can write this:

    try {
        const idCliente = params.idCliente as string
        const pub = __public(idCliente);

        const rutaCarpeta = pub.public_customer;
        const archivos = fs.readdirSync(rutaCarpeta);

        // Itera sobre la lista de archivos y filtra solo los archivos (no directorios)
        const archivosFiltrados = archivos.filter(archivo => {
            const rutaCompleta = path.join(rutaCarpeta, archivo);
            return fs.statSync(rutaCompleta).isFile();
        });

        const files = archivosFiltrados.map((file) => pub.prefix + "/" + file);

        return json(files);
    } catch (error) {
        console.log(error);
        return json([]);
    }

};