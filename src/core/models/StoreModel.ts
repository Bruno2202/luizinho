import { CityModel } from "./CityModel";

export interface StoreModel {
    id: number | null;
    name: string;
    address?: string;
    neighborhood?: string;
    cnpj?: string;
    contact?: string;
    number?: string;
    cityId?: number;
    city?: CityModel;
}
