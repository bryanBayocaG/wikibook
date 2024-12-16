import React, { useEffect, useState } from "react";
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



interface Props {
    name: string;
}

export default function ModalButton({ name }: Props) {
    const { theme } = useTheme();


    const [currentUsage, setCurrentUsage] = useState("");

    useEffect(() => {
        if (name === "Sign In") {
            setCurrentUsage("signIn")
        } else {
            setCurrentUsage("addWord")
        }
    }, [])

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    };

    const handleAdd = () => {
        // notify(theme)
        toast("Added successfully");
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
                        {currentUsage === "signIn" ? <SignupForm /> :
                            <>
                                <ModalHeader className="flex flex-col gap-1">Add more Words and definitioin</ModalHeader>
                                <ModalBody>
                                    <Input


                                        label="Word"
                                        placeholder="Enter a word"
                                        variant="bordered"
                                    />
                                    <Textarea
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
                                    <Button color="primary" onPress={() => handleAdd()}>
                                        Add the word
                                    </Button>
                                </ModalFooter>
                            </>
                        }
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}