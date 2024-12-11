"use client"
import React from 'react';
import { useState } from "react";
import { motion } from "framer-motion";
import { IoSunnyOutline } from "react-icons/io5";
import { useTheme } from 'next-themes'
import "./styles.css";
const ModeSwitch = () => {
    const { setTheme } = useTheme()
    const [isOn, setIsOn] = useState(false);


    if (isOn) {
        setTheme('light')
        console.log("let there be light");
    } else {
        setTheme('dark')
        console.log("darkness shall prevail");
    }

    const toggleSwitch = () => setIsOn(!isOn);
    return (
        <div className="switch w-28 h-12 flex items-center rounded-full my-auto" data-ison={isOn} onClick={toggleSwitch}>
            <motion.div className="w-[40px] h-[40px] bg-white rounded-[40px] flex items-center justify-center" layout transition={spring} >
                <IoSunnyOutline className='text-black' />
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
