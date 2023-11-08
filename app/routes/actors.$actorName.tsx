import { Outlet } from "@remix-run/react";

const filePath = "routes/actors.$actorName.tsx";

export default function ActorsCommonActornamePage() {
  return (<>{'actores:'} {filePath}</>);
}
