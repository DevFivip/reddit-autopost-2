import { Outlet } from "@remix-run/react";

const filePath = "routes/dashboard.tsx";

export default function DashboardClienteLayout() {
  return (<> {' Esto es el Layout'} <br /> {'Dashboard-Cliente:'} {filePath} <br /> <br /> <Outlet /></>);
}
