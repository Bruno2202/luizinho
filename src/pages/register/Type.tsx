import { useEffect, useState } from "react";
import Input from "../../components/inputs/Input";
import SearchBar from "../../components/inputs/SearchBar";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/Button";
import { PlusIcon, Save, Trash } from "lucide-react";
import { TypeModel } from "../../core/models/TypeModel";
import { TypeService } from "../../api/services/typeService";

export default function Type() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedType, setSelectedType] = useState<TypeModel>();

    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        const fetchRelatedData = async () => {
            if (!selectedType) return;

            setDescription(selectedType.description || "");
        };

        fetchRelatedData();
    }, [selectedType]);

    function resetState() {
        setSearchTerm("");
        setSelectedType(undefined);

        setDescription("");
    }

    const type: TypeModel = {
        id: selectedType ? selectedType.id : null,
        description,
    };

    async function registerType() {
        if (selectedType) {
            await TypeService.updateType(type);
            setSearchTerm("");
        } else {
            const data = await TypeService.registerType(type);
            setSelectedType(data);
        }
    }

    function deleteType() {
        if (selectedType && selectedType.id) {
            TypeService.deleteType(selectedType.id);
            resetState();
        }
    }

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Cadastro de Tipos
                </p>

                <div className="flex items-center gap-4">
                    <div className="w-1/2">
                        <SearchBar
                            placeholder="Pesquisar tipo"
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showResult={true}
                            searchFunctionByTerm={TypeService.getTypeByDescription}
                            setResult={setSelectedType}
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
                        registerType();
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
                            enabled={selectedType?.id ? true : false}
                            text="Excluir"
                            className="bg-red"
                            icon={Trash}
                            onClick={() => deleteType()}
                        />
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
