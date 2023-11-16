import { json, LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import fs from 'fs';
import path from "path";
export const loader = ({ request, params }: LoaderFunctionArgs) => {
    // So you can write this:

    try {
        const idCliente = params.idCliente
        const rutaCarpeta = `./public/uploads/${idCliente}`;
        const archivos = fs.readdirSync(rutaCarpeta);

        // Itera sobre la lista de archivos y filtra solo los archivos (no directorios)
        const archivosFiltrados = archivos.filter(archivo => {
            const rutaCompleta = path.join(rutaCarpeta, archivo);
            return fs.statSync(rutaCompleta).isFile();
        });

        console.log(archivos);
        return json(archivosFiltrados);
    } catch (error) {
        console.log(error);
        return json([]);
    }

};