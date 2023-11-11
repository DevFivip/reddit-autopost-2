import { Form, useLoaderData, useParams } from "@remix-run/react";
import { LoaderFunctionArgs, json, ActionFunctionArgs, redirect } from "@remix-run/node";
import { ComponentSubredditFormulario } from "~/components/subreddits/formulario";

import { getAutorizeUser } from "~/middlewares/getAutorizeUser";

import { findById, update, remove } from "prisma/subreddit";

import { UpdateSubreddit } from "prisma/types/subreddit";

import { AuthUser } from 'prisma/types/user';



export async function loader({ params, request }: LoaderFunctionArgs) {
    const id = params.idSubreddit as string;
    const subreddit: UpdateSubreddit | null = await findById(+id);
    if (!subreddit) throw new Response("subreddit no encontrado", { status: 404 });

    const user: AuthUser | null = await getAutorizeUser(request)
    if (user === null) throw new Error('Usuario no autenticado')
    return { subreddit, user };
}


export default function DashboardSubredditEdit() {
    const { subreddit, user } = useLoaderData<typeof loader>();
    return (<Form method="POST" action={`/dashboard/subreddits/${subreddit.id}`} >
        <ComponentSubredditFormulario modoEdicion={true} subredditEditar={subreddit} usuario={user} />
    </Form>);
}



export const action = async ({ request, params }: ActionFunctionArgs) => {

    switch (request.method) {
        case 'POST': // editar
            const form = await request.formData();
            const idValue = form.get('id');
            const subreddit: UpdateSubreddit = {
                id: parseInt(idValue as string),
                nombre: form.get('nombre') as string,
                tags: form.get('tags') as string,
                verificacion: Boolean(form.get('verificacion')),
            }
            await update(subreddit.id, subreddit);

            return redirect(`/dashboard/subreddits`);
            break;
        case 'DELETE': // Eliminar
            const subreddit_id = params.idSubreddit || '';
            await remove(+subreddit_id);
            return json({ message: 'subreddit eliminado' });
            break;

        default:
            break;
    }

};

