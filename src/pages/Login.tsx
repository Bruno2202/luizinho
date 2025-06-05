import { useNavigate } from "react-router";
import Button from "../components/Button";
import Input from "../components/inputs/Input";

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-lightGrey ">
            <div className="w-1/2 h-1/2 bg-white rounded-8 p-8 flex flex-row">
                <div className="flex flex-1 flex-col">
                    <div className="flex flex-col gap-4 mb-8">
                        <p className="text-darkGrey font-bold text-3xl text-center">Entrar</p>
                        <Input label="Email" />
                        <Input label="Senha" />
                    </div>
                    <Button onClick={() => navigate('/home')} text="Entrar" className="bg-red" />
                </div>
                <div className="flex items-center justify-center">
                    <img
                        className="w-1/2"
                        src="/assets/img/luizinho_sistemas.png"
                        alt="Luizinho Automóveis Sistemas"
                    />
                </div>
            </div>
        </div>
    );
}