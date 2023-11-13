
import { Form, useLoaderData } from '@remix-run/react';

import { redirect } from "@remix-run/node"; // or cloudflare/deno

import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

// import { AutorizeUser } from '~/models/usuarios';
import { getAutorizeUser } from '~/middlewares/getAutorizeUser';
import { CreateSubreddit } from 'prisma/types/subreddit';
import { getAll } from 'prisma/subreddit';
import { getAll as getAllCustomers } from 'prisma/customer';
import { AuthUser } from 'prisma/types/user';
import { ComponentPostFormulario } from '~/components/post/formulario';
import { Customer, Subreddit } from '@prisma/client';


export async function loader({ request }: LoaderFunctionArgs) {
    const user: AuthUser | null = await getAutorizeUser(request)
    if (user === null) throw new Error('Usuario no autenticado')

    const subreddits: Subreddit[] = await getAll();
    const customers: Customer[] = await getAllCustomers({where:{user_id:user.id}});

    return { user, subreddits ,customers};
}


export default function DashboardPostCreate() {
    const { user,subreddits,customers } = useLoaderData<typeof loader>();
    return (<>
        <Form method="POST" >
            <ComponentPostFormulario modoEdicion={false} usuario={user} subreddits={subreddits} customers={customers}  />
        </Form>
    </>);
}

export const action = async ({ request }: ActionFunctionArgs) => {
    
    // const form = await request.formData();
    // const subreddit: CreateSubreddit = {
    //     nombre: form.get('nombre') as string,
    //     tags: form.get('tags') as string,
    //     verificacion: Boolean(form.get('verificacion')),
    // }

    // await create(subreddit)
    return redirect(`/dashboard/subreddits`);
};
