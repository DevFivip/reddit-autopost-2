import { Link, Outlet } from "@remix-run/react";
const filePath = "routes/actors.tsx";

export default function DashboardClienteLayout() {
  return (
    <>
      {" Esto es el Layout"} <br /> {"Clientes dentro de Dashboard :"}{" "}
      {filePath} <br /> <br />
      <ul>
        <li>
          <Link to="adolfo">Adolfo </Link>{" "}
        </li>
        <li>
          <Link to="guillermo">guillermo </Link>{" "}
        </li>
      </ul>
      <Outlet />
    </>
  );
}
