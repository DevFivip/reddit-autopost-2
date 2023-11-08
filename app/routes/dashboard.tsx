import { Outlet } from "@remix-run/react";
import { Layout } from "~/partials/Layout";

const filePath = "routes/dashboard.tsx";

export default function DashboardLayout() {
  return (<Layout><> {' Esto es el Layout'} <br /> {'Dashboard:'} {filePath} <br /> <br /> <Outlet /> </></Layout>);
}
