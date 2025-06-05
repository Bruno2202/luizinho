import { useEffect, useState } from "react";
import Input from "../../components/inputs/Input";
import SearchBar from "../../components/inputs/SearchBar";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/Button";
import { PlusIcon, Save, Trash } from "lucide-react";
import { CityModel } from "../../core/models/CityModel";
import { CityService } from "../../api/services/cityService";
import SelectInput from "../../components/inputs/SelectInput";
import { StateService } from "../../api/services/stateService";

export default function Color() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<CityModel>();

    const [name, setName] = useState<string>("");
    const [state, setState] = useState<string | null>(null);

    useEffect(() => {
        const fetchRelatedData = async () => {
            if (!selectedCity) return;

            setName(selectedCity.name || "");
            setState(selectedCity.ufId || "");
        };

        fetchRelatedData();
    }, [selectedCity]);

    function resetState() {
        setSearchTerm("");
        setSelectedCity(undefined);

        setName("");
        setState(null);
    }

    const city: CityModel = {
        id: selectedCity ? selectedCity.id : null,
        name,
        ufId: selectedCity ? selectedCity.ufId : state
    };

    async function registerCity() {
        if (selectedCity) {
            await CityService.updateCity(city);
            setSearchTerm("");
        } else {
            const data = await CityService.registerCity(city);
            setSelectedCity(data);
        }
    }

    function deleteCity() {
        if (selectedCity && selectedCity.id) {
            CityService.deleteCity(selectedCity.id);
            resetState();
        }
    }

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Cadastro de Cidades
                </p>

                <div className="flex items-center gap-4">
                    <div className="w-1/2">
                        <SearchBar
                            placeholder="Pesquisar cidade"
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showResult={true}
                            searchFunctionByTerm={CityService.getCityByName}
                            setResult={setSelectedCity}
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
                        registerCity();
                    }}
                >
                    <div className="flex flex-row gap-8">
                        <Input<String>
                            label="Nome *"
                            required
                            term={name}
                            setTerm={setName}
                        />
                        <SelectInput<string>
                            label="UF"
                            searchAllFunction={StateService.getStates}
                            setData={setState}
                            data={state}
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
                            enabled={selectedCity?.id ? true : false}
                            text="Excluir"
                            className="bg-red"
                            icon={Trash}
                            onClick={() => deleteCity()}
                        />
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
