
import { Form, useLoaderData } from '@remix-run/react';

import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from '@remix-run/node';

// import { AutorizeUser } from '~/models/usuarios';
import { getAutorizeUser } from '~/middlewares/getAutorizeUser';
import { getAll } from 'prisma/subreddit';
import { getAll as getAllCustomers } from 'prisma/customer';
import { create, findById, remove, update, } from 'prisma/posts';
import { AuthUser } from 'prisma/types/user';
import { ComponentPostFormulario } from '~/components/post/formulario';
import { ComponentPostFormulario2 } from '~/components/post/formulario2';
import { Customer, Post, Subreddit } from '@prisma/client';
import { CreatePost, UpdatePost } from 'prisma/types/post';;
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { deletePostStatus, updatePostStatus } from 'prisma/events';

export async function loader({ request, params }: LoaderFunctionArgs) {
    const idPost = params.idPost || 0;
    const user: AuthUser | null = await getAutorizeUser(request)
    if (user === null) throw new Error('Usuario no autenticado')
    const subreddits: Subreddit[] = await getAll();
    const customers: Customer[] = await getAllCustomers({ where: { user_id: user.id } });

    const post: Post = await findById(+idPost);
    return { user, subreddits, customers, post };
}

export interface formFile {
    contenido: string | null
    titulo: string | null
    media_file: File | null
}

export default function DashboardPostEdit() {
    const { user, subreddits, customers, post } = useLoaderData<typeof loader>();

    const [state, setState] = useState<formFile>({
        contenido: null,
        titulo: null,
        media_file: null,
    });

    // console.log(user,subreddits,customers);
    return (<>

        <Form method="PUT">
            <ComponentPostFormulario modoEdicion={false} usuario={user} subreddits={subreddits} customers={customers} changeState={setState} formState={state} postEditar={post} />
            {/* <ComponentPostFormulario2 /> */}
        </Form>
    </>);
}


export const action = async ({ request, params }: ActionFunctionArgs) => {


    console.log()

    switch (request.method) {
        case 'PUT':
            const body = await request.formData();

            const _post: UpdatePost = {
                id: parseInt(body.get('id') as string),
                titulo: body.get('titulo') as string,
                contenido: body.get('contenido') as string,
                imagen_name: body.get('imagen_name') as string,
                customer_id: parseInt(body.get('customer_id') as string),
                user_id: parseInt(body.get('user_id') as string),
                subreddit_id: parseInt(body.get('subreddit_id') as string),
                postedAt: new Date(body.get('postedAt') as string),
            }

            const res: Post = await update(_post.id, _post);
            await updatePostStatus(_post.customer_id, _post.subreddit_id, _post.postedAt, _post.id);

            return redirect(`/dashboard/posts/${_post.id}`);
            break;
        case 'DELETE':

            const id = params.idPost ? parseInt(params.idPost) : 0;
            const po = await remove(id);
            await deletePostStatus(id);
            return json(po);

            break;

        default:
            break;
    }



    // await create(post)
    return redirect(`/dashboard/posts`);
};
