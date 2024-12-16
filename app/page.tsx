
import { Tabs } from "@/components/ui/tabs";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { tabsData } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-black-100 justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
      <div className="w-full">
        <FloatingNav />
        <div className="h-10" />

        <div className="h-screen relative [perspective:1000px] flex flex-col w-full mx-auto items-start justify-start ">
          <Tabs tabs={tabsData} />
        </div>
      </div>

    </main>
  );
}


