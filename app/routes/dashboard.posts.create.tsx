
import { Form, useLoaderData } from '@remix-run/react';

import { redirect } from "@remix-run/node"; // or cloudflare/deno

import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

// import { AutorizeUser } from '~/models/usuarios';
import { getAutorizeUser } from '~/middlewares/getAutorizeUser';
import { CreateSubreddit } from 'prisma/types/subreddit';
import { create } from 'prisma/subreddit';
import { AuthUser } from 'prisma/types/user';
import { ComponentPostFormulario } from '~/components/post/formulario';


export async function loader({ request }: LoaderFunctionArgs) {
    const user: AuthUser | null = await getAutorizeUser(request)
    if (user === null) throw new Error('Usuario no autenticado')
    return { user };
}


export default function DashboardPostCreate() {
    const { user } = useLoaderData<typeof loader>();
    return (<>
        <Form method="POST" >
            <ComponentPostFormulario modoEdicion={false} usuario={user} />
        </Form>
    </>);
}

export const action = async ({ request }: ActionFunctionArgs) => {
    
    const form = await request.formData();
    const subreddit: CreateSubreddit = {
        nombre: form.get('nombre') as string,
        tags: form.get('tags') as string,
        verificacion: Boolean(form.get('verificacion')),
    }

    await create(subreddit)
    return redirect(`/dashboard/subreddits`);
};
