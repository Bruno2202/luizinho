import { useNavigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { StoreService } from "../api/services/storeService";
import { StoreModel } from "../core/models/StoreModel";


export default function Store() {
    const [storeId, setStoreId] = useState<number | null>(null);
    const [cnpj, setCpnj] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [neighborhood, setNeighborhood] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [contact, setContact] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const store: StoreModel = await StoreService.getStore();

            setStoreId(store.id);
            setCpnj(store.cnpj!)
            setAddress(store.address!)
            setNeighborhood(store.neighborhood!)
            setName(store.name!)
            setContact(store.contact!)
        }

        fetchData();
    }, []);

    const store: StoreModel = {
        id: storeId,
        name,
        cnpj,
        address,
        neighborhood,
        contact
    }

    async function updateStore() {
        await StoreService.updateStore(store);
    }

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8 items-center">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Configurações da Loja
                </p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateStore();
                    }}
                    className="flex flex-wrap gap-4 mb-8 w-full"
                >
                    <div className="w-full sm:w-[48%] md:w-[31%]">
                        <Input
                            setTerm={setCpnj}
                            term={cnpj}
                            label="CNPJ"
                        />
                    </div>
                    <div className="w-full sm:w-[48%] md:w-[31%]">
                        <Input
                            setTerm={setAddress}
                            term={address}
                            label="Endereço"
                        />
                    </div>
                    <div className="w-full sm:w-[48%] md:w-[31%]">
                        <Input
                            setTerm={setNeighborhood}
                            term={neighborhood}
                            label="Bairro"
                        />
                    </div>
                    <div className="w-full sm:w-[48%] md:w-[31%]">
                        <Input
                            setTerm={setName}
                            term={name}
                            label="Nome"
                        />
                    </div>
                    <div className="w-full sm:w-[48%] md:w-[31%]">
                        <Input
                            setTerm={setContact}
                            term={contact}
                            label="Contato"
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            type="submit"
                            className="bg-green"
                            text="Salvar"
                            icon={Save}
                        />
                    </div>
                </form>
            </div>
        </MainLayout >
    );
}