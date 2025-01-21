import { Card, CardHeader, CardBody, Divider } from "@heroui/react";

interface Props {
    word: string;
    definition: string
    from: string;
}


export const Capitalize = (definition: string) => {
    return definition.charAt(0).toUpperCase() + definition.slice(1);
}

export default function AnswerCard({ word, definition, from }: Props) {
    return (
        <Card className="w-full mt-10 ">
            <CardHeader className="flex gap-3">
                <div className=" flex-col hidden    ">
                    <p className="text-md text-default-500">{from}</p>
                </div>
                <div className="flex gap-3">
                    <div className="dark:bg-yellow-600 bg-yellow-300 rounded-lg p-1 md:p-3">
                        <p className="dark:text-white text-sm font-extrabold uppercase">{word}</p>
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="dark:bg-yellow-600 bg-yellow-600 rounded-lg p-2 md:p-3 text-pretty">
                    <p className=" text-sm md:text-lg ">{Capitalize(definition)}</p>
                </div>
            </CardBody>
        </Card>
    );
}
