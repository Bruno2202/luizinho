import { useEffect, useRef, useState } from "react";
import Input from "../../components/inputs/Input";
import MainLayout from "../../layouts/MainLayout";
import { ClientService } from "../../api/services/clientService";
import { CarService } from "../../api/services/carService";
import Button from "../../components/Button";
import { ClientModel } from "../../core/models/ClientModel";
import { CarModel } from "../../core/models/CarModel";

export default function SalesContract() {
    const [buyerName, setBuyerName] = useState<string | null>(null);
    const [buyer, setBuyer] = useState<ClientModel | null>(null);

    const [sellerName, setSellerName] = useState<string | null>(null);
    const [seller, setSeller] = useState<ClientModel | null>(null);

    const [vehicleDescription, setVehicleDescription] = useState<string | null>(null);
    const [vehicle, setVehicle] = useState<CarModel | null>(null);

    const [contractValue, setContractValue] = useState<number | null>(null);
    const [paymentCondition, setPaymentCondition] = useState<string>("");

    const [observation, setObservation] = useState<string[]>([
        "Caso o vendedor não receba em prazo acima citado os valores, terá direito de retomada imediata de posse do veículo e receber multa rescisória de 10%(DEZ por cento) sobre o valor do contrato, com custos e honorários por conta do comprador.",
        "O vendedor responsabiliza-se civil e criminalmente por qualquer eventualidade com relação a multas de trânsito ou qualquer natureza nas prestações, débitos de ônus. alienações fiduciárias ou reserva de domínio que sejam gerados até a presente data, com relação ao veiculo.",
        "O comprador assume todas as responsabilidades acima citadas, que sejam geradas a partir da presente data e declara estar ciente que adquiriu o veículo acima descrito."
    ]);

    function createContract() {
        console.log(seller)
        console.log(buyer)

        const contratoHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Contrato de Compra e Venda</title>
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
                    .assinatura {
                        margin-top: 60px;
                        display: flex;
                        justify-content: space-between;
                    }
                    .assinatura div {
                        width: 45%;
                        text-align: center;
                        border-top: 1px solid #000;
                        padding-top: 10px;
                    }
                </style>
            </head>
            <body>
                <h1>Contrato de Compra e Venda de Veículo</h1>

                <h3>Comprador: ${buyer?.name}</h3>
                <p><strong>CPF:</strong> ${buyer?.cpf ?? "__________"}</p>
                <p><strong>Endereço:</strong> ${buyer?.address ?? "__________"}, ${buyer?.number ?? "__________"} - ${buyer?.neighborhood ?? "__________"}</p>
                <p><strong>Cidade:</strong> ${buyer?.city ? `${buyer?.city.name} - ${buyer?.city.ufId}` : "__________"}</p>
                <p><strong>Fone:</strong> ${buyer?.contact ?? "__________"} <strong>CPF:</strong> ${buyer?.cpf ?? "__________"} <strong>RG:</strong> ${buyer?.rg ?? "__________"}</p>
                
                <br>

                <h3>Vendedor: ${seller?.name}</h3>
                <p><strong>CPF:</strong> ${seller?.cpf}</p>
                <p><strong>Endereço:</strong> ${seller?.address ?? "__________"}, ${seller?.number ?? ""} - ${seller?.neighborhood ?? "__________"}</p>
                <p><strong>Cidade:</strong> ${seller?.city ? `${seller?.city.name} - ${seller?.city.ufId}` : "__________"}</p>
                <p><strong>Fone:</strong> ${seller?.contact ?? "__________"} <strong>CPF:</strong> ${seller?.cpf ?? "__________"} <strong>RG:</strong> ${seller?.rg ?? "__________"}</p>

                <br>

                <h3>Informações do Veículo</h3>
                <p><strong>Veículo:</strong> ${vehicleDescription}</p>

                <p><strong>Valor do Contrato:</strong> R$ ${typeof contractValue === "number" ? contractValue.toFixed(2) : "__________"}</p>
                <p><strong>Condição de Pagamento:</strong> ${paymentCondition}</p>

                <br>
                <h3>Observações:</h3>
                <ul>
                    ${observation.map(obs => `<li>${obs}</li>`).join("")}
                </ul>

                <br>

                <div class="assinatura">
                    <div>${buyer?.name}</div>
                    <div>${seller?.name}</div>
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
                    Contrato de Venda e Compra
                </p>

                <form
                    className="felx flex-col gap-4 mt-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        createContract();
                    }}
                >
                    <div className="flex flex-row flex-wrap gap-8 mb-4">
                        <div>
                            <Input
                                label="Comprador"
                                setTerm={setBuyerName}
                                term={buyerName}
                                setData={setBuyer}
                                register={true}
                                registerTo="/register/client"
                                searchFunctionByTerm={ClientService.getClientByName}
                                searchAllFunction={ClientService.getClients}
                                required
                            />
                            <Input
                                label="Vendedor"
                                setTerm={setSellerName}
                                term={sellerName}
                                setData={setSeller}
                                register={true}
                                registerTo="/register/client"
                                searchFunctionByTerm={ClientService.getClientByName}
                                searchAllFunction={ClientService.getClients}
                                required
                            />
                            <Input
                                label="Veículo"
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
                                label="Valor de compra/venda"
                                setTerm={setContractValue}
                                term={contractValue}
                                required
                                min={0}
                                type="number"
                            />
                            <Input
                                label="Condição de pagamento"
                                setTerm={setPaymentCondition}
                                term={paymentCondition}
                                required
                            />
                        </div>
                        <div className="flex flex-1 flex-row gap-4 w-full items-center justify-center">
                            {observation.map((item, index) =>
                                <div key={index} className="flex flex-col h-full w-full">
                                    <p>Observação {index + 1}</p>
                                    <textarea
                                        readOnly
                                        key={index}
                                        rows={4}
                                        value={item}
                                        placeholder={`Observação ${index + 1}`}
                                        className="resize-none w-full p-4 rounded-8 h-full border-2 border-grey outline-0"
                                    />
                                </div>
                            )}
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