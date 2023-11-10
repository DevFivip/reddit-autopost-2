import { Container } from "@chakra-ui/react";
import AsideBar from "~/partials/AsideBar";
// import Navbar from "~/partials/Navbar";

export function Layout({ children, usuario }: any) {
  return (
    <>
      {/* <Navbar /> */}
      <AsideBar usuario={usuario}>
        {children}
      </AsideBar >

    </>
  )
}