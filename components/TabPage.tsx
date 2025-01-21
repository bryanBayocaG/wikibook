"use client"
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import AutoComplete from "./AutoComplete";
import dynamic from "next/dynamic";
const TableFinalFormNoSSR = dynamic(() => import('@/components/Table'), { ssr: false });
export default function TabPage() {
    return (
        <div className="flex w-full flex-col mt-10">
            <Tabs aria-label="Options" color="warning">
                <Tab key="search" title="Search">
                    <Card className="h-[70svh]">
                        <CardBody>
                            <AutoComplete />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="mylibrary" title="My library">
                    <Card className="h-[65svh] lg:h-[70svh]">
                        <CardBody>
                            <TableFinalFormNoSSR />
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}
