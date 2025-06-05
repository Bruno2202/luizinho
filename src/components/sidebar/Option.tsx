import { ChevronRight, LucideIcon } from "lucide-react";

interface Props {
    Icon: LucideIcon;
    text: string;
    onClick: () => void;
}

export default function Option({ Icon, text, onClick }: Props) {
    return (
        <div onClick={onClick} className="flex flex-row gap-2 p-2 items-center rounded-8 font-semibold text-black cursor-pointer">
            <Icon size={20} />
            <p className="font-semibold select-none text-sm">{text}</p>
            <div className="flex flex-1 justify-end ml-8">
                <ChevronRight size={20} />
            </div>
        </div>
    );
}