import AutoComplete from "@/components/AutoComplete";
import TableFinalForm from "@/components/Table";
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
                <TableFinalForm />
            </div>
        ),
    },

];