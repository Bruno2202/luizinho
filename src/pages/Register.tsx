import { useNavigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import SearchBar from "../components/inputs/SearchBar";
import Card from "../components/Card";
import { useState } from "react";

interface CardData {
    id: number;
    description: string;
    navigate: () => void;
}

export default function Register() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const cardData: CardData[] = [
        { id: 1, description: "Cadastro de Clientes", navigate: () => navigate('./client') },
        { id: 2, description: "Cadastro de Veículos", navigate: () => navigate('./car') },
        { id: 3, description: "Cadastro de Modelos", navigate: () => navigate('./model') },
        { id: 4, description: "Cadastro de Cidades", navigate: () => navigate('./city') },
        { id: 5, description: "Cadastro de Marcas", navigate: () => navigate('./brand') },
        { id: 6, description: "Cadastro de Categorias", navigate: () => navigate('./category') },
        { id: 7, description: "Cadastro de Cores", navigate: () => navigate('./color') },
        { id: 8, description: "Cadastro de Tipos de carro", navigate: () => navigate('./type') },
    ];

    const filteredCards = cardData.filter((card) =>
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8 items-center">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Cadastros
                </p>
                <div className="flex items-center justify-center w-2/4 mb-8">
                    <SearchBar
                        placeholder="Pesquisar tipo de cadastro"
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
                    {filteredCards.map((card) => (
                        <Card key={card.id} description={card.description} onClick={card.navigate} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}