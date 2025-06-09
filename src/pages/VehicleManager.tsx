import { useNavigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/Button";
import { FunnelX, Pencil, Search } from "lucide-react";
import Input from "../components/inputs/Input";
import { useEffect, useState } from "react";
import { BrandService } from "../api/services/brandService";
import { ModelService } from "../api/services/modelService";
import { ColorService } from "../api/services/colorService";
import SelectInput from "../components/inputs/SelectInput";
import { CarModel } from "../core/models/CarModel";
import { CarService } from "../api/services/carService";

export default function VehicleManager() {
    const [description, setDescription] = useState<string>("");
    const [plate, setPlate] = useState<string>("");
    const [mileage, setMileage] = useState<number | null>(null);
    const [salePrice, setSalePrice] = useState<number | null>(null);
    const [sold, setSold] = useState<number | null>(null);

    const [brandName, setBrandName] = useState<string | null>("");
    const [brandId, setBrandId] = useState<number | null>(null);

    const [modelDescription, setModelDescription] = useState<string>("");
    const [modelId, setModelId] = useState<number | null>(null);

    const [colorDescription, setColorDescription] = useState<string>("");
    const [colorId, setColorId] = useState<number | null>(null);

    const [cars, setCars] = useState<CarModel[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCars();
    }, []);

    async function fetchCars() {
        const cars: CarModel[] = await CarService.getCars();
        setCars(cars);
    }

    async function resetFilters() {
        setDescription("");
        setPlate("");
        setMileage(null);
        setSalePrice(null);
        setSold(null);

        setBrandName("");
        setBrandId(null);

        setModelDescription("");
        setModelId(null);

        setColorDescription("");
        setColorId(null);

        await fetchCars();
    }

    async function fetchFilteredCars() {
        try {
            const allCars: CarModel[] = await CarService.getCars();

            const filtered = allCars.filter((car) => {
                let isValid = true;

                if (description && !car.description.toLowerCase().includes(description.toLowerCase())) {
                    isValid = false;
                }

                if (plate && !car.plate.toLowerCase().includes(plate.toLowerCase())) {
                    isValid = false;
                }

                if (brandId && car.brandId !== brandId) {
                    isValid = false;
                }

                if (modelId && car.modelId !== modelId) {
                    isValid = false;
                }

                if (colorId && car.colorId !== colorId) {
                    isValid = false;
                }

                if (mileage && car.mileage != mileage) {
                    console.log(mileage, car.mileage)
                    isValid = false;
                }

                if (salePrice && car.salePrice != salePrice) {
                    isValid = false;
                }

                if (sold == 1 && car.sold != true) {
                    isValid = false;
                } else if (sold == 2 && car.sold != false) {
                    isValid = false;
                }

                return isValid;
            });

            setCars(filtered);
        } catch (error) {
            console.error("Erro ao buscar ou filtrar carros:", error);
        }
    }

    return (
        <MainLayout>
            <div className="flex flex-col min-h-screen w-full bg-lightGrey p-8 items-center overflow-y-auto">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Gerenciador de Veículos
                </p>
                <div className="flex flex-col items-start justify-start mt-4 gap-4 w-full mb-4">
                    <Button
                        className="bg-black"
                        text="Resetar filtros"
                        onClick={() => resetFilters()}
                        icon={FunnelX}
                    />
                </div>
                <form
                    className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8"
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchFilteredCars();
                    }}
                >
                    <Input
                        label="Descrição"
                        setTerm={setDescription}
                        term={description}
                    />
                    <Input
                        label="Placa"
                        setTerm={setPlate}
                        term={plate}
                    />
                    <Input
                        label="Marca"
                        setTerm={setBrandName}
                        term={brandName}
                        setDataId={setBrandId}
                        searchAllFunction={BrandService.getBrands}
                        searchFunctionByTerm={BrandService.getBrandByName}
                        register={true}
                        registerTo="/register/brand"
                    />
                    <Input
                        label="Modelo"
                        setTerm={setModelDescription}
                        term={modelDescription}
                        setDataId={setModelId}
                        searchAllFunction={ModelService.getModels}
                        searchFunctionByTerm={ModelService.getModelByDescription}
                        register={true}
                        registerTo="/register/model"
                    />
                    <Input
                        label="Cor"
                        setTerm={setColorDescription}
                        term={colorDescription}
                        setDataId={setColorId}
                        searchAllFunction={ColorService.getColors}
                        searchFunctionByTerm={ColorService.getColorByDescription}
                        register={true}
                        registerTo="/register/color"
                    />
                    <Input
                        label="Quilometragem"
                        setTerm={setMileage}
                        term={mileage}
                    />
                    <Input
                        label="Preço de venda"
                        symbol="R$"
                        setTerm={setSalePrice}
                        term={salePrice}
                    />
                    <SelectInput
                        label="Vendido"
                        setData={setSold}
                        data={sold}
                        options={[
                            { id: 1, description: "Sim" },
                            { id: 2, description: "Não" }
                        ]}
                    />

                    <div className="flex flex-col items-start justify-start mt-4 gap-4 ">
                        <Button
                            className="bg-red"
                            text="Pesquisar"
                            type="submit"
                            icon={Search}
                        />
                    </div>
                </form>

                <div className="overflow-x-auto w-full border-grey rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-mediumGrey text-grey text-center">
                                <th className="p-2 border-2 border-grey">Descrição</th>
                                <th className="p-2 border-2 border-grey">Placa</th>
                                <th className="p-2 border-2 border-grey">Cor</th>
                                <th className="p-2 border-2 border-grey">Marca</th>
                                <th className="p-2 border-2 border-grey">Modelo</th>
                                <th className="p-2 border-2 border-grey">Categoria</th>
                                <th className="p-2 border-2 border-grey">Transmissão</th>
                                <th className="p-2 border-2 border-grey">Combustível</th>
                                <th className="p-2 border-2 border-grey">Vedido</th>
                                <th className="p-2 border-2 border-grey">Valor de venda</th>
                                <th className="p-2 border-2 border-grey">Quilometragem</th>
                                <th className="p-2 border-2 border-grey">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car) => (
                                <tr key={car.id} className="hover:bg-gray-50">
                                    <td className="p-2 border-2 border-grey text-left">
                                        {car.description ?? "—"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-left">
                                        {car.plate ?? "—"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-left">
                                        {car.color?.description ?? "—"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-left">
                                        {car.brand?.name ?? "—"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-left">
                                        {car.model?.description ?? "—"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-left">
                                        {car.category?.description ?? "—"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-left">
                                        {car.transmission?.description ?? "—"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-left">
                                        {car.fuel?.description ?? "—"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-left">
                                        {typeof car.sold === "boolean"
                                            ? car.sold
                                                ? "Sim"
                                                : "Não"
                                            : "—"}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-blue text-left">
                                        {car.salePrice == null
                                            ? "—"
                                            : `R$ ${car.salePrice.toFixed(2)}`}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-left">
                                        {car.salePrice == null
                                            ? "—"
                                            : `${car.mileage} Km`}
                                    </td>
                                    <td className="p-2 border-2 border-grey text-center">
                                        <div className="flex justify-center">
                                            <Pencil
                                                className="text-grey cursor-pointer"
                                                onClick={() => navigate(`/register/car?id=${car.id}`)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </MainLayout >
    );
}