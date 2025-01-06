"use client"
import React, { useEffect } from 'react';
import { useState } from "react";
import { motion } from "framer-motion";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from 'next-themes'
import { useThemeStore } from '@/app/store';
const ModeSwitch = () => {
    const { setTheme } = useTheme()
    const [isOn, setIsOn] = useState(false);
    const themeLight = useThemeStore((state) => state.themeLight);
    const themeDark = useThemeStore((state) => state.themeDark);


    useEffect(() => {
        if (isOn) {
            setTheme("light");
            themeLight();
        } else {
            setTheme("dark");
            themeDark();
        }

    }, [isOn, setTheme, themeLight, themeDark]);
    const toggleSwitch = () => setIsOn(!isOn);
    return (
        <div className={`switch w-24 h-7 md:w-[75px] md:h-9 lg:w-20 lg:h-10 flex items-center rounded-full my-auto bg-gray-700 p-1 cursor-pointer ${isOn ? "justify-end" : "justify-start"}`} data-ison={isOn} onClick={toggleSwitch}>
            <motion.div className="w-[25px] h-[20px] md:w-[30px] md:h-[25px] lg:w-[35px] lg:h-[30px] bg-white rounded-[40px] flex items-center justify-center" layout transition={spring} >
                {
                    isOn ?
                        <MdOutlineDarkMode /> :
                        <IoSunnyOutline className='text-black' />
                }
            </motion.div>
        </div>
    )
}
const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

export default ModeSwitch
