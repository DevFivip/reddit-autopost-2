
import { Form, useLoaderData } from '@remix-run/react';

import { NodeOnDiskFile, redirect, unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node"; // or cloudflare/deno

import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';

// import { AutorizeUser } from '~/models/usuarios';
import { getAutorizeUser } from '~/middlewares/getAutorizeUser';
import { getAll } from 'prisma/subreddit';
import { getAll as getAllCustomers } from 'prisma/customer';
import { create } from 'prisma/posts';
import { AuthUser } from 'prisma/types/user';
import { ComponentPostFormulario } from '~/components/post/formulario';
import { ComponentPostFormulario2 } from '~/components/post/formulario2';
import { Customer, Post, Subreddit } from '@prisma/client';
import { CreatePost } from 'prisma/types/post';;
import { Button } from '@chakra-ui/react';
import { useState } from 'react';

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

    // console.log(user,subreddits,customers);
    return (<>

        <Form method="post">
            <ComponentPostFormulario modoEdicion={false} usuario={user} subreddits={subreddits} customers={customers} changeState={setState} formState={state} />
        </Form>
    </>);
}


export const action = async ({ request }: ActionFunctionArgs) => {

    const body = await request.formData();
    const post: CreatePost = {
        titulo: body.get('titulo') as string,
        contenido: body.get('contenido') as string,
        imagen_name: body.get('imagen_name') as string,
        customer_id: parseInt(body.get('customer_id') as string),
        user_id: parseInt(body.get('user_id') as string),
        subreddit_id: parseInt(body.get('subreddit_id') as string),
        postedAt: new Date(body.get('postedAt') as string),
    }

    await create(post)
    return redirect(`/dashboard/posts`);
};
