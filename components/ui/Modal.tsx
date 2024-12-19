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
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { Capitalize } from "../AnswerCard";



interface Props {
    name: string;
}

export default function ModalButton({ name }: Props) {
    const wordRef = useRef<HTMLInputElement>(null)
    const definitionRef = useRef<HTMLTextAreaElement>(null)
    const { theme } = useTheme();

    const currentAuth = useAuthStore((state) => state.currentAuth)
    const currentAuthId = useAuthStore((state) => state.currentAuthId)
    const path = `Users/${currentAuthId}/wordsAndDef`;

    const [currentUsage, setCurrentUsage] = useState("");

    useEffect(() => {
        if (name === "Sign In") {
            setCurrentUsage("signIn")
        } else {
            setCurrentUsage("addWord")
        }
    }, [name])

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
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

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Button

                    className="capitalize"
                    color={currentUsage === "addWord" ? "primary" : undefined}
                    variant="flat"
                    endContent={currentUsage === "addWord" ? <PlusIcon /> : <CiUser />}
                    onPress={() => handleOpen()}
                >
                    {name}
                </Button>
            </div>
            <Modal backdrop="blur" isOpen={isOpen} size="5xl" onClose={onClose}>
                <ModalContent>
                    <>
                        {currentUsage === "signIn" || !currentAuth ? <SignupForm /> :
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
                        }
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}