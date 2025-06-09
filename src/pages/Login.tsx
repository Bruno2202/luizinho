import { useNavigate } from "react-router";
import Button from "../components/Button";
import Input from "../components/inputs/Input";
import { useContext, useEffect, useState } from "react";
import { AuthService } from "../api/services/authService";
import { UserModel } from "../core/models/UserModel";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { setAuthToken } = useContext(AuthContext)!;

    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = () => {
            const authToken = localStorage.getItem("authToken");

            if (authToken) {
                authToken && setAuthToken(authToken);
                navigate('/home');
            }
        }

        isAuthenticated();
    }, []);

    async function login() {
        const user = new UserModel(email, password);
        const res = await AuthService.login(user);

        setAuthToken(res.token);
        localStorage.setItem("authToken", res.token);

        navigate('/home');
    }

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-lightGrey ">
            <div className="w-1/2 h-1/2 bg-white rounded-8 p-8 flex flex-row">
                <div className="flex flex-1 flex-col">
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            login();
                        }}
                    >
                        <p className="text-darkGrey font-bold text-3xl text-center">Entrar</p>
                        <Input
                            setTerm={setEmail}
                            term={email}
                            label="Email"
                            required
                        />
                        <Input
                            setTerm={setPassword}
                            term={password}
                            label="Senha"
                            type="password"
                            required
                        />
                        <Button
                            type="submit"
                            text="Entrar"
                            className="bg-red"
                        />
                    </form>
                </div>
                <div className="flex items-center justify-center">
                    <img
                        className="w-1/2"
                        src="/assets/img/luizinho_sistemas.png"
                        alt="Luizinho Automóveis Sistemas"
                    />
                </div>
            </div>
        </div >
    );
}