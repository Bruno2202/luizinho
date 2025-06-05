import { useEffect, useState } from "react";

interface SelectOption {
    id: string | number;
    description?: string;
    name?: string;
}

interface SelectInputProps<T> {
    label: string;
    searchAllFunction?: () => Promise<SelectOption[]>;
    options?: SelectOption[];
    setData: React.Dispatch<React.SetStateAction<T | null>>;
    data?: any;
}

export default function SelectInput<T>({
    label,
    searchAllFunction,
    options: staticOptions,
    setData,
    data
}: SelectInputProps<T>) {
    const [options, setOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
        async function fetchOptions() {
            if (searchAllFunction) {
                try {
                    const data: SelectOption[] = await searchAllFunction();
                    setOptions(data || []);
                } catch (error) {
                    console.error("Erro ao realizar busca:", error);
                }
            } else if (staticOptions) {
                setOptions(staticOptions);
            }
        }

        fetchOptions();
    }, [searchAllFunction, staticOptions]);

    return (
        <label className="flex flex-col font-semibold text-grey">
            {label}

            <select
                value={data || ""}
                className="border-2 border-grey rounded-8 py-1 px-2 mt-1"
                onChange={(e: any) => { setData(e.target.value) }}
            >
                <option value="">Selecione...</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name ?? option.description}
                    </option>
                ))}
            </select>
        </label>
    );
}
