"use client"
import { Tabs } from "@/components/ui/tabs";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { tabsData } from "@/data";
import { useEffect, useState } from "react";
import { useAuthStore } from "./store";

export default function Home() {
  const currentAuth = useAuthStore((state) => state.currentAuth)
  const [key, setKey] = useState(0);
  const reloadComponent = () => {
    setKey(prevKey => prevKey + 1);
  };
  useEffect(() => {
    reloadComponent()
  }, [currentAuth])
  return (
    <main className="relative bg-black-100 justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
      <div className="w-full">
        <FloatingNav />
        <div className="h-10" />

        <div className="h-screen relative [perspective:1000px] flex flex-col w-full mx-auto items-start justify-start ">
          <Tabs key={key} tabs={tabsData} />
        </div>
      </div>

    </main>
  );
}


