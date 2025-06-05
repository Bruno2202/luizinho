import { useNavigate, useSearchParams } from "react-router";
import MainLayout from "../../layouts/MainLayout";
import Input from "../../components/inputs/Input";
import { useEffect, useState } from "react";
import { ClientService } from "../../api/services/clientService";
import { MovementModel } from "../../core/models/MovementModel";
import Button from "../../components/Button";
import { Minus, PlusIcon, Save, Trash } from "lucide-react";
import { MovementService } from "../../api/services/movementService";
import { PurchaseModel } from "../../core/models/PurchaseModel";
import { SaleModel } from "../../core/models/SaleModel";
import { CarService } from "../../api/services/carService";
import { formatDate } from "../../utils/formatDate";
import MovementSearchBar from "../../components/inputs/MovementSearchBar";
import { PurchaseService } from "../../api/services/purchaseService";
import { SaleService } from "../../api/services/saleService";


export default function AddMovement() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedMovement, setSelectedMovement] = useState<MovementModel>();
    const [selectedPurchase, setSelectedPurchase] = useState<PurchaseModel>();
    const [selectedSale, setSelectedSale] = useState<SaleModel>();

    const [carDescription, setCarDescription] = useState<string>("");
    const [carId, setCarId] = useState<number | null>(null);

    const [purchaseValue, setPurchaseValue] = useState<number>(0);
    const [sellerName, setSellerName] = useState<string>("");
    const [sellerId, setSellerId] = useState<string | null>(null);
    const [purchaseDate, setPurchaseDate] = useState<Date | null>(null);

    const [costValue, setCostValue] = useState<number>(0);
    const [saleDate, setSaleDate] = useState<Date | null>(null);
    const [observation, setObservation] = useState<string>("");
    const [paymentCondition, setPaymentCondition] = useState<string>("");
    const [buyerName, setBuyerName] = useState<string | null>(null);
    const [buyerId, setBuyerId] = useState<string | null>(null);
    const [saleValue, setSaleValue] = useState<number>(0);

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        const fetchMovementDataById = async () => {
            if (id) {
                const movement = await MovementService.getMovementById(Number(id));
                setSelectedMovement(movement);
            }
        }

        fetchMovementDataById();
    }, []);

    useEffect(() => {
        const fetchMovementData = async () => {
            if (!selectedMovement) return;

            setCarId(selectedMovement.carId);
            selectedMovement.carId && setCarDescription((await CarService.getCarById(selectedMovement.carId))?.description || "");

            const { purchase, sale } = selectedMovement;

            if (purchase) {
                setSelectedPurchase(purchase);
                setPurchaseValue(purchase.purchaseValue || 0);
                setPurchaseDate(purchase.purchaseDate || null);

                if (purchase?.sellerId) {
                    setSellerId(purchase.sellerId || null);
                    setSellerName((await ClientService.getClientById(purchase?.sellerId))?.name || "");
                } else {
                    setSellerId(null);
                }
            }

            if (sale) {
                setSelectedSale(sale);
                setCostValue(sale?.costValue ?? 0);
                setSaleDate(sale?.saleDate ? new Date(sale?.saleDate) : null);
                setObservation(sale?.observation || "");
                setPaymentCondition(sale?.paymentCondition || "");
                setSaleValue(sale?.saleValue ?? 0);

                if (sale?.buyerId) {
                    setBuyerId(sale?.buyerId ?? null);
                    setBuyerName((await ClientService.getClientById(sale?.buyerId))?.name || "");
                } else {
                    setBuyerId(null);
                }
            }

            setSearchParams({ id: `${selectedMovement.id}` });
        };

        fetchMovementData();
    }, [selectedMovement]);

    const movement: MovementModel = {
        id: selectedMovement?.id ?? null,
        carId,
        purchaseId: selectedPurchase?.id ?? null,
        saleId: selectedSale?.id ?? null,
    };

    const purchase: PurchaseModel | null = carId && purchaseValue > 0 && purchaseDate && sellerId
        ? {
            id: selectedPurchase?.id ?? null,
            purchaseValue,
            purchaseDate,
            sellerId
        }
        : null;

    const sale: SaleModel | null = carId && saleValue > 0 && saleDate && buyerId
        ? {
            id: selectedSale?.id ?? null,
            costValue,
            observation: observation,
            paymentCondition: paymentCondition,
            saleValue,
            buyerId,
            saleDate
        }
        : null;


    function resetState() {
        setSearchTerm("");
        setCarId(null);
        setCarDescription("")
        setSelectedMovement(undefined);
        setPurchaseValue(0);
        setSellerName("");
        setSellerId(null);
        setPurchaseDate(null);
        setCostValue(0);
        setSaleDate(null);
        setObservation("");
        setPaymentCondition("");
        setBuyerName(null);
        setBuyerId(null);
        setSaleValue(0);
    }

    function resetPurchase() {
        setPurchaseValue(0);
        setSellerName("");
        setSellerId(null);
        setPurchaseDate(null);
        setSelectedPurchase(undefined);
    }

    function resetSale() {
        setCostValue(0);
        setSaleValue(0);
        setSaleDate(null);
        setObservation("");
        setPaymentCondition("");
        setBuyerName(null);
        setBuyerId(null);
        setSelectedSale(undefined);
    }


    async function registerMovement() {
        if (!carId) {
            return;
        }

        try {
            if (selectedMovement?.id) {
                const updatedOrCreatedPurchase = purchase
                    ? selectedMovement.purchaseId
                        ? await PurchaseService.updatePurchase(purchase)
                        : await PurchaseService.registerPurchase(purchase, selectedMovement.id)
                    : null;
                setSelectedPurchase(updatedOrCreatedPurchase ?? selectedPurchase);

                const updatedOrCreatedSale = sale
                    ? selectedMovement.saleId
                        ? await SaleService.updateSale(sale)
                        : await SaleService.registerSale(sale, selectedMovement.id)
                    : null;
                setSelectedSale(updatedOrCreatedSale ?? selectedSale);

                const updatedMovement = {
                    ...movement,
                    purchaseId: updatedOrCreatedPurchase?.id ?? selectedPurchase?.id ?? null,
                    saleId: updatedOrCreatedSale?.id ?? selectedSale?.id ?? null
                };

                await MovementService.updateMovement(updatedMovement);
            } else {
                const savedMovement: MovementModel = await MovementService.registerMovement(movement);
                const newPurchase = purchase ? await PurchaseService.registerPurchase(purchase, savedMovement.id!) : null;
                const newSale = sale ? await SaleService.registerSale(sale, savedMovement.id!) : null;

                const newMovement: MovementModel = {
                    id: null,
                    carId,
                    purchaseId: newPurchase?.id ?? null,
                    saleId: newSale?.id ?? null
                };

                setSelectedMovement(newMovement);
                setSelectedPurchase(newPurchase ?? undefined);
                setSelectedSale(newSale ?? undefined);
            }
        } catch (error) {
            console.error("Erro ao salvar movimentação:", error);
        }
    }

    async function deleteMovement() {
        if (selectedMovement?.id) {
            await MovementService.deleteMovement(selectedMovement.id);
            resetState();
        }
    }

    async function deletePurchase() {
        if (selectedPurchase?.id) {
            await PurchaseService.deletePurchase(selectedPurchase.id);
            resetPurchase();
        }
    }

    async function deleteSale() {
        if (selectedSale?.id) {
            await SaleService.deleteSale(selectedSale.id);
            resetSale();
        }
    }

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Adcionar Movimentação
                </p>
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-1/2">
                        <MovementSearchBar
                            placeholder="Pesquisar movimentação de veículo"
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showResult={true}
                            searchFunctionByTerm={MovementService.getMovementsByCar}
                            setResult={setSelectedMovement}
                        />
                    </div>
                    <Button
                        text="Adcionar"
                        icon={PlusIcon}
                        className="bg-blue"
                        onClick={() => resetState()}
                    />
                    <Button
                        text="Salvar"
                        icon={Save}
                        className="bg-green"
                        onClick={() => registerMovement()}
                    />
                    <Button
                        text="Excluir"
                        icon={Trash}
                        className="bg-red"
                        onClick={() => deleteMovement()}
                    />
                </div>
                <div className="mb-8">
                    <Input
                        label="Veículo"
                        setTerm={setCarDescription}
                        term={carDescription}
                        register={true}
                        setDataId={setCarId}
                        searchAllFunction={CarService.getCars}
                        searchFunctionByTerm={CarService.getCarByDescription}
                        registerTo="/register/car"
                        required
                    />
                </div>
                <div className="flex flex-row overflow-x-auto w-full border-grey rounded-lg overflow-hidden gap-8">
                    <div className="flex flex-col w-1/2">
                        <div className="flex flex-row gap-4 mb-4">
                            <p className="font-semibold text-2xl text-grey">Entrada</p>
                            <Button
                                text="Remover"
                                icon={Minus}
                                className="bg-red"
                                onClick={() => deletePurchase()}
                                enabled={selectedPurchase ? true : false}
                            />
                        </div>
                        <div className="flex flex-col border-2 rounded-8 border-grey p-4 h-full gap-2">
                            <Input<number>
                                setTerm={setPurchaseValue}
                                term={purchaseValue}
                                label="Valor da compra"
                                type="number"
                                min={0}
                                step="0.01"
                                onBlur={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (!isNaN(value)) {
                                        setPurchaseValue(parseFloat(value.toFixed(2)));
                                    }
                                }}
                            />
                            <Input<string>
                                setTerm={setSellerName}
                                term={sellerName}
                                register={true}
                                setDataId={setSellerId}
                                searchAllFunction={ClientService.getClients}
                                searchFunctionByTerm={ClientService.getClientByName}
                                registerTo="/register/client"
                                label="Vendedor"
                            />
                            <Input<string>
                                label="Data da compra"
                                type="date"
                                setTerm={(val) => setPurchaseDate(val ? new Date(val) : null)}
                                term={formatDate(purchaseDate)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <div className="flex flex-row gap-4 mb-4">
                            <p className="font-semibold text-2xl text-grey">Venda</p>
                            <Button
                                text="Remover"
                                icon={Minus}
                                className="bg-red"
                                onClick={() => deleteSale()}
                                enabled={selectedSale ? true : false}
                            />
                        </div>
                        <div className="flex flex-col border-2 border-grey rounded-8 p-4 gap-2">
                            <Input<number>
                                label="Valor de custo"
                                setTerm={setCostValue}
                                term={costValue}
                                type="number"
                                min={0}
                                step="0.01"
                                onBlur={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (!isNaN(value)) {
                                        setCostValue(parseFloat(value.toFixed(2)));
                                    }
                                }}
                            />
                            <Input<number>
                                setTerm={setSaleValue}
                                term={saleValue}
                                label="Valor da venda"
                                type="number"
                                min={0}
                                step="0.01"
                                onBlur={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (!isNaN(value)) {
                                        setSaleValue(parseFloat(value.toFixed(2)));
                                    }
                                }}
                            />
                            <Input<string>
                                label="Comprador"
                                setTerm={setBuyerName}
                                term={buyerName}
                                register={true}
                                searchAllFunction={ClientService.getClients}
                                searchFunctionByTerm={ClientService.getClientByName}
                                registerTo="/register/client"
                                setDataId={setBuyerId}
                            />
                            <Input<string>
                                label="Forma de pagamento"
                                setTerm={setPaymentCondition}
                                term={paymentCondition}
                            />
                            <Input<string>
                                label="Observação"
                                setTerm={setObservation}
                                term={observation}
                            />
                            <Input<string>
                                label="Data da venda"
                                setTerm={(val) => setSaleDate(val ? new Date(val) : null)}
                                term={formatDate(saleDate)}
                                type="date"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout >
    );
}