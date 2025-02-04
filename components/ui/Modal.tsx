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
} from "@heroui/react";
import { PlusIcon } from "./TableSVG";
import { useTheme } from 'next-themes'
import { SignupForm } from "../SignUp";
import { CiUser } from "react-icons/ci";
import { toast } from 'react-toastify';
import { useAuthStore, useWordsStore } from "@/app/store";
import { Capitalize } from "../AnswerCard";

interface Props {
    name: string;
    id?: string;
    word?: string;
    definition?: string;
}

export default function ModalButton({ name }: Props) {
    const wordRef = useRef<HTMLInputElement>(null)
    const definitionRef = useRef<HTMLTextAreaElement>(null)
    const { theme } = useTheme();

    const currentAuth = useAuthStore((state) => state.currentAuth)
    const currentAuthId = useAuthStore((state) => state.currentAuthId)

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

    useEffect(() => {

    }, [])

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    };
    useEffect(() => {
        if (currentAuth) {
            onClose();
        }
    }, [currentAuth, onClose])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const wordValue = wordRef?.current?.value.toLowerCase();
            const definitionValue = definitionRef?.current?.value.toLowerCase();

            if (!wordValue || !definitionValue) {
                toast.error("Please fill in both fields.");
                return;
            }
            const res = await fetch("/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentAuthId}`
                },
                body: JSON.stringify({
                    name: wordValue,
                    definition: definitionValue,
                })
            })
            const data = await res.json();
            if (!res.ok) {
                if (data.error === "Word already exists") {
                    toast.error("This word already exists. Please choose a different one.");
                    return;
                }
                throw new Error(data.error || "An unexpected error occurred");
            }
            useWordsStore.getState().addWord({
                id: data.id,
                name: wordValue,
                definition: definitionValue
            });
            toast.success(`Added ${Capitalize(wordValue)} successfully`);
            onClose();
        } catch (error) {
            console.error("Error in submission:", error);
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
                {currentUsage === "editWord" ?
                    <button onClick={() => handleOpen()}>Edit</button>
                    :
                    <Button

                        className="capitalize w-full"
                        color="warning"
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
                        ) : (
                            <div></div>
                        )}
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}