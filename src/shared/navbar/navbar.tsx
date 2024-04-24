import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
 
 
import Image from "next/image";
import { ModeToggle } from "@/components/themeProvider/toggleTheme";
export default function NavigationBar() {
  return (
    <Navbar className="">
      <NavbarBrand className="cursor-pointer space-x-1">
        <Link href="/">
        <Image src="/logoonly.svg" width={40} height={40} alt="logo" className=""/>
          <p className="font-bold font font-serif text-2xl ">MUSIX</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Tools
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
             Convert
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem> */}
        {/* <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
        <ModeToggle/>
      </NavbarContent>
    </Navbar>
  );
}
