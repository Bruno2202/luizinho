import { useEffect, useState } from "react";
import Input from "../../components/inputs/Input";
import SearchBar from "../../components/inputs/SearchBar";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/Button";
import { PlusIcon, Save, Trash } from "lucide-react";
import { CategoryModel } from "../../core/models/CategoryModel";
import { CategoryService } from "../../api/services/categoryService";

export default function Category() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<CategoryModel>();

    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        const fetchRelatedData = async () => {
            if (!selectedCategory) return;

            setDescription(selectedCategory.description || "");
        };

        fetchRelatedData();
    }, [selectedCategory]);

    function resetState() {
        setSearchTerm("");
        setSelectedCategory(undefined);

        setDescription("");
    }

    const category: CategoryModel = {
        id: selectedCategory ? selectedCategory.id : null,
        description,
    };

    async function registerCategory() {
        if (selectedCategory) {
            await CategoryService.updateCategory(category);
            setSearchTerm("");
        } else {
            const data = await CategoryService.registerCategory(category);
            setSelectedCategory(data);
        }
    }

    function deleteCategory() {
        if (selectedCategory && selectedCategory.id) {
            CategoryService.deleteCategory(selectedCategory.id);
            resetState();
        }
    }

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Cadastro de Categorias
                </p>

                <div className="flex items-center gap-4">
                    <div className="w-1/2">
                        <SearchBar
                            placeholder="Pesquisar categoria"
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showResult={true}
                            searchFunctionByTerm={CategoryService.getCategoryByDescription}
                            setResult={setSelectedCategory}
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
                        registerCategory();
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
                            enabled={selectedCategory?.id ? true : false}
                            text="Excluir"
                            className="bg-red"
                            icon={Trash}
                            onClick={() => deleteCategory()}
                        />
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
