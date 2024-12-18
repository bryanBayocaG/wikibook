import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

export default function AnswerCard() {
    return (
        <Card className="w-full">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md text-default-500">NextUI</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="text-md text-default-500">Make beautiful websites regardless of your design experience.</p>
            </CardBody>


        </Card>
    );
}
