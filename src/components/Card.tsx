import { ChevronRight } from "lucide-react";

interface Props {
    description: string;
    onClick: () => void;
}

export default function Card({ description, onClick }: Props) {
    return (
        <div
            className="aspect-square w-full max-w-[208px] bg-darkGrey rounded-8 p-4 flex flex-col justify-between cursor-pointer"
            onClick={onClick}
        >
            <p className="text-white font-semibold text-2xl">{description}</p>
            <div className="w-full flex justify-end">
                <ChevronRight size={36} className="text-white" />
            </div>
        </div>
    );
}
