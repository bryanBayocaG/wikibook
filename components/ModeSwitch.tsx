"use client"
import React, { useEffect } from 'react';
import { useState } from "react";
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
            setTheme('light')
            themeLight();

        } else {
            setTheme('dark')
            themeDark();

        }

    }, [isOn, setTheme, themeLight, themeDark]);
    const toggleSwitch = () => setIsOn(!isOn);
    return (
        <div className="flex items-center my-auto cursor-pointer hover:text-yellow-300" data-ison={isOn} onClick={toggleSwitch}>
            {
                isOn ?
                    <MdOutlineDarkMode />
                    :
                    <IoSunnyOutline />
            }
        </div>
    )
}


export default ModeSwitch
