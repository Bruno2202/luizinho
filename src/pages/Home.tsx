import { useNavigate } from "react-router";
import MainLayout from "../layouts/MainLayout";

export default function Home() {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div
                className="flex flex-1 h-screen bg-lightGrey bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/assets/img/luizinho_grey.png')",
                    backgroundSize: "400px"
                }}
            >
            </div>
        </MainLayout>
    );
}