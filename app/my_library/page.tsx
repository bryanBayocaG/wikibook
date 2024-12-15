// import TableFinalForm from '@/components/Table'
"use client"
import dynamic from 'next/dynamic';
import React from 'react'

const TableFinalFormNoSSR = dynamic(() => import('@/components/Table'), { ssr: false });

const page = () => {
    return (
        <div>
            <TableFinalFormNoSSR />
        </div>
    )
}

export default page
