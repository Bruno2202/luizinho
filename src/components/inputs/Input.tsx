import { SquarePlus } from "lucide-react";
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

interface Props<T = string | number> extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    register?: boolean;
    term: any;
    setTerm: (value: any) => void;
    setDataId?: React.Dispatch<React.SetStateAction<T | null>>;
    setData?: React.Dispatch<React.SetStateAction<any | null>>;
    searchFunctionByTerm?: (value: string) => Promise<any[]>;
    searchAllFunction?: () => Promise<any[]>;
    registerTo?: string;
}

export default function Input<T = string | number>({
    label,
    register,
    term,
    setTerm,
    setDataId,
    setData,
    searchFunctionByTerm,
    searchAllFunction,
    registerTo,
    ...props
}: Props<T>) {
    const [searchData, setSearchData] = useState<any[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | number | null>(null);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (register && term) {
            searchByTerm(term);
        }
        if (!term) {
            setSearchData([]);
        }
    }, [term]);

    async function searchByTerm(value: string) {
        if (!searchFunctionByTerm) return;
        try {
            const data = await searchFunctionByTerm(value);
            setSearchData(data);
        } catch (error) {
            console.error("Erro ao realizar busca:", error);
        }
    }

    async function searchAll() {
        if (!searchAllFunction) return;
        try {
            const data = await searchAllFunction();
            setSearchData(data);
        } catch (error) {
            console.error("Erro ao realizar busca:", error);
        }
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={wrapperRef} className="flex flex-col relative">
            <label className="flex flex-col text-grey font-semibold">
                {label}
                <div className="flex flex-row">
                        <input
                        className={`${register ? "rounded-l-8" : "rounded-8"} border-2 border-grey outline-0 py-1 px-2 w-full`}
                        value={term ?? ""}
                        onChange={(e) => {
                            const inputValue = e.target.value;

                            if (selectedId) {
                                setTerm("");
                                setDataId?.(null);
                                setData?.(null);
                                setSelectedId(null);
                                return;
                            }

                            const value = props.type === "number"
                                ? inputValue === "" ? null : Number(inputValue)
                                : inputValue;

                            setTerm(value);

                            if (inputValue === "") {
                                setDataId?.(null);
                                setData?.(null);
                            }
                        }}

                        onClick={() => {
                            setIsSearchOpen(true);
                            searchAll();
                        }}
                        {...props}
                    />
                    {register && (
                        <div
                            className="flex items-center justify-center bg-darkGrey py-1 px-2 rounded-r-8 cursor-pointer"
                            onClick={() => navigate(`${registerTo}`)}
                        >
                            <SquarePlus className="text-white" />
                        </div>
                    )}
                </div>
            </label>

            {register && isSearchOpen && searchData.length > 0 && (
                <div className="absolute top-15 z-10 bg-white rounded-md shadow-md w-full max-h-48 overflow-y-auto border border-gray-200">
                    {searchData.map((data, index) => (
                        <p
                            key={data.id || index}
                            onClick={() => {
                                setTerm(data.name || data.description);
                                setDataId?.(data.id);
                                setData?.(data);
                                setSelectedId(data.id);
                                setIsSearchOpen(false);
                            }}
                            className="p-2 text-sm hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                            {data.name ?? data.description}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
