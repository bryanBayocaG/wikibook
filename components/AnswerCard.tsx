import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

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
        <Card className="w-full">
            <CardHeader className="flex gap-3">
                <div className=" flex-col hidden    ">
                    <p className="text-md text-default-500">{from}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-md text-default-500 uppercase">{word}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="p-5">
                <p className="text-sm text-default-500">{Capitalize(definition)}</p>
            </CardBody>
        </Card>
    );
}
