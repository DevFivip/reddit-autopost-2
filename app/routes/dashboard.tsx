import { Outlet, Form, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Layout } from "~/partials/Layout";
import authenticator from "~/services/auth.server";
import { User } from "~/services/session.server";


export const loader = async ({ request }: LoaderFunctionArgs): Promise<User | null> => {
  const res : User =  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return res;
};

export const action = async ({ request }:ActionFunctionArgs): Promise<void> => {
  await authenticator.logout(request, { redirectTo: "/login" });
};


export default function DashboardLayout() {
  const data: User = useLoaderData();
  return (<Layout usuario={data}><Outlet />
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix Protected Dashboard</h1>
      <p>{data?.name} {data?.token}</p>
      <Form method="post">
        <button>Log Out</button>
      </Form>
    </div>

  </Layout>);
}
