import { Outlet, Link, ActionFunction, Form, LoaderFunction, useLoaderData } from "@remix-run/react";

import { Layout } from "~/partials/Layout";
import authenticator from "~/services/auth.server";


export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export const action: ActionFunction = async ({ request }) => {
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
