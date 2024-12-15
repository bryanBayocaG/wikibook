import React from "react";
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
import { PlusIcon } from "../Table";
import { useTheme } from 'next-themes'

type BackdropType = "blur";


export default function ModalButton() {
    const { theme } = useTheme();


    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = React.useState<BackdropType>("blur");

    const backdrops: BackdropType[] = ["blur"];

    const handleOpen = (backdrop: BackdropType) => {
        setBackdrop(backdrop);
        onOpen();
    };

    return (
        <>
            <div className="flex flex-wrap gap-3">
                {backdrops.map((b) => (
                    <Button
                        key={b}
                        className="capitalize"
                        color="primary"
                        variant="flat"
                        endContent={<PlusIcon />}
                        onPress={() => handleOpen(b)}
                    >
                        {b}
                    </Button>
                ))}
            </div>
            <Modal backdrop={backdrop} isOpen={isOpen} size="5xl" onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
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
                                <Button color="primary" onPress={onClose}>
                                    Add the word
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}