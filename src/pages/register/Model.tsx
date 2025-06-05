import { useEffect, useState } from "react";
import Input from "../../components/inputs/Input";
import SearchBar from "../../components/inputs/SearchBar";
import MainLayout from "../../layouts/MainLayout";
import { ModelService } from "../../api/services/modelService";
import Button from "../../components/Button";
import { PlusIcon, Save, Trash } from "lucide-react";
import { ModelModel } from "../../core/models/ModelModel";

export default function Model() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedModel, setSelectedModel] = useState<ModelModel>();

    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        const fetchRelatedData = async () => {
            if (!selectedModel) return;

            setDescription(selectedModel.description || "");
        };

        fetchRelatedData();
    }, [selectedModel]);

    function resetState() {
        setSearchTerm("");
        setSelectedModel(undefined);

        setDescription("");
    }

    const model: ModelModel = {
        id: selectedModel ? selectedModel.id : null,
        description,
    };

    async function registerModel() {
        if (selectedModel) {
            await ModelService.updateModel(model);
            setSearchTerm("");
        } else {
            const data = await ModelService.registerModel(model);
            setSelectedModel(data);
        }
    }

    function deleteModel() {
        if (selectedModel && selectedModel.id) {
            ModelService.deleteModel(selectedModel.id);
            resetState();
        }
    }

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Cadastro de Modelos
                </p>

                <div className="flex items-center gap-4">
                    <div className="w-1/2">
                        <SearchBar
                            placeholder="Pesquisar modelo"
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showResult={true}
                            searchFunctionByTerm={ModelService.getModelByDescription}
                            setResult={setSelectedModel}
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
                        registerModel();
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
                            enabled={selectedModel?.id ? true : false}
                            text="Excluir"
                            className="bg-red"
                            icon={Trash}
                            onClick={() => deleteModel()}
                        />
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
