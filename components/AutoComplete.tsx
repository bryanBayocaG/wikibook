"use client"
import { useAuthStore } from "@/app/store";
import { db } from "@/utils/firebase";
import { collection } from "@firebase/firestore";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Word = {
    label: string;
    key: number;
    description: string;
};



export default function AutoComplete() {
    const currentAuth = useAuthStore((state) => state.currentAuth)
    const currentAuthId = useAuthStore((state) => state.currentAuthId)
    const query = currentAuth ? collection(db, `Users/${currentAuthId}/wordsAndDef`) : null;
    const [value] = useCollection(query);

    const [words, setWords] = useState<Word[]>([
        { label: "Bryan Bayoca", key: 1, description: "A fresh grad web developer who created this app." },
        { label: "WikiPok", key: 2, description: "A mobile responsive web app that acts as a personal library for words and deifinition where user can add words with definition and can get the definition of it or vise versa." },


    ]);

    const [decription, setDecription] = useState<Word[]>([
        { label: "A fresh grad web developer who created this app.", key: 4, description: "Bryan Bayoca" },
        { label: "A mobile responsive web app that acts as a personal library for words and deifinition where user can add words with definition and can get the definition of it or vise versa.", key: 5, description: "Wikipok" },


    ]);

    useEffect(() => {
        if (value) {
            const newWords: Word[] = value.docs.map((doc, i) => ({
                key: i,
                label: doc.data().name || "",
                description: doc.data().definition || "",
            }));
            const newDesciptions: Word[] = value.docs.map((doc, i) => ({
                key: i + Math.random(),
                label: doc.data().definition || "",
                description: doc.data().name || "",
            }));
            setWords(newWords);
            setDecription(newDesciptions);
        }
    }, [value]);

    const combinedItems = [...words, ...decription]

    return (
        <div className="relative p-1 flex">
            <Autocomplete
                isVirtualized
                allowsCustomValue
                className="w-full"
                defaultItems={combinedItems}
                label="Search a word or description..."
                variant="bordered"
            >
                {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}

            </Autocomplete>
            <div className="absolute bottom-0 rounded-2xl h-full w-28 bg-transparent right-0">
                <Button className="w-full h-full" color="primary">Search</Button>

            </div>
        </div>
    );
}