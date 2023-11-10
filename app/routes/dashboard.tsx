import { Outlet, Form, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Layout } from "~/partials/Layout";
import authenticator from "~/services/auth.server";
import { AutorizeUser } from "~/models/usuarios";



export const loader = async ({ request }: LoaderFunctionArgs): Promise<AutorizeUser | string> => {
  console.log('dashboard loader')
  const res : AutorizeUser =  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return res;
};




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
export const action = async ({ request }:ActionFunctionArgs): Promise<void> => {
  await authenticator.logout(request, { redirectTo: "/login" });
};