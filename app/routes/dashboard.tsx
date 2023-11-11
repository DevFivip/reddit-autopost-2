import { Outlet, Form, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, ActionFunctionArgs, redirect } from "@remix-run/node";
import { Layout } from "~/partials/Layout";
import authenticator from "~/services/auth.server";
// import { AutorizeUser } from "~/models/usuarios";
import { getAutorizeUser } from "~/middlewares/getAutorizeUser";

import { AuthUser } from "prisma/types/user";

export async function loader({ request }: LoaderFunctionArgs) {
  const user: AuthUser | null = await getAutorizeUser(request)
  if (user === null) throw new Error('Usuario no autenticado') && redirect('/login');
  return { user };
}

export default function DashboardLayout() {
  const { user }: { user: AuthUser } = useLoaderData();
  // console.log('USUARO',data)
  return (<Layout usuario={user}><Outlet /></Layout>);
}
export const action = async ({ request }: ActionFunctionArgs): Promise<void> => {
  await authenticator.logout(request, { redirectTo: "/login" });
};