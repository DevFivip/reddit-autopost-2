
import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { findByCustomerId, findByPerDay } from 'prisma/events';
import { AuthUser } from 'prisma/types/user';

import { getAutorizeUser } from '~/middlewares/getAutorizeUser';

export async function loader({ request, params }: LoaderFunctionArgs) {

    const url = new URL(request.url);
    const customer_id = parseInt(url.searchParams.get("customer_id") as string);
    const fecha = url.searchParams.get("fecha") as string;
    const events = await findByPerDay(customer_id, fecha);
    return json(events);
}



// export const action = async ({ request }: ActionFunctionArgs) => {


//     console.log(request.method)
//     const form = await request.formData();

//     console.log(form)

//     // const cliente: CreateCustomer = {
//     //     user_id: parseInt(form.get('user_id') as string),
//     //     firstName: form.get('firstName') as string,
//     //     lastName: form.get('lastName') as string,
//     //     email: form.get('email') as string,
//     //     tags: form.get('tags') as string,
//     //     reddit_username: form.get('reddit_username') as string,
//     //     reddit_password: form.get('reddit_password') as string,
//     //     reddit_clientId: form.get('reddit_clientId') as string,
//     //     reddit_clientSecret: form.get('reddit_clientSecret') as string,
//     //     imgur_username: form.get('imgur_username') as string,
//     //     imgur_password: form.get('imgur_password') as string,
//     //     imgur_clientId: form.get('imgur_clientId') as string,
//     //     imgur_clientSecret: form.get('imgur_clientSecret') as string,
//     //     telegram_channel: form.get('telegram_channel') as string
//     // }
//     // await create(cliente)
//     // return redirect(`/dashboard/clientes`);
//     return json({ mgs: 'buenos dias' })
// };
