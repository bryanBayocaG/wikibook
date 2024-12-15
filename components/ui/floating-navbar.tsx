"use client";
import React from "react";
import {
    motion,
    AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import Image from "next/image";
// import ModeSwitch from "@/components/ModeSwitch";
import dynamic from "next/dynamic";

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
                    `flex rounded-2xl fixed z-[5000] inset-x-0 mx-10 px-5 py-2 md:py-5 space-x-4  ${itsZero ? "bg-transparent" : " backdrop-blur-[16px] shadow-2xl"}`,
                    className
                )}
            >
                <Link href="/" className={cn("w-6/12 items-center flex")}>
                    <Image
                        width={28}
                        height={0}
                        unoptimized
                        className=" w-28"
                        src="/BryanLogo.png"
                        alt="Logo"
                    />
                </Link>
                <div className="invisible-space w-6/12"></div>
                <ModeSwitchNoSSR />
                <a href="/my_library">Lib</a>
                <a
                    href="https://github.com/bryanBayocaG"
                    rel="noopener noreferrer"
                    target="_blank"
                    className={cn(
                        "relative items-center flex space-x-1  dark:hover:text-neutral-300 hover:text-neutral-500"
                    )}
                >
                    <FaGithub className="w-7 h-7" />
                    <span className="hidden md:block text-sm !cursor-pointer">
                        Github
                    </span>
                </a>
                <a
                    href="https://www.linkedin.com/in/bryan-bayoca"
                    rel="noopener noreferrer"
                    target="_blank"
                    className={cn(
                        "relative items-center flex space-x-1  dark:hover:text-neutral-300 hover:text-neutral-500"
                    )}
                >
                    <CiLinkedin className="w-7 h-7" />
                    <span className="hidden md:block text-sm !cursor-pointer">
                        Linkedin
                    </span>
                </a>
            </motion.div>
        </AnimatePresence>
    );
};
