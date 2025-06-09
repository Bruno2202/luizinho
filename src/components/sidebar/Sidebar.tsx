import { useContext, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { ArrowRightLeft, BookText, CarFront, CopyPlus, LogOut, PanelRight, Settings } from "lucide-react";
import Option from "./Option";
import { AuthContext } from "../../contexts/AuthContext";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const { setAuthToken } = useContext(AuthContext)!;

    const navigate: NavigateFunction = useNavigate();

    function logout() {
        setAuthToken("");
        localStorage.removeItem("authToken");
        navigate("/");
    }

    return (
        <aside
            className={`flex flex-col w-auto text-white h-screen p-2`}
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
            <div className="flex items-end h-full p-2">
                <div
                    className="flex items-center flex-row gap-2 w-auto cursor-pointer"
                    onClick={() => logout()}
                >
                    <LogOut className="text-red" size={20} />
                    <p className="text-black font-semibold">Sair</p>
                </div>
            </div>
        </aside>
    );
}