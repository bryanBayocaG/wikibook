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
        <Card className="w-full mt-10">
            <CardHeader className="flex gap-3">
                <div className=" flex-col hidden    ">
                    <p className="text-md text-default-500">{from}</p>
                </div>
                <div className="flex gap-3">
                    <p className="text-md text-default-500 uppercase">Word: </p>
                    <div className="dark:bg-default-200 rounded-lg p-3">
                        <p className="text-default-600 text-sm">{Capitalize(word)}</p>
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="p-5">
                <div className="flex gap-3">
                    <p className="text-default-500">Definition: </p>
                    <div className="dark:bg-default-200 rounded-lg p-3">
                        <p className="text-default-600 text-sm">{Capitalize(definition)}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
