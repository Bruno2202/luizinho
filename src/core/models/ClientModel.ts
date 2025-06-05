import { CityModel } from "./CityModel";

export interface ClientModel {
    id: string | null;
    name: string;
    picture?: string | null;
    cpf: string | null;
    rg?: string | null;
    birthDate?: Date | null;
    registrationDate?: Date | null;
    contact?: string | null;
    address?: string | null;
    neighborhood?: string | null;
    number?: string | null;
    zipCode?: string     | null;
    cityId: number | null;

    city: CityModel;
}
