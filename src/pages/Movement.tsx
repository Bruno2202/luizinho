import { useNavigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Period from "../components/inputs/Period";
import Button from "../components/Button";
import { FunnelX, Pencil, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { MovementModel } from "../core/models/MovementModel";
import { MovementService } from "../api/services/movementService";
import { formatDate } from "../utils/formatDate";

export default function Movement() {
    const navigate = useNavigate();

    const [movements, setMovements] = useState<MovementModel[]>([]);

    const [startDateIn, setStartDateIn] = useState("");
    const [endDateIn, setEndDateIn] = useState("");

    const [startDateOut, setStartDateOut] = useState("");
    const [endDateOut, setEndDateOut] = useState("");

    useEffect(() => {
        fetchMovements();
    }, []);

    function resetFilters() {
        setStartDateIn("");
        setEndDateIn("");
        setStartDateOut("");
        setEndDateOut("");
    }

    async function fetchMovements() {
        const movements: MovementModel[] = await MovementService.getMovements();
        setMovements(movements);
    }

    async function fetchFilteredMovements() {
        try {
            const movements: MovementModel[] = await MovementService.getMovements();

            const filtered = movements.filter((movement) => {
                const entryDate = movement.purchase?.purchaseDate
                    ? new Date(movement.purchase.purchaseDate)
                    : null;

                const exitDate = movement.sale?.saleDate
                    ? new Date(movement.sale.saleDate)
                    : null;

                let isValid = true;

                if (startDateIn && endDateIn) {
                    const startIn = new Date(startDateIn);
                    const endIn = new Date(endDateIn);

                    isValid = isValid && !!entryDate && startIn <= entryDate && entryDate <= endIn;
                }

                if (startDateOut && endDateOut) {
                    const startOut = new Date(startDateOut);
                    const endOut = new Date(endDateOut);

                    isValid = isValid && !!exitDate && startOut <= exitDate && exitDate <= endOut;
                }

                return isValid;
            });

            setMovements(filtered);
        } catch (error) {
            console.error("Erro ao buscar ou filtrar movimentações:", error);
        }
    }

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8 items-center">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Entradas e Saídas
                </p>
                <div className="flex w-full justify-start gap-8 items-center">
                    <Period
                        label="Período de entrada"
                        startDate={startDateIn}
                        endDate={endDateIn}
                        onChangeStart={setStartDateIn}
                        onChangeEnd={setEndDateIn}
                    />

                    <Period
                        label="Período de saída"
                        startDate={startDateOut}
                        endDate={endDateOut}
                        onChangeStart={setStartDateOut}
                        onChangeEnd={setEndDateOut}
                    />
                    <div className="flex items-end justify-end h-full">
                        <Button
                            text="Resetar filtros"
                            className="bg-black"
                            icon={FunnelX}
                            onClick={() => resetFilters()}
                        />
                    </div>
                </div>
                <div className="flex flex-row w-full gap-8 py-8">
                    <Button
                        className="bg-red"
                        text="Pesquisar"
                        icon={Search}
                        onClick={() => fetchFilteredMovements()}
                    />
                    <Button
                        className="bg-blue"
                        text="Adicionar Movimentação"
                        icon={Plus}
                        onClick={() => navigate('/movement/add')}
                    />
                </div>
                <div className="overflow-x-auto w-full border-grey rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-mediumGrey text-grey text-center">
                                <th className="p-2 border-2 border-grey">Descrição</th>
                                <th className="p-2 border-2 border-grey">Data de entrada</th>
                                <th className="p-2 border-2 border-grey">Data de saída</th>
                                <th className="p-2 border-2 border-grey">Valor da entrada</th>
                                <th className="p-2 border-2 border-grey">Valor da saída</th>
                                <th className="p-2 border-2 border-grey">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movements.map((movement) => (
                                <tr key={movement.id} className="hover:bg-gray-50">
                                    <td className="p-2 border-2 border-grey text-left">
                                        {movement.car?.description ?? "-"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-left">
                                        {movement.purchase?.purchaseDate ? formatDate(movement.purchase.purchaseDate) : "-"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-left">
                                        {movement.sale?.saleDate ? formatDate(movement.sale.saleDate) : "-"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-red text-left">
                                        {movement.purchase?.purchaseValue?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) ?? "-"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-green text-left">
                                        {movement.sale?.saleValue?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) ?? "-"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-center">
                                        <div className="flex justify-center">
                                            <Pencil
                                                className="text-grey cursor-pointer"
                                                onClick={() => navigate(`/movement/add?id=${movement.id}`)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}
