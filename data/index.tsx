import AutoComplete from "@/components/AutoComplete";
import TableFinalForm from "@/components/Table";
import dynamic from 'next/dynamic';
const TableFinalFormNoSSR = dynamic(() => import('@/components/Table'), { ssr: false });
export const tabsData = [
    {
        title: "Search",
        value: "search",
        content: (
            <div>

                <AutoComplete />
            </div>
        ),
    },
    {
        title: "My Library",
        value: "mylibrary",
        content: (
            <div>
                <TableFinalFormNoSSR />
            </div>
        ),
    },

];