import { Container } from "@chakra-ui/react";
import AsideBar from "~/partials/AsideBar";
// import Navbar from "~/partials/Navbar";

export function Layout({ children }: any) {
  return (
    <>


      {/* <Navbar /> */}
      <AsideBar>
        {children}
      </AsideBar >

    </>
  )
}