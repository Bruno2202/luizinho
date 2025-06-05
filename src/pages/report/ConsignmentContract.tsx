import { useEffect, useRef, useState } from "react";
import Input from "../../components/inputs/Input";
import MainLayout from "../../layouts/MainLayout";
import { ClientService } from "../../api/services/clientService";
import { CarService } from "../../api/services/carService";
import Button from "../../components/Button";
import { ClientModel } from "../../core/models/ClientModel";
import { CarModel } from "../../core/models/CarModel";
import { StoreModel } from "../../core/models/StoreModel";
import { StoreService } from "../../api/services/storeService";

export default function ConsignmentContract() {
    const [buyerName, setBuyerName] = useState<string | null>(null);
    const [buyer, setBuyer] = useState<ClientModel | null>(null);

    const [sellerName, setSellerName] = useState<string | null>(null);
    const [seller, setSeller] = useState<ClientModel | null>(null);

    const [vehicleDescription, setVehicleDescription] = useState<string | null>(null);
    const [vehicle, setVehicle] = useState<CarModel | null>(null);

    const [contractValue, setContractValue] = useState<number | null>(null);
    const [paymentCondition, setPaymentCondition] = useState<string>("");

    const [observation, setObservation] = useState<string[]>([]);

    const [store, setStore] = useState<StoreModel | null>(null);

    useEffect(() => {
        const fetchStore = async () => {
            const store = await StoreService.getStore();
            setStore(store);
        }

        fetchStore();
    }, []);

    function createContract() {
        const contratoHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Contrato de Venda de Veículo em Consignação</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                    line-height: 1.6;
                    margin: 40px;
                }
                h1 {
                    text-align: center;
                    font-size: 18px;
                    margin-bottom: 30px;
                }
                p, .clause {
                    margin-bottom: 12px;
                    text-align: justify;
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
                .location-date {
                    margin-top: 40px;
                }
            </style>
        </head>
        <body>
            <h1>CONTRATO DE VENDA DE VEÍCULO EM CONSIGNAÇÃO</h1>

            <p>
                Por este instrumento particular, Nome, <strong>${seller?.name ?? "__________"}</strong>, 
                <strong>CNPJ/CPF</strong> ${seller?.cpf ?? "__________"} estabelecida (ou residente) à Rua ${seller?.address ?? "__________"},  
                <strong>Cidade/Estado</strong> ${seller?.city ? `${seller.city.name} / ${seller.city.ufId}` : "__________"} , neste ato representada por __________, identificação __________, CPF __________, doravante denominada simplesmente 
                <strong>CONSIGNANTE</strong>, e (razão social ou nome da pessoa) <strong>${buyer?.name ?? "__________"}</strong>, com sede (ou endereço) na cidade de ${buyer?.city ? buyer.city.name : "__________"}, Estado de ${buyer?.city ? buyer.city.ufId : "__________"}, 
                à Rua ${buyer?.address ?? "__________"}, nº ${buyer?.number ?? "__________"}, inscrita no CNPJ (ou CPF) sob o nº ${buyer?.cpf ?? "__________"}, neste ato representada por __________ doravante 
                denominada simplesmente <strong>CONSIGNATÁRIA</strong>, ajustam entre si o que segue, que se obrigam a cumprir por si e seus sucessores:
            </p>

            <p class="clause"><strong>1.</strong> A CONSIGNANTE, na qualidade de legítimo proprietário de um veículo marca ${vehicle?.brand?.name ?? "__________"} placa ${vehicle?.plate ?? "__________"} chassis ${vehicle?.chassis ?? "__________"} ano ${vehicle?.modelYear ?? "__________"} cor ${vehicle?.color?.description ?? "__________"}, confia à CONSIGNATÁRIA, para o fim de comercializá-lo em seu estabelecimento, sito ${store?.name ?? "__________"}, nº ${store?.number ?? "__________"}, na cidade de ${store?.city?.name ?? "__________"}, Estado ${store?.city?.ufId ?? "__________"} pelo valor de R$ ${contractValue?.toFixed(2) ?? "__________"}</p>

            <p class="clause"><strong>2.</strong> A CONSIGNATÁRIA deverá proceder à venda do veículo no prazo não estipulado, sendo que, no prazo de 24 (vinte e quatro) horas da concretização da venda, deverá pagar à CONSIGNANTE o valor da cláusula anterior, deduzido de uma comissão de __________ (%) sobre a venda concretizada.</p>

            <p class="clause"><strong>2.1</strong> – Caso, no prazo avençado, não haja concretização da venda, o veículo será devolvido à CONSIGNANTE, sem que seja devida qualquer comissão ou taxa.</p>

            <p class="clause"><strong>3.</strong> A CONSIGNATÁRIA declara receber, nesta data, o veículo objeto deste contrato sem quaisquer avarias ou defeitos de fabricação aparentes, obrigando-se, ao término do prazo pactuado na cláusula anterior, a restituir os que não conseguir vender no mesmo estado que ora os recebe.</p>

            <p class="clause"><strong>4.</strong> A CONSIGNATÁRIA não ficará exonerada da obrigação de pagar o preço, caso haja impossibilidade de restituição do veículo não vendido, ainda que essa impossibilidade decorra de fato a ela não imputável.</p>

            <p class="clause"><strong>5.</strong> Durante o prazo estipulado para a venda, qualquer das partes poderá rescindir unilateralmente o presente instrumento, sem ônus, desde que pré-avise a outra parte, por escrito, com antecedência de, no mínimo, 3 (três) dias.</p>

            <p class="clause"><strong>6.</strong> As partes elegem o foro da Comarca em __________ (cidade) para dirimir quaisquer litígios a respeito deste contrato.</p>

            <p class="location-date"><strong>Local e data:</strong> __________________________________________</p>

            <div class="signature">
                <div>CONSIGNANTE</div>
                <div>CONSIGNATÁRIA</div>
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
                        <div className="flex flex-col gap-4">
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