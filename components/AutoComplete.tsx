"use client"
import { useAuthStore } from "@/app/store";
import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { Button } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Chip } from "@heroui/react";
import { IoSearch } from "react-icons/io5";
import AnswerCard from "./AnswerCard";

type Word = {
    label: string;
    key: number;
    description: string;
    from: string;
};

interface ResultItem {
    id: string;
    name: string;
    definition: string;
    [key: string]: string | number | boolean;
    from: string;
}

export default function AutoComplete() {
    const searchRef = useRef<HTMLInputElement>(null);
    const currentAuth = useAuthStore((state) => state.currentAuth)
    const currentAuthId = useAuthStore((state) => state.currentAuthId)
    const myQuery = currentAuth ? collection(db, `Users/${currentAuthId}/wordsAndDef`) : null;
    const [value] = useCollection(myQuery);

    const [results, setResults] = useState<ResultItem[]>([]);
    const [error, setError] = useState("");

    const [words, setWords] = useState<Word[]>([
        { label: "Bryan Bayoca", key: 1, description: "A fresh grad web developer who created this app.", from: "default" },
        { label: "WikiPok", key: 2, description: "A mobile responsive web app that acts as a personal library for words and deifinition where user can add words with definition and can get the definition of it or vise versa.", from: "default" },


    ]);

    const [decription, setDecription] = useState<Word[]>([
        { label: "A fresh grad web developer who created this app.", key: 4, description: "Bryan Bayoca", from: "default" },
        { label: "A mobile responsive web app that acts as a personal library for words and deifinition where user can add words with definition and can get the definition of it or vise versa.", key: 5, description: "Wikipok", from: "default" },


    ]);

    useEffect(() => {
        if (value) {
            const newWords: Word[] = value.docs.map((doc, i) => ({
                key: i,
                label: doc.data().name || "",
                description: doc.data().definition || "",
                from: doc.data().from || "",
            }));
            const newDesciptions: Word[] = value.docs.map((doc, i) => ({
                key: i + Math.random(),
                label: doc.data().definition || "",
                description: doc.data().name || "",
                from: doc.data().from || "",
            }));
            setWords(newWords);
            setDecription(newDesciptions);
        }
    }, [value]);

    const HandleOnClick = async (): Promise<ResultItem[]> => {
        if (searchRef?.current?.value) {
            const searchValue = searchRef.current.value;

            if (currentAuth) {
                try {
                    const collectionRef = collection(db, `Users/${currentAuthId}/wordsAndDef`);
                    let searchQuery = query(collectionRef, where("name", "==", searchValue));
                    let snapshot = await getDocs(searchQuery);

                    if (!snapshot.empty) {
                        const results = snapshot.docs.map(doc => ({
                            id: doc.id,
                            name: doc.data().name || "",
                            definition: doc.data().definition || "",
                            from: "word",
                            ...doc.data()
                        }));
                        return results;
                    } else {
                        searchQuery = query(collectionRef, where("definition", "==", searchValue));
                        snapshot = await getDocs(searchQuery);
                        if (!snapshot.empty) {
                            const results = snapshot.docs.map(doc => ({
                                id: doc.id,
                                name: doc.data().name || "",//+
                                definition: doc.data().definition || "",//+
                                from: "definition",
                                ...doc.data()
                            }));
                            return results;
                        } else {
                            return [];
                        }
                    }
                } catch (error) {
                    console.error("Error executing query:", error);
                    throw error;
                }
            } else {
                throw new Error('"Sign in" to use this feature or use "My Library" instead.');
            }
        } else {
            throw new Error('No "word" or "definition" is searched.');
        }
    };

    const onSearchClick = async () => {
        try {
            const fetchedResults = await HandleOnClick();
            setResults(fetchedResults);
            setError("");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    const [searchReference, setSearchReference] = useState<string>("");

    useEffect(() => {
        if (results.length > 0) {
            setSearchReference(results[0].from);
        }
    }, [results]);

    const combinedItems = [...words, ...decription]
    return (
        <>
            <div className="relative w-full p-1 flex gap-3">
                <div className="w-1/12">

                </div>
                <Autocomplete
                    ref={searchRef}
                    allowsCustomValue
                    className="w-9/12"
                    defaultItems={combinedItems}
                    label="Search a word or description..."
                    variant="bordered"
                    required
                >
                    {(item) =>
                        <AutocompleteItem key={item.key}>
                            {item.label}
                        </AutocompleteItem>
                    }
                </Autocomplete>
                <div className="rounded-2xl h-full w-1/12 md:w-28 bg-transparent right-0">
                    <Button color="warning" className="w-full h-14" onPress={() => onSearchClick()} >
                        <IoSearch className="w-5 h-5 md:w-10 md:h-10 dark:text-white" />
                    </Button>
                </div>
                <div className="w-1/12">

                </div>
            </div>
            <div>
                {error &&
                    <div className="flex justify-center mt-10">
                        <Chip size="lg" color="warning">{error}</Chip>
                    </div>
                }
                {
                    results.length > 0 ? (
                        results.map((result, i) => (
                            <AnswerCard key={i}
                                word={result.name}
                                definition={result.definition}
                                from={searchReference}
                            />
                        ))
                    ) : (
                        <div></div>
                    )
                }
            </div>
        </>
    );
}