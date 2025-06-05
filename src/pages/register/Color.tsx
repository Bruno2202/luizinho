import { useEffect, useState } from "react";
import Input from "../../components/inputs/Input";
import SearchBar from "../../components/inputs/SearchBar";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/Button";
import { PlusIcon, Save, Trash } from "lucide-react";
import { ColorModel } from "../../core/models/ColorModel";
import { ColorService } from "../../api/services/colorService";

export default function Color() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<ColorModel>();

    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        const fetchRelatedData = async () => {
            if (!selectedColor) return;

            setDescription(selectedColor.description || "");
        };

        fetchRelatedData();
    }, [selectedColor]);

    function resetState() {
        setSearchTerm("");
        setSelectedColor(undefined);

        setDescription("");
    }

    const color: ColorModel = {
        id: selectedColor ? selectedColor.id : null,
        description,
    };

    async function registerColor() {
        if (selectedColor) {
            await ColorService.updateColor(color);
            setSearchTerm("");
        } else {
            const data = await ColorService.registerColor(color);
            setSelectedColor(data);
        }
    }

    function deleteColor() {
        if (selectedColor && selectedColor.id) {
            ColorService.deleteColor(selectedColor.id);
            resetState();
        }
    }

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Cadastro de Cores
                </p>

                <div className="flex items-center gap-4">
                    <div className="w-1/2">
                        <SearchBar
                            placeholder="Pesquisar cor"
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showResult={true}
                            searchFunctionByTerm={ColorService.getColorByDescription}
                            setResult={setSelectedColor}
                        />
                    </div>
                    <Button
                        text="Adcionar"
                        icon={PlusIcon}
                        className="bg-blue"
                        onClick={() => resetState()}
                    />
                </div>

                <form
                    className="flex flex-col gap-4 mt-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        registerColor();
                    }}
                >
                    <div>
                        <Input<String>
                            label="Descrição *"
                            required
                            term={description}
                            setTerm={setDescription}
                        />
                    </div>

                    <div className="flex flex-row gap-4 w-full">
                        <Button
                            type="submit"
                            text="Salvar"
                            className="bg-green"
                            icon={Save}
                        />
                        <Button
                            enabled={selectedColor?.id ? true : false}
                            text="Excluir"
                            className="bg-red"
                            icon={Trash}
                            onClick={() => deleteColor()}
                        />
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
