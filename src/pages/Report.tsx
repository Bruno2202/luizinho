import { useNavigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";

export default function Report() {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8 items-center">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Luizinho Report
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-12 gap-y-6">
                    <Card
                        description={"Contrato de Venda"}
                        onClick={() => navigate("/report/sales-contract")}
                    />
                    <Card
                        description={"Contrato de Consignação"}
                        onClick={() => navigate("/report/consignment-contract")}
                    />
                </div>
            </div>
        </MainLayout>
    );
}