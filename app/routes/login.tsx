import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import authenticator from "~/services/auth.server";
import { sessionStorage } from "~/services/session.server";

export const action = async ({ request, context }: ActionFunctionArgs) => {
    const resp = await authenticator.authenticate("form", request, {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        throwOnError: true,
        context,
    });
    console.log(resp);
    return resp;
};

/**
 * get the cookie and see if there are any errors that were
 * generated when attempting to login
 *
 * @param param0
 * @returns
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {

    await authenticator.isAuthenticated(request, {
        successRedirect: "/dashboard"
    });

    const session = await sessionStorage.getSession(
        request.headers.get("Cookie")
    );

    const error = session.get("sessionErrorKey");
    return json<any>({ error });
};

/**
 *
 * @returns
 */
export default function LoginPage() {
    // if i got an error it will come back with the loader data
    const loaderData = useLoaderData();
    console.log(loaderData);
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
            <h1>Welcome to Remix-Auth Example</h1>
            <p>
                Based on the Form Strategy From{" "}
                <a href="https://github.com/sergiodxa/remix-auth" target={"_window"}>
                    Remix-Auth Project
                </a>
            </p>
            <Form method="post">
                <input type="email" name="email" placeholder="email" required />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    autoComplete="current-password"
                />
                <button>Sign In</button>
            </Form>
            <div>
                {loaderData?.error ? <p>ERROR: {loaderData?.error?.message}</p> : null}
            </div>
        </div>
    );
}