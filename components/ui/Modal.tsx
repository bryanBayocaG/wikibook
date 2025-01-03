import React, { useEffect, useState, useRef } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Textarea,
} from "@nextui-org/react";
import { PlusIcon } from "./TableSVG";
import { useTheme } from 'next-themes'
import { SignupForm } from "../SignUp";
import { CiUser } from "react-icons/ci";
import { toast } from 'react-toastify';
import { useAuthStore } from "@/app/store";
import { doc, getDoc, setDoc, updateDoc } from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { Capitalize } from "../AnswerCard";



interface Props {
    name: string;
    id?: string;
    word?: string;
    definition?: string;
    onEdit?: () => void;
}

export default function ModalButton({ name, id, word, definition, onEdit }: Props) {
    const wordRef = useRef<HTMLInputElement>(null)
    const definitionRef = useRef<HTMLTextAreaElement>(null)
    const { theme } = useTheme();

    const currentAuth = useAuthStore((state) => state.currentAuth)
    const currentAuthId = useAuthStore((state) => state.currentAuthId)
    const path = `Users/${currentAuthId}/wordsAndDef`;

    const [currentUsage, setCurrentUsage] = useState("");

    useEffect(() => {
        switch (name) {
            case "Sign In":
                setCurrentUsage("signIn");
                break;
            case "Add a word":
                setCurrentUsage("addWord");
                break;
            case "Edit a word":
                setCurrentUsage("editWord");
                break;
        }

    }, [name])

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        if (onEdit) {
            onEdit();
        }
        onOpen();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const wordValue = wordRef?.current?.value.toLowerCase();
            const definitionValue = definitionRef?.current?.value.toLowerCase();

            if (!wordValue || !definitionValue) {
                toast.error("Please fill in both fields.");
                return;
            }
            const docRef = doc(db, path, wordValue)
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                toast.error(`The word "${Capitalize(wordValue)}" already exists.`);
                return;
            }
            await setDoc(docRef, {
                definition: definitionValue,
                name: wordValue,
            }).then(() => {
                toast.success(`Added ${Capitalize(wordValue)} successfully`);
                onClose()
            });

        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else {
                toast.error("An unexpected error occurred");

            }
        }
    };

    const editWord = async () => {
        const wordValue = wordRef ? wordRef?.current?.value.toLowerCase() : "";
        const definitionValue = definitionRef ? definitionRef?.current?.value.toLowerCase() : "";
        const thatword = doc(db, path, id);
        await updateDoc(thatword, { name: wordValue, definiion: definitionValue }).then(() => { toast.success(`${Capitalize(wordValue)} has been deleted.`) });
    }

    return (
        <>
            <div className="flex flex-wrap gap-3">
                {currentUsage === "editWord" ?
                    <button onClick={() => handleOpen()}>Edit</button>
                    :
                    <Button

                        className="capitalize w-full"
                        color={currentUsage === "addWord" ? "primary" : undefined}
                        variant="flat"
                        endContent={currentUsage === "addWord" ? <PlusIcon /> : <CiUser />}
                        onPress={() => handleOpen()}
                    >
                        {name}
                    </Button>
                }

            </div>
            <Modal backdrop="blur" isOpen={isOpen} size="5xl" onClose={onClose}>
                <ModalContent>
                    <>
                        {currentUsage === "signIn" || !currentAuth ? (
                            <SignupForm />
                        ) : currentUsage === "addWord" ? (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Add more Words and definitioin</ModalHeader>
                                <form onSubmit={handleSubmit}>

                                    <ModalBody>
                                        <Input
                                            label="Word"
                                            placeholder="Enter a word"
                                            variant="bordered"
                                            ref={wordRef}
                                        />
                                        <Textarea
                                            ref={definitionRef}
                                            className="col-span-12 md:col-span-6 mb-6 md:mb-0 text-white"
                                            style={{ color: theme === "dark" ? "white" : "black" }}
                                            labelPlacement="outside"
                                            placeholder="Enter your description"
                                            variant="underlined"
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button type="submit" color="primary">
                                            Add the word
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </>
                        ) : currentUsage === "editWord" ? (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Edit the Word and definition</ModalHeader>
                                <form onSubmit={editWord}>

                                    <ModalBody>
                                        <Input
                                            label="Word"
                                            placeholder="Enter a word"
                                            variant="bordered"
                                            ref={wordRef}
                                            value={word ? word : ""}
                                        />
                                        <Textarea
                                            ref={definitionRef}
                                            value={definition ? definition : ""}
                                            className="col-span-12 md:col-span-6 mb-6 md:mb-0 text-white"
                                            style={{ color: theme === "dark" ? "white" : "black" }}
                                            labelPlacement="outside"
                                            placeholder="Enter your description"
                                            variant="underlined"
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button type="submit" color="primary">
                                            Apply changes
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </>
                        ) : (
                            <div></div>
                        )}
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}