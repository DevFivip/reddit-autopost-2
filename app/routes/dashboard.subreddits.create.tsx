
import { Form, useLoaderData } from '@remix-run/react';

import { redirect } from "@remix-run/node"; // or cloudflare/deno

import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { ComponentSubredditFormulario } from '~/components/subreddits/formulario'

// import { AutorizeUser } from '~/models/usuarios';
import { getAutorizeUser } from '~/middlewares/getAutorizeUser';
import { CreateSubreddit } from 'prisma/types/subreddit';
import { create } from 'prisma/subreddit';
import { AuthUser } from 'prisma/types/user';


export async function loader({ request }: LoaderFunctionArgs) {
    const user: AuthUser | null = await getAutorizeUser(request)
    if (user === null) throw new Error('Usuario no autenticado')
    return { user };
}


export default function DashboardClienteCreate() {
    const { user } = useLoaderData<typeof loader>();
    return (<>
        <Form method="POST" >
            <ComponentSubredditFormulario modoEdicion={false} usuario={user} />
        </Form>
    </>);
}


export const action = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData();
    const cliente: CreateSubreddit = {
        user_id: parseInt(form.get('user_id') as string),
        firstName: form.get('firstName') as string,
        lastName: form.get('lastName') as string,
        email: form.get('email') as string,
        tags: form.get('tags') as string,
        reddit_username: form.get('reddit_username') as string,
        reddit_password: form.get('reddit_password') as string,
        reddit_clientId: form.get('reddit_clientId') as string,
        reddit_clientSecret: form.get('reddit_clientSecret') as string,
        imgur_username: form.get('imgur_username') as string,
        imgur_password: form.get('imgur_password') as string,
        imgur_clientId: form.get('imgur_clientId') as string,
        imgur_clientSecret: form.get('imgur_clientSecret') as string,
        telegram_channel: form.get('telegram_channel') as string
    }
    await create(cliente)
    return redirect(`/dashboard/subreddits`);
};
