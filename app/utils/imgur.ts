import axios from "axios";
import fs from "fs";
import FormData from 'form-data'
import { __dirname } from "./dirname";

export const send = (file: string) => {
    return new Promise((suc, rej) => {

        // Configura las credenciales de tu aplicación de Imgur
        const clientID = 'af73248f925aee4';
        const clientSecret = 'c98933c0db33fab316a66e9d8c33b8a537a02c41';

        // Lee la imagen que deseas cargar (reemplaza con la ruta de tu imagen)
        const imageBuffer = fs.readFileSync(__dirname(import.meta.url) + "/../../public/" + file);

        // Configura los datos del formulario para la carga de imagen
        const formData = new FormData();
        formData.append('image', imageBuffer);

        // Realiza la solicitud de carga de imagen a Imgur
        axios({
            method: 'post',
            url: 'https://api.imgur.com/3/image',
            headers: {
                'Authorization': `Client-ID ${clientID}`,
                ...formData.getHeaders(),
            },
            data: formData,
        })
            .then((response) => {
                console.log('La imagen se ha cargado correctamente:');
                console.log(response.data.data.link);
                suc(response.data.data.link)
            })
            .catch((error) => {
                rej(false);
                console.error('Error al cargar la imagen:', error.response.data);
            });
    });
}


