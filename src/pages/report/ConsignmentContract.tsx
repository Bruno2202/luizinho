import { useState } from "react";
import Input from "../../components/inputs/Input";
import MainLayout from "../../layouts/MainLayout";
import { ClientService } from "../../api/services/clientService";
import { CarService } from "../../api/services/carService";
import Button from "../../components/Button";
import { ClientModel } from "../../core/models/ClientModel";
import { CarModel } from "../../core/models/CarModel";
import { CityService } from "../../api/services/cityService";
import { CityModel } from "../../core/models/CityModel";
import DateTime from "../../components/inputs/DateTime";
import { extractDateTime } from "../../utils/formatDateTime";

export default function ConsignmentContract() {
    const [consigneeName, setConsigneeName] = useState<string | null>(null);
    const [consignee, setConsignee] = useState<ClientModel | null>(null);

    const [consignorName, setConsignorName] = useState<string | null>(null);
    const [consignor, setConsignor] = useState<ClientModel | null>(null);

    const [vehicleDescription, setVehicleDescription] = useState<string | null>(null);
    const [vehicle, setVehicle] = useState<CarModel | null>(null);

    const [contractValue, setContractValue] = useState<number | null>(null);

    const [cityName, setCityName] = useState<string>("");
    const [city, setCity] = useState<CityModel | null>(null);

    const [commissionPercentage, setCommissionPercentage] = useState<string[]>([]);

    const [contractDateTime, setContractDateTime] = useState<string>("");

    const { day, month, year, hour } = extractDateTime(contractDateTime || new Date().toISOString());

    function createContract() {
        const contratoHTML = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Contrato de Consignação de Veículo</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    h1 {
                        text-align: center;
                        margin-bottom: 40px;
                    }
                    p {
                        margin-bottom: 10px;
                    }
                    .signature {
                        margin-top: 60px;
                        display: flex;
                        justify-content: space-between;
                    }
                    .signature div {
                        width: 45%;
                        text-align: center;
                        border-top: 1px solid #000;
                        padding-top: 10px;
                    }
                </style>
            </head>
            <body>
                <h1>CONTRATO DE CONSIGNAÇÃO DE VEÍCULO</h1>

                <p>
                    Pelo presente instrumento, as partes abaixo identificadas:
                    <br><br>
                    <strong>Consignante:</strong> ${consignor?.name ?? "__________"}, CPF/CNPJ: ${consignor?.cpf ?? "__________"}, Endereço: ${consignor?.address ?? "__________"}, ${consignor?.city?.name ?? "__________"} / ${consignor?.city?.ufId ?? "___"}.
                    <br>
                    <strong>Consignatário:</strong> ${consignee?.name ?? "__________"}, CPF/CNPJ: ${consignee?.cpf ?? "__________"}, Endereço: ${consignee?.address ?? "__________"}, ${consignee?.city?.name ?? "__________"} / ${consignee?.city?.ufId ?? "___"}.
                </p>

                <p class="clause">
                    <strong>1.</strong> O Consignante entrega ao Consignatário o veículo: ${vehicle?.brand?.name ?? "__________"}, modelo ${vehicle?.model?.description ?? "__________"}, placa ${vehicle?.plate ?? "__________"}, cor ${vehicle?.color?.description ?? "__________"}, ano ${vehicle?.modelYear ?? "__________"}, chassi ${vehicle?.chassis ?? "__________"} para venda em consignação.
                </p>

                <p class="clause">
                    <strong>2.</strong> O valor de venda acordado é de R$ ${contractValue?.toFixed(2) ?? "__________"}.
                </p>

                <p class="clause">
                    <strong>3.</strong> O Consignatário terá direito a uma comissão de ${commissionPercentage ?? "__________"}% sobre o valor da venda.
                </p>

                <p class="clause">
                    <strong>4.</strong> Caso o veículo não seja vendido, será devolvido ao Consignante nas mesmas condições recebidas.
                </p>

                <p class="clause">
                    <strong>5.</strong> Este contrato poderá ser encerrado por qualquer das partes mediante aviso prévio de 3 (três) dias.
                </p>

                <p class="clause">
                    <strong>6.</strong> Fica eleito o foro da comarca de ${city?.name}/${city?.ufId} para dirimir eventuais conflitos.
                </p>

                <p><strong>Assis, ${day ?? "__________"} de ${month ?? "__________"} de ${year ?? "__________"}, às ${hour ?? "__________"} horas</strong></p>

                <div class="signature">
                    <div>
                        ${consignor?.name}
                        <p>Consignante<p>
                    </div>
                    <div>
                        ${consignee?.name}
                        <p>Consignatário<p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const contractWindow = window.open("", "_blank");
        if (contractWindow) {
            contractWindow.document.open();
            contractWindow.document.write(contratoHTML);
            contractWindow.document.close();
            contractWindow.focus();
            contractWindow.print();
        }
    }

    return (
        <MainLayout>
            <div className="flex flex-col h-full min-h-screen w-full bg-lightGrey p-8">
                <p className="text-black font-bold text-3xl mb-12 text-left w-full">
                    Contrato de Consignação
                </p>

                <form
                    className="flex flex-col gap-4 mt-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        createContract();
                    }}
                >
                    <div className="flex flex-wrap gap-8 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                            <Input
                                label="Consignatário *"
                                setTerm={setConsigneeName}
                                term={consigneeName}
                                setData={setConsignee}
                                register={true}
                                registerTo="/register/client"
                                searchFunctionByTerm={ClientService.getClientByName}
                                searchAllFunction={ClientService.getClients}
                                required
                            />
                            <Input
                                label="Consignante *"
                                setTerm={setConsignorName}
                                term={consignorName}
                                setData={setConsignor}
                                register={true}
                                registerTo="/register/client"
                                searchFunctionByTerm={ClientService.getClientByName}
                                searchAllFunction={ClientService.getClients}
                                required
                                />
                            <Input
                                label="Veículo *"
                                setTerm={setVehicleDescription}
                                term={vehicleDescription}
                                setData={setVehicle}
                                register={true}
                                registerTo="/register/client"
                                searchFunctionByTerm={CarService.getCarByDescription}
                                searchAllFunction={CarService.getCars}
                                required
                                />
                            <Input
                                label="Valor de venda *"
                                symbol="R$"
                                setTerm={setContractValue}
                                term={contractValue}
                                required
                                min={0}
                                type="number"
                                />
                            <Input
                                label="Percentual de comisão *"
                                symbol="%"
                                setTerm={setCommissionPercentage}
                                term={commissionPercentage}
                                required
                                min={0}
                                type="number"
                                />
                            <Input
                                label="Foro da Comarca *"
                                setTerm={setCityName}
                                term={cityName}
                                setData={setCity}
                                register={true}
                                registerTo="/register/city"
                                searchFunctionByTerm={CityService.getCityByName}
                                searchAllFunction={CityService.getCities}
                                required
                                />
                            <DateTime
                                label="Data e hora do contrato"
                                dateTime={contractDateTime}
                                onChangeDateTime={setContractDateTime}
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            text="Criar contrato"
                            className="bg-red"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
