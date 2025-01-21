"use client"
import { useAuthStore, useThemeStore } from "@/app/store";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import ModalButton from "./Modal";
import UserIcon from "../UserIcon";
const ModeSwitchNoSSR = dynamic(
    () => import('@/components/ModeSwitch'),
    { ssr: false }
)



export default function NavBar() {
    const currentAuth = useAuthStore((state) => state.currentAuth)
    const isDark = useThemeStore((state) => state.themeIsDark)


    return (
        <Navbar position="static" maxWidth="xl">
            <NavbarBrand>
                <div className="flex gap-x-3 items-center">
                    <div className="flex-1">
                        <Image
                            width={40}
                            height={40}
                            unoptimized
                            className="-rotate-45"
                            src={isDark ? "/wki black.svg" : "/wki white.svg"}
                            alt="Logo"
                        />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-inherit rotate-[20deg]">Wiki<span className="text-yellow-600">book</span></p>
                    </div>
                </div>
            </NavbarBrand>
            {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current="page" href="#">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent> */}
            <NavbarContent justify="end">
                <NavbarItem className="lg:flex">
                    <ModeSwitchNoSSR />
                </NavbarItem>
                <NavbarItem>

                    {/* <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button> */}
                    {currentAuth ?
                        <UserIcon /> :
                        <div className="flex items-center justify-center">
                            <ModalButton name={"Sign In"} />
                        </div>
                    }
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
