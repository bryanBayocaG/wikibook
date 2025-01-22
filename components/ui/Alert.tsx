"use client"
import { useThemeStore } from '@/app/store';
import React from 'react'
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Alert = () => {
    const isItDark = useThemeStore((state) => state.themeIsDark)
    return (
        <ToastContainer
            position="bottom-left"
            autoClose={1200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={isItDark ? "dark" : "light"}
            transition={Bounce}
        />
    )
}

export default Alert