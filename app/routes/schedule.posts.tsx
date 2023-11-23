
import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { findByCustomerId } from 'prisma/events';
import { getCommingToPost, updateSuccesPost } from 'prisma/posts';
import { AuthUser } from 'prisma/types/user';
import { send } from '~/utils/imgur';
import { reddit } from '~/utils/snoowrap';
import { mark } from '~/utils/watermark';


export async function loader({ request, params }: LoaderFunctionArgs) {

    const post = await getCommingToPost();
    const comming = post[0];

    if (!comming) {
        return json({ msg: 'no hay post pendientes' })
    }

    const dir = comming.imagen_name;
    const img_dir: string = await mark(dir, `u/${comming.customer.reddit_username}`) as string

    const imagen_link_imgur = await send(img_dir);

    console.log({ img_dir, imagen_link_imgur });

    const res = await reddit(comming.titulo, imagen_link_imgur, comming.subreddit.nombre, comming.customer);
    if (res.status) {
        await updateSuccesPost(comming.id, 2, res.name);
    } else {
        await updateSuccesPost(comming.id, 3, null);
    }

    return json(comming);
}