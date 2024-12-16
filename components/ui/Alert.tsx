"use client"
import { useThemeStore } from '@/app/store';
import React from 'react'
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Alert = () => {
    const currentTheme = useThemeStore((state) => state.theme)
    return (
        <ToastContainer
            position="top-center"
            autoClose={1200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={currentTheme}
            transition={Bounce}
        />
    )
}

export default Alert