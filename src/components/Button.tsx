import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon?: LucideIcon;
    enabled?: boolean;
}

export default function Button({ text, className, icon: Icon, enabled, ...props }: Props) {
    return (
        <button
            type="button"
            className={clsx(
                `${enabled !== undefined && !enabled && "opacity-50"} rounded-8 py-2 px-4 cursor-pointer flex items-center gap-2 justify-center`,
                className
            )}
            {...props}
        >
            {Icon && <Icon className="text-white" size={20} />}
            <p className="font-semibold text-white">{text}</p>
        </button>
    );
}
