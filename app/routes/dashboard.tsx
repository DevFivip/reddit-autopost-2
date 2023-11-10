import { Outlet, Form, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Layout } from "~/partials/Layout";
import authenticator from "~/services/auth.server";
import { User } from "~/services/session.server";


export let loader: LoaderFunctionArgs = async ({ request }): Promise<User | null> => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export const action = async ({ request }): Promise<void> => {
  await authenticator.logout(request, { redirectTo: "/login" });
};


export default function DashboardLayout() {
  const data = useLoaderData();
  return (<Layout><Outlet />


    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix Protected Dashboard</h1>
      <p>{data?.name} {data?.token}</p>
      <Form method="post">
        <button>Log Out</button>
      </Form>
    </div>

  </Layout>);
}
