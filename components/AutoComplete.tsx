"use client"
import { useAuthStore } from "@/app/store";
import { db } from "@/utils/firebase";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import AnswerCard from "./AnswerCard";

type Word = {
    label: string;
    key: number;
    description: string;
};

interface ResultItem {
    id: string;
    name: string;
    definition: string;
    [key: string]: any; // For any additional properties
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
                            name: doc.data().name || "",//+
                            definition: doc.data().definition || "",//+
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
                throw new Error("User is not authenticated.");
            }
        } else {
            throw new Error("searchRef is null or empty.");
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

    const combinedItems = [...words, ...decription]

    return (
        <>

            <div className="relative p-1 flex">
                <Autocomplete
                    ref={searchRef}
                    allowsCustomValue
                    className="w-full"
                    defaultItems={combinedItems}
                    label="Search a word or description..."
                    variant="bordered"
                >
                    {(item) =>
                        <AutocompleteItem key={item.key}>
                            {item.label}
                        </AutocompleteItem>
                    }

                </Autocomplete>
                <div className="absolute bottom-0 rounded-2xl h-full w-28 bg-transparent right-0">
                    <Button className="w-full h-full" onPress={() => onSearchClick()} color="primary">Search</Button>

                </div>


            </div>
            <div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <ul>
                    {results.length > 0 ? (
                        results.map((result, i) => (
                            <li key={i}>
                                <strong>{result.name}</strong>: {result.definition}
                            </li>
                        ))
                    ) : (
                        <p>No results found.</p>
                    )}
                </ul>
                <AnswerCard />
            </div>
        </>
    );
}