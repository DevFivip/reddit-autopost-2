import { Outlet } from "@remix-run/react";

const filePath = "routes/actors.tsx";

export default function ActorsLayout() {
  return (<> {' Esto es el Layout'} <br /> {'actores:'} {filePath} <br /> <br /> <Outlet /></>);
}
