import { use, useEffect, useState } from "react";
import Input from "../../components/inputs/Input";
import SearchBar from "../../components/inputs/SearchBar";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/Button";
import { PlusIcon, Save, Trash } from "lucide-react";
import { ClientModel } from "../../core/models/ClientModel";
import { ClientService } from "../../api/services/clientService";
import { CityService } from "../../api/services/cityService";
import { formatDate } from "../../utils/formatDate";

export default function Client() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedClient, setSelectedClient] = useState<ClientModel>();

    const [name, setName] = useState<string>("");
    const [picture, setPicture] = useState<string | null>(null);
    const [cpf, setCpf] = useState<string | null>(null);
    const [rg, setRg] = useState<string | null>(null);
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [registrationDate, setRegistrationDate] = useState<Date | null>(null);
    const [contact, setContact] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [neighborhood, setNeighborhood] = useState<string | null>(null);
    const [number, setNumber] = useState<string | null>(null);
    const [zipCode, setZipCode] = useState<string | null>(null);

    const [cityName, setCityName] = useState<string | null>(null);
    const [cityId, setCityId] = useState<number | null>(null);

    useEffect(() => {
        const fetchRelatedData = async () => {
            if (!selectedClient) return;

            setName(selectedClient.name || "");
            setPicture(selectedClient.picture || null);
            setCpf(selectedClient.cpf || null);
            setRg(selectedClient.rg || null);
            setBirthDate(selectedClient.birthDate || null);
            setRegistrationDate(selectedClient.registrationDate || null);
            setContact(selectedClient.contact || null);
            setAddress(selectedClient.address || null);
            setNeighborhood(selectedClient.neighborhood || null);
            setNumber(selectedClient.number || null);
            setZipCode(selectedClient.zipCode || null);
            setCityId(selectedClient.cityId || null);

            if (selectedClient.cityId) {
                setCityName((await CityService.getCityById(selectedClient.cityId))?.name || "");
            }
        };

        fetchRelatedData();
    }, [selectedClient]);

    function resetState() {
        setSearchTerm("");
        setSelectedClient(undefined);

        setName("");
        setPicture(null);
        setCpf(null);
        setRg(null);
        setBirthDate(null);
        setRegistrationDate(null);
        setContact(null);
        setAddress(null);
        setNeighborhood(null);
        setNumber(null);
        setZipCode(null);
        setCityName(null);
        setCityId(null);
    }

    const client: ClientModel = {
        id: selectedClient?.id ?? null,
        name: name,
        picture: picture,
        cpf: cpf,
        rg: rg,
        birthDate: birthDate,
        registrationDate: registrationDate,
        contact: contact,
        address: address,
        neighborhood: neighborhood,
        number: number,
        zipCode: zipCode,
        cityId: cityId
    };

    async function registerClient() {
        if (selectedClient) {
            await ClientService.updateClient(client);
            setSearchTerm("");
        } else {
            const data = await ClientService.registerClient(client);
            setSelectedClient(data);
        }
    }

    async function deleteBrand() {
        if (selectedClient && selectedClient.id) {
            await ClientService.deleteClient(selectedClient.id);
            resetState();
        }
    }

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Cadastro de Clientes
                </p>

                <div className="flex items-center gap-4">
                    <div className="w-1/2">
                        <SearchBar
                            placeholder="Pesquisar marca"
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showResult={true}
                            searchFunctionByTerm={ClientService.getClientByName}
                            setResult={setSelectedClient}
                        />
                    </div>
                    <Button
                        text="Adicionar"
                        icon={PlusIcon}
                        className="bg-blue"
                        onClick={() => resetState()}
                    />
                </div>

                <form
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        registerClient();
                    }}
                >
                    <Input<string>
                        label="Nome *"
                        required
                        term={name}
                        setTerm={setName}
                    />
                    <Input<string>
                        label="CPF"
                        term={cpf}
                        setTerm={setCpf}
                    />
                    <Input<string>
                        label="RG"
                        term={rg}
                        setTerm={setRg}
                    />
                    <Input<string>
                        label="Data de nascimento"
                        type="date"
                        term={formatDate(birthDate)}
                        setTerm={(val) => setBirthDate(val ? new Date(val) : null)}
                    />

                    <Input<string>
                        label="Contato"
                        term={contact}
                        setTerm={(value) => {
                            const numeric = value.replace(/\D/g, "");

                            let formatted = numeric;

                            if (numeric.length <= 10) {
                                formatted = numeric.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
                            } else {
                                formatted = numeric.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
                            }

                            setContact(formatted.trim());
                        }}
                        type="tel"
                    />

                    <Input<string>
                        label="Endereço"
                        term={address}
                        setTerm={setAddress}
                    />
                    <Input<string>
                        label="Bairro"
                        term={neighborhood}
                        setTerm={setNeighborhood}
                    />
                    <Input<String>
                        label="Número"
                        term={number}
                        setTerm={setNumber}
                    />
                    <Input<string>
                        label="CEP"
                        term={zipCode}
                        setTerm={setZipCode}
                    />
                    <Input<number>
                        label="Cidade"
                        term={cityName}
                        setTerm={setCityName}
                        register={true}
                        searchFunctionByTerm={CityService.getCityByName}
                        searchAllFunction={CityService.getCities}
                        setDataId={setCityId}
                        registerTo={"/register/city"}
                    />

                    <div className="col-span-1 md:col-span-4 flex flex-row gap-4">
                        <Button
                            type="submit"
                            text="Salvar"
                            className="bg-green"
                            icon={Save}
                        />
                        <Button
                            enabled={selectedClient?.id ? true : false}
                            text="Excluir"
                            className="bg-red"
                            icon={Trash}
                            onClick={() => deleteBrand()}
                        />
                    </div>
                </form>

            </div >
        </MainLayout >
    );
}
