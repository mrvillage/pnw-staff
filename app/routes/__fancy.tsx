import { Outlet } from "@remix-run/react";
import { Background } from "~/components/Background";

export default function Main() {
  return (
    <>
      {/* <Background /> */}
      <Outlet />
    </>
  );
}
