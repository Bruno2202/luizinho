import { useEffect, useState } from "react";
import Input from "../../components/inputs/Input";
import SearchBar from "../../components/inputs/SearchBar";
import MainLayout from "../../layouts/MainLayout";
import { BrandService } from "../../api/services/brandService";
import { TypeService } from "../../api/services/typeService";
import { ModelService } from "../../api/services/modelService";
import { CategoryService } from "../../api/services/categoryService";
import { ColorService } from "../../api/services/colorService";
import { FuelService } from "../../api/services/fuelService";
import { TransmissionService } from "../../api/services/transmissionService";
import Button from "../../components/Button";
import SelectInput from "../../components/inputs/SelectInput";
import { PlusIcon, Save, Trash } from "lucide-react";
import { CarService } from "../../api/services/carService";
import { CarModel } from "../../core/models/CarModel";
import { useSearchParams } from "react-router";

export default function Car() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCar, setSelectedCar] = useState<CarModel>();

    const [description, setDescription] = useState<string>("");
    const [plate, setPlate] = useState<string>("");
    const [mileage, setMileage] = useState<number | null>(null);
    const [manufactureYear, setManufactureYear] = useState<number | null>(null);
    const [modelYear, setModelYear] = useState<number | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [renavam, setRenavam] = useState<string>("");
    const [chassis, setChassis] = useState<string>("");
    const [observation, setObservation] = useState<string>("");

    const [typeDescription, setTypeDescription] = useState<string>("");
    const [typeId, setTypeId] = useState<number | null>(null);

    const [brandName, setBrandName] = useState<string>("");
    const [brandId, setBrandId] = useState<number | null>(null);

    const [modelDescription, setModelDescription] = useState<string>("");
    const [modelId, setModelId] = useState<number | null>(null);

    const [categoryDescription, setCategoryDescription] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number | null>(null);

    const [colorName, setColorName] = useState<string>("");
    const [colorId, setColorId] = useState<number | null>(null);

    const [transmissionId, setTransmissionId] = useState<number | null>(null);
    const [fuelId, setFuelId] = useState<string | null>(null);
    const [sold, setSold] = useState<number | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        const fetchMovementDataById = async () => {
            if (id) {
                const car = await CarService.getCarById(Number(id));
                setSelectedCar(car);
            }
        }

        fetchMovementDataById();
    }, []);

    useEffect(() => {
        const fetchRelatedData = async () => {
            if (!selectedCar) return;

            setDescription(selectedCar.description || "");
            setPlate(selectedCar.plate || "");
            setMileage(selectedCar.mileage ?? null);
            setManufactureYear(selectedCar.manufactureYear ?? null);
            setModelYear(selectedCar.modelYear ?? null);
            setPrice(selectedCar.salePrice ?? null);
            setRenavam(selectedCar.renavam || "");
            setChassis(selectedCar.chassis || "");
            setObservation(selectedCar.observation || "");
            setSold(
                selectedCar.sold === true ? 1 :
                    selectedCar.sold === false ? 2 :
                        null
            );

            setTypeId(selectedCar.typeId ?? null);
            setCategoryId(selectedCar.categoryId ?? null);
            setTransmissionId(selectedCar.transmissionId ?? null);
            setFuelId(selectedCar.fuelId ?? null);
            setColorId(selectedCar.colorId ?? null);
            setModelId(selectedCar.modelId);
            setBrandId(selectedCar.brandId);

            const brand = await BrandService.getBrandById(selectedCar.brandId);
            setBrandName(brand?.name || "");

            const model = await ModelService.getModelById(selectedCar.modelId);
            setModelDescription(model?.description || "");

            if (selectedCar.typeId) {
                setTypeDescription((await TypeService.getTypeById(selectedCar.typeId))?.description || "");
            }

            if (selectedCar.categoryId) {
                setCategoryDescription((await CategoryService.getCategoryById(selectedCar.categoryId))?.description || "");
            }

            if (selectedCar.colorId) {
                setColorName((await ColorService.getColorById(selectedCar.colorId))?.description || "");
            }

            setSearchParams({ id: `${selectedCar.id}` });
        };

        fetchRelatedData();
    }, [selectedCar]);

    function resetState() {
        setSearchTerm("");
        setSelectedCar(undefined);

        setDescription("");
        setPlate("");
        setMileage(null);
        setManufactureYear(null);
        setModelYear(null);
        setPrice(null);
        setRenavam("");
        setChassis("");
        setObservation("");

        setTypeDescription("");
        setTypeId(null);

        setBrandName("");
        setBrandId(null);

        setModelDescription("");
        setModelId(null);

        setCategoryDescription("");
        setCategoryId(null);

        setColorName("");
        setColorId(null);

        setTransmissionId(null);
        setFuelId(null);
        setSold(null);
    }

    const car: CarModel = {
        id: selectedCar ? selectedCar.id : null,
        description,
        plate,
        renavam,
        chassis,
        manufactureYear,
        modelYear,
        mileage,
        salePrice: price,
        observation,
        sold: sold == 1 ? true : false,
        categoryId,
        transmissionId: transmissionId ? Number(transmissionId) : null,
        fuelId,
        colorId,
        modelId: modelId!,
        brandId: brandId!,
        typeId: typeId
    };

    async function registerCar() {
        if (selectedCar) {
            await CarService.updateCar(car);
            setSearchTerm("");
        } else {
            console.log(car)
            const data = await CarService.registerCar(car);
            setSelectedCar(data);
        }
    }

    function deleteCar() {
        if (selectedCar && selectedCar.id) {
            CarService.deleteCar(selectedCar.id);
            resetState();
        }
    }

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Cadastro de Veículos
                </p>

                <div className="flex items-center gap-4">
                    <div className="w-1/2">
                        <SearchBar
                            placeholder="Pesquisar veículo"
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showResult={true}
                            searchFunctionByTerm={CarService.getCarByDescription}
                            setResult={setSelectedCar}
                        />
                    </div>
                    <Button
                        text="Adcionar"
                        icon={PlusIcon}
                        className="bg-blue"
                        onClick={() => resetState()}
                    />
                </div>

                <form
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        registerCar();
                    }}
                >
                    <Input<String>
                        label="Descrição *"
                        required
                        term={description}
                        setTerm={setDescription}
                    />
                    <Input<number>
                        label="Marca*"
                        required
                        term={brandName}
                        setTerm={setBrandName}
                        register={true}
                        searchFunctionByTerm={BrandService.getBrandByName}
                        searchAllFunction={BrandService.getBrands}
                        setDataId={setBrandId}
                        registerTo="/register/brand"
                    />
                    <Input<number>
                        label="Modelo *"
                        required
                        term={modelDescription}
                        setTerm={setModelDescription}
                        register={true}
                        searchFunctionByTerm={ModelService.getModelByDescription}
                        searchAllFunction={ModelService.getModels}
                        setDataId={setModelId}
                        registerTo="/register/model"
                    />
                    <Input<String>
                        label="Placa *"
                        required
                        term={plate}
                        setTerm={setPlate}
                    />
                    <Input<number>
                        label="Quilometragem"
                        type="number"
                        min={0}
                        term={mileage}
                        setTerm={setMileage}
                    />
                    <Input<number>
                        label="Ano de fabricação"
                        type="number"
                        min={1900}
                        term={manufactureYear}
                        setTerm={setManufactureYear}
                    />
                    <Input<number>
                        label="Ano do modelo"
                        type="number"
                        min={1900}
                        term={modelYear}
                        setTerm={setModelYear}
                    />

                    <Input<number>
                        label="Preço de venda"
                        type="number"
                        min={0}
                        step="0.01"
                        term={price}
                        setTerm={setPrice}
                        onBlur={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value)) {
                                setPrice(parseFloat(value.toFixed(2)));
                            }
                        }}
                    />
                    <Input<string>
                        label="Renavam"
                        term={renavam}
                        setTerm={setRenavam}
                    />
                    <Input<string>
                        label="Chassi"
                        term={chassis}
                        setTerm={setChassis}
                    />
                    <Input<number>
                        label="Tipo"
                        term={typeDescription}
                        setTerm={setTypeDescription}
                        register={true}
                        searchFunctionByTerm={TypeService.getTypeByDescription}
                        searchAllFunction={TypeService.getTypes}
                        setDataId={setTypeId}
                        registerTo="/register/type"
                    />
                    <Input<number>
                        label="Categoria"
                        term={categoryDescription}
                        setTerm={setCategoryDescription}
                        register={true}
                        searchFunctionByTerm={CategoryService.getCategoryByDescription}
                        searchAllFunction={CategoryService.getCategories}
                        setDataId={setCategoryId}
                        registerTo="/register/category"
                    />
                    <Input<number>
                        label="Cor"
                        term={colorName}
                        setTerm={setColorName}
                        register={true}
                        searchFunctionByTerm={ColorService.getColorByDescription}
                        searchAllFunction={ColorService.getColors}
                        setDataId={setColorId}
                        registerTo="/register/color"
                    />
                    <SelectInput<number>
                        label="Transmissão"
                        searchAllFunction={TransmissionService.getTransmissions}
                        setData={setTransmissionId}
                        data={transmissionId}
                    />
                    <SelectInput<string>
                        label="Combustível"
                        searchAllFunction={FuelService.getFuels}
                        setData={setFuelId}
                        data={fuelId}
                    />
                    <SelectInput<number>
                        label="Vendido"
                        setData={setSold}
                        data={sold}
                        options={[
                            { id: 1, description: "Sim" },
                            { id: 2, description: "Não" }
                        ]}
                    />

                    <div className="col-span-1 md:col-span-4">
                        <Input<string>
                            label="Observação"
                            term={observation}
                            setTerm={setObservation}
                        />
                    </div>

                    <div className="flex flex-row gap-4 w-full">
                        <Button
                            type="submit"
                            text="Salvar"
                            className="bg-green"
                            icon={Save}
                        />
                        <Button
                            enabled={selectedCar?.id ? true : false}
                            text="Excluir"
                            className="bg-red"
                            icon={Trash}
                            onClick={() => deleteCar()}
                        />
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
