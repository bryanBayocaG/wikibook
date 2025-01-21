"use client"
import React, { useEffect, useState, useRef } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Selection,
    SortDescriptor,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Textarea,
} from "@heroui/react";
import ModalButton from "./ui/Modal";
import { collection, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from "@/utils/firebase";
import { SearchIcon, VerticalDotsIcon } from "./ui/TableSVG";
import { useAuthStore } from "@/app/store";
import { Capitalize } from "./AnswerCard";
import { toast } from "react-toastify";

export function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const columns = [
    { name: "WORD", uid: "word", sortable: true },
    { name: "DEFINITION", uid: "definition", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];
export const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
];

type Word = {
    id: number;
    word: string;
    definition: string;
    identity: string;
};
const INITIAL_VISIBLE_COLUMNS = ["word", "definition", "actions"];

export default function TableFinalForm() {
    const currentAuth = useAuthStore((state) => state.currentAuth)
    const currentAuthId = useAuthStore((state) => state.currentAuthId)
    const query = currentAuth ? collection(db, `Users/${currentAuthId}/wordsAndDef`) : null;
    const path = `Users/${currentAuthId}/wordsAndDef`;
    const [value,] = useCollection(query);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [words, setWords] = useState([]);
    const [currentID, setCurrentID] = useState("");
    const [currentWord, setCurrentWord] = useState("");
    const [currentDefinition, setCurrentDefinition] = useState("");

    useEffect(() => {
        if (value) {
            const newWords: Word[] = value.docs.map((doc, i) => ({
                id: i,
                identity: doc.id,
                word: doc.data().name || "", // Default empty string for safety
                definition: doc.data().definition || "", // Default empty string for safety
            }));
            setWords(newWords);
        }
    }, [value]);

    const wordRef = useRef<HTMLInputElement>(null)
    const definitionRef = useRef<HTMLTextAreaElement>(null)

    const editWord = async () => {
        const thatword = doc(db, path, currentID);
        await updateDoc(thatword, { name: currentWord, definition: currentDefinition })
            .then(() => { toast.success(`${Capitalize(currentWord)} has been updated.`) });

        setCurrentWord("")
        setCurrentDefinition("");
    }

    const deleteWord = async (id: string, name: string) => {
        const thatword = doc(db, path, id);
        await deleteDoc(thatword).then(() => { toast.success(`${Capitalize(name)} has been deleted.`) });
    }
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));



    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "word",
        direction: "ascending",
    });

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        // if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = words || [];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((word) =>
                word.word.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        return filteredUsers;
    }, [words, filterValue, hasSearchFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Word, b: Word) => {
            const first = a[sortDescriptor.column as keyof Word] as number;
            const second = b[sortDescriptor.column as keyof Word] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((word: Word, columnKey: React.Key) => {
        const cellValue = word[columnKey as keyof Word];

        switch (columnKey) {
            case "word":
                return (
                    <div className="flex justify-start">
                        <p className="uppercase">{word.word}</p>
                    </div>
                );
            case "definition":
                return (
                    <div className="text-wrap">
                        <p className="text-pretty">{Capitalize(word.definition)}</p>
                    </div>
                );

            case "actions":
                return (
                    <>

                        <div className={`relative flex justify-end items-center gap-2 ${currentAuth ? "block" : "hidden"}`}>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button isIconOnly size="sm" variant="light">
                                        <VerticalDotsIcon className="text-default-300" />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem key="edit"
                                        onPress={() => {
                                            onOpen();
                                            setCurrentID(word.identity);
                                            setCurrentWord(word.word);
                                            setCurrentDefinition(word.definition);
                                        }}
                                    >
                                        Edit
                                    </DropdownItem>
                                    <DropdownItem key="delete" onPress={() => (deleteWord(word.identity, word.word))}>
                                        Delete
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>


                    </>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by word name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <ModalButton name={"Add a word"} />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {words.length} words</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        onClear,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        words.length,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${filteredItems.length} selected`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="warning"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, page, pages, filteredItems.length, onNextPage, onPreviousPage]);

    return (
        <>
            <Table

                isHeaderSticky
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "max-h-[382px]",
                }}
                // selectedKeys={selectedKeys}
                // selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No words found"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Modal isOpen={isOpen} isDismissable={false} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <Input label="Word" type="text" variant="bordered"
                                        defaultValue={currentWord}
                                        ref={wordRef}
                                        onChange={(e) => setCurrentWord(e.target.value)}
                                        required />
                                    <Textarea
                                        isClearable
                                        className="w-full"
                                        defaultValue={currentDefinition}
                                        label="Definition"
                                        placeholder="Definition"
                                        variant="bordered"
                                        ref={definitionRef}
                                        onChange={(e) => setCurrentDefinition(e.target.value)}
                                        required
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => { editWord(); onClose(); }}>
                                    Apply
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    );
}
