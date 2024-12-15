// import TableFinalForm from '@/components/Table'
"use client"
import { FloatingNav } from '@/components/ui/floating-navbar';
import dynamic from 'next/dynamic';
import React from 'react'

const TableFinalFormNoSSR = dynamic(() => import('@/components/Table'), { ssr: false });

const page = () => {
    return (
        <div>
            <FloatingNav />
            <div className="h-40" />
            <TableFinalFormNoSSR />
        </div>
    )
}

export default page
