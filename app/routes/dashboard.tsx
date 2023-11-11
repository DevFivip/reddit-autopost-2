import { Outlet, Form, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Layout } from "~/partials/Layout";
import authenticator from "~/services/auth.server";
import { AutorizeUser } from "~/models/usuarios";
import { getAutorizeUser } from "~/middlewares/getAutorizeUser";

import { AuthUser } from "../../prisma/types/user";



export async function loader({ request }: LoaderFunctionArgs) {
  const user: AuthUser | null = await getAutorizeUser(request)
  if (user === null) throw new Error('Usuario no autenticado')
  return { user };
}




export default function DashboardLayout() {
  const data: AutorizeUser = useLoaderData();
  return (<Layout usuario={data}><Outlet />
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix Protected Dashboard</h1>
      <p>{data?.nombre} {data?.token}</p>
      <Form method="post">
        <button>Log Out</button>
      </Form>
    </div>

  </Layout>);
}
export const action = async ({ request }: ActionFunctionArgs): Promise<void> => {
  await authenticator.logout(request, { redirectTo: "/login" });
};