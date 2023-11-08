import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno

// import styles from "~/styles/dashboard.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: 'https://vikdiesel.github.io/admin-one-bulma-dashboard/css/main.min.css', type: 'text/css' },
  // { rel: "stylesheet", href: 'https://vikdiesel.github.io/admin-one-bulma-dashboard/css/main.min.css', type: 'text/css' },
];


// import bulma from "bulma/css/bulma.css?inline";
// import adminone from "~/styles/styles.css?inline";

<link rel="stylesheet" href="css/main.min.css"></link>


export default function App() {
  return (
    <html lang="en" className="has-aside-left has-aside-mobile-transition has-navbar-fixed-top has-aside-expanded">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <style>{adminone}</style>
        <style>{bulma}</style> */}
        <Meta />
        <Links />
      </head>
      <body>
        <div className="container is-fluid">
          <div id="app">
            <Outlet />
            <ScrollRestoration />
            <LiveReload />
            <Scripts />
            <script type='module' src="https://vikdiesel.github.io/admin-one-bulma-dashboard/js/main.min.js"></script>
            <link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css"></link>
          </div>
        </div>
      </body>
    </html>
  );
}
