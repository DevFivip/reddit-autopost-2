import { Outlet, Link } from "@remix-run/react";
import { Layout } from "~/partials/Layout";

export default function DashboardLayout() {
  return (<Layout><Outlet /></Layout>);
}
