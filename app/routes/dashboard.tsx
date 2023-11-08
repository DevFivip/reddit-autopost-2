import { Outlet } from "@remix-run/react";

const filePath = "routes/dashboard.tsx";

export default function DashboardLayout() {
  return (<> {' Esto es el Layout'} <br /> {'Dashboard:'} {filePath} <br /> <br /> <Outlet /></>);
}
