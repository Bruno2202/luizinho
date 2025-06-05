import { useEffect, useState } from "react";
import Input from "../../components/inputs/Input";
import SearchBar from "../../components/inputs/SearchBar";
import MainLayout from "../../layouts/MainLayout";
import { BrandService } from "../../api/services/brandService";
import Button from "../../components/Button";
import { PlusIcon, Save, Trash } from "lucide-react";
import { BrandModel } from "../../core/models/BrandModel";

export default function Brand() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<BrandModel>();

    const [name, setName] = useState<string>("");

    useEffect(() => {
        const fetchRelatedData = async () => {
            if (!selectedBrand) return;

            setName(selectedBrand.name || "");
        };

        fetchRelatedData();
    }, [selectedBrand]);

    function resetState() {
        setSearchTerm("");
        setSelectedBrand(undefined);

        setName("");
    }

    const brand: BrandModel = {
        id: selectedBrand ? selectedBrand.id : null,
        name,
    };

    async function registerBrand() {
        if (selectedBrand) {
            await BrandService.updateBrand(brand);
            setSearchTerm("");
        } else {
            const data = await BrandService.registerBrand(brand);
            setSelectedBrand(data);
        }
    }

    function deleteBrand() {
        if (selectedBrand && selectedBrand.id) {
            BrandService.deleteBrand(selectedBrand.id);
            resetState();
        }
    }

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Cadastro de Marcas
                </p>

                <div className="flex items-center gap-4">
                    <div className="w-1/2">
                        <SearchBar
                            placeholder="Pesquisar marca"
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showResult={true}
                            searchFunctionByTerm={BrandService.getBrandByName}
                            setResult={setSelectedBrand}
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
                        registerBrand();
                    }}
                >
                    <div>
                        <Input<String>
                            label="Nome *"
                            required
                            term={name}
                            setTerm={setName}
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
                            enabled={selectedBrand?.id ? true : false}
                            text="Excluir"
                            className="bg-red"
                            icon={Trash}
                            onClick={() => deleteBrand()}
                        />
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
