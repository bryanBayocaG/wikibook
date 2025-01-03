"use client";
import {
    motion,
    AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import UserIcon from "../UserIcon";
import ModalButton from "./Modal";
import { useAuthStore, useThemeStore } from "@/app/store";

const ModeSwitchNoSSR = dynamic(
    () => import('@/components/ModeSwitch'),
    { ssr: false }
)
export const FloatingNav = ({
    className,
}: {

    className?: string;
}) => {
    const visible = true;
    const itsZero = false;
    const currentAuth = useAuthStore((state) => state.currentAuth)
    const currentTheme = useThemeStore((state) => state.theme)
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    `flex rounded-2xl inset-x-0 mx-10 px-5 py-2 md:py-5 space-x-4  ${itsZero ? "bg-transparent" : " backdrop-blur-[16px] shadow-2xl"}`,
                    className
                )}
            >
                <Link href="/" className={cn("w-4/12 items-center flex")}>
                    <Image
                        width={0}
                        height={0}
                        unoptimized
                        className=" w-16 -rotate-12"
                        src={currentTheme === "dark" ? "/wki black.svg" : "/wki white.svg"}
                        alt="Logo"
                    />
                    <p className="mx-3 font-bold hidden md:block rotate-6">WikiPok</p>
                </Link>
                <div className="invisible-space w-6/12"></div>
                <ModeSwitchNoSSR />
                {currentAuth ?
                    <UserIcon /> :
                    <div className="flex items-center justify-center">
                        <ModalButton name={"Sign In"} />
                    </div>
                }
            </motion.div>
        </AnimatePresence>
    );
};
