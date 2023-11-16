
import { Form, useLoaderData } from '@remix-run/react';

import { NodeOnDiskFile, redirect, unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node"; // or cloudflare/deno

import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';

// import { AutorizeUser } from '~/models/usuarios';
import { getAutorizeUser } from '~/middlewares/getAutorizeUser';
import { getAll } from 'prisma/subreddit';
import { getAll as getAllCustomers } from 'prisma/customer';
// import { CreatePost } from 'prisma/types/post';
import { AuthUser } from 'prisma/types/user';
import { ComponentPostFormulario } from '~/components/post/formulario';
import { ComponentPostFormulario2 } from '~/components/post/formulario2';
import { Customer, Subreddit } from '@prisma/client';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
// import { create } from "prisma/posts"


export async function loader({ request }: LoaderFunctionArgs) {
    const user: AuthUser | null = await getAutorizeUser(request)
    if (user === null) throw new Error('Usuario no autenticado')
    const subreddits: Subreddit[] = await getAll();
    const customers: Customer[] = await getAllCustomers({ where: { user_id: user.id } });
    return { user, subreddits, customers };
}

export interface formFile {
    contenido: string | null
    titulo: string | null
    media_file: File | null
}

export default function DashboardPostCreate() {
    const { user, subreddits, customers } = useLoaderData<typeof loader>();

    const [state, setState] = useState<formFile>({
        contenido: null,
        titulo: null,
        media_file: null,
    });

    const send = async () => {
        let formData = new FormData()
        Object.keys(state).forEach(s => {
            formData.append(s, state[s]);
        });

        console.log(formData);

        try {
            const response = await fetch('/dashboard/posts/create', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Éxito en la subida del archivo');
            } else {
                console.error('Error en la subida del archivo');
            }
        } catch (error: any) {
            console.error('Error en la solicitud:', error.message);
        }


    }

    // console.log(user,subreddits,customers);
    return (<>
        <pre>{JSON.stringify(state)}</pre>
        <Form method="post" encType='multipart/form-data'>
            <ComponentPostFormulario modoEdicion={false} usuario={user} subreddits={subreddits} customers={customers} changeState={setState} formState={state} />
            {/* <ComponentPostFormulario2 /> */}
            <Button onClick={(e) => { e.preventDefault(); send() }} > ENVIAR xd</Button>
        </Form>
    </>);
}


export const action = async ({ request }: ActionFunctionArgs) => {


    const getCurrentUnixTimestamp = () => {
        return Math.floor(new Date().getTime() / 1000);
    }

    const uploadHandler = unstable_createFileUploadHandler({
        avoidFileConflicts: true,
        maxPartSize: 5_000_000,
        directory: './public/uploads',
        file: ({ filename }) => `${getCurrentUnixTimestamp()}_${filename}`,
    });


    const formDataFile = await unstable_parseMultipartFormData(request, uploadHandler);

    console.log('##################################################')
    console.log('##################################################')
    console.log('##################################################')
    console.log('##################################################')
    const obbj = Object.fromEntries(formDataFile);
    console.log(obbj);
    console.log('##################################################')
    console.log('##################################################')
    console.log('##################################################')
    console.log('##################################################')


    //     // const media_file = formDataFile.get("media_file") as NodeOnDiskFile;
    //     // const titulo = formDataFile.get('titulo');
    //     // console.log({ media_file }, { titulo })

    //     // const post: CreatePost = {
    //     //     titulo: formDataFile.get('titulo') as string,
    //     //     contenido: formDataFile.get('contenido') as string,
    //     //     imagen_name: `./public/uploads/${media_file?.name}`,
    //     //     customer_id: parseInt(formDataFile.get('customer_id') as string),
    //     //     user_id: parseInt(formDataFile.get('user_id') as string),
    //     //     subreddit_id: parseInt(formDataFile.get('subreddit_id') as string),
    //     //     postedAt: new Date(formDataFile.get('postedAt') as string),
    //     // }
    //     // console.log(post)
    //     // await create(post);
    //     // const form = await request.formData();
    //     // const subreddit: CreateSubreddit = {
    //     //     nombre: form.get('nombre') as string,
    //     //     tags: form.get('tags') as string,
    //     //     verificacion: Boolean(form.get('verificacion')),
    //     // }

    //     // await create(subreddit)
    return redirect(`/dashboard/posts`);
};
