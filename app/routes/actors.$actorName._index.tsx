import { Outlet } from "@remix-run/react";

const filePath = "routes/actors.$actorName._index.tsx";

export default function ActorsCommonActornamePage() {
  return (<>{'actores:'} {filePath}</>);
}
