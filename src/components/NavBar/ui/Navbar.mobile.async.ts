import { lazy } from "react";

export default lazy(async function NavbarMobileAsync() {
  return await import("./Navbar.mobile");
});
