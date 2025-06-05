import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { ArrowRightLeft, BookText, CarFront, CopyPlus, PanelRight, Settings } from "lucide-react";
import Option from "./Option";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const navigate: NavigateFunction = useNavigate();

    return (
        <aside
            className={`flex flex-col w-auto text-white h-full p-2`}
        >
            <div className="flex flex-row justify-between mb-8">
                <img
                    onClick={() => navigate('/home')}
                    className="w-20 cursor-pointer"
                    src="/assets/img/luizinho_sistemas.png"
                />
                <PanelRight size={24} className="text-black cursor-pointer" />
            </div>
            <div className="flex flex-col gap-4">
                <Option
                    Icon={ArrowRightLeft}
                    text="Entradas e Saídas"
                    onClick={() => navigate('/movement')}
                />
                <Option
                    Icon={CarFront}
                    text="Gerenciador de Veículos"
                    onClick={() => navigate('/vehicle-manager')}
                />
                <Option
                    Icon={CopyPlus}
                    text="Cadastros"
                    onClick={() => navigate('/register')}
                />
                <Option
                    Icon={BookText}
                    text="Luizinho Report"
                    onClick={() => navigate('/report')}
                />
                <Option
                    Icon={Settings}
                    text="Configurações da Loja"
                    onClick={() => navigate('/store')}
                />
            </div>
        </aside>
    );
}