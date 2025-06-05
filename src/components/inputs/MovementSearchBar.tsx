import { Search } from "lucide-react";
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    showResult?: boolean;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    searchFunctionByTerm?: (value: string) => Promise<any[]>;
    setResult?: React.Dispatch<React.SetStateAction<any>>;
}

export default function MovementSearchBar({
    searchTerm,
    showResult,
    setSearchTerm,
    searchFunctionByTerm,
    setResult,
    ...props
}: Props) {
    const [searchData, setSearchData] = useState<any[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showResult && searchTerm) {
            searchByTerm(searchTerm);
        }
        if (!searchTerm) {
            setSearchData([]);
        }
    }, [searchTerm]);

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

    async function searchByTerm(value: string) {
        if (!searchFunctionByTerm) return;
        try {
            const data: any[] = await searchFunctionByTerm(value);
            setSearchData(data);
        } catch (error) {
            console.error("Erro ao realizar busca:", error);
            toast.error("Erro ao realizar busca");
        }
    }

    return (
        <div className="flex flex-col relative w-full" ref={wrapperRef}>
            <div className="flex flex-row relative rounded-8 items-center bg-white px-4 py-1 w-full">
                <Search size={20} className="mr-2 text-gray-500" />
                <input
                    className="rounded-8 bg-white outline-0 py-1 px-2 w-full"
                    value={searchTerm}
                    onClick={() => setIsSearchOpen(true)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    {...props}
                />
                {showResult && isSearchOpen && searchData.length > 0 && (
                    <div className="absolute top-12 z-10 bg-white rounded-md shadow-md w-full max-h-48 overflow-y-auto border border-gray-200">
                        {searchData.map((movement, index) => {
                            return (
                                <p
                                    key={movement.id || index}
                                    onClick={() => {
                                        setSearchTerm(movement.car?.description || "");
                                        setResult?.(movement);
                                        setIsSearchOpen(false);
                                    }}
                                    className="p-2 text-sm hover:bg-gray-100 cursor-pointer transition-colors"
                                >
                                    {movement.car?.description ?? "Sem descrição"}
                                </p>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
