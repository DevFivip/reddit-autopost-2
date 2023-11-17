
import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { findByCustomerId } from 'prisma/events';
import { AuthUser } from 'prisma/types/user';

import { getAutorizeUser } from '~/middlewares/getAutorizeUser';

export async function loader({ request, params }: LoaderFunctionArgs) {
    const idCliente = parseInt(params.idCliente as string);
    const user: AuthUser | null = await getAutorizeUser(request)
    if (user === null) throw new Error('Usuario no autenticado')

    let events = await findByCustomerId(idCliente);

    const _events = events.map((e, k) => {

        const _color = !e.post ? 'black' : (e.post.status ? 'cian' : '#32cd32');

        let ne = {
            color: _color,
            title: `${e.subreddit.nombre} ${e.customer.firstName} ${e.subreddit.tags}`,
            start: e.fechaAt,
            // end: e.fechaAt,
        }
        return (ne)
    })

    return json(_events);
}