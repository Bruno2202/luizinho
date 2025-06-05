import { BrandModel } from "./BrandModel";
import { CategoryModel } from "./CategoryModel";
import { ColorModel } from "./ColorModel";
import { FuelModel } from "./FuelModel";
import { ModelModel } from "./ModelModel";
import { TransmissionModel } from "./TransmissionModel";
import { TypeModel } from "./TypeModel";

export interface CarModel {
    id: number | null;
    description: string;
    plate: string;
    renavam?: string;
    chassis?: string;
    manufactureYear?: number | null;
    modelYear?: number | null;
    mileage?: number | null;
    salePrice?: number | null;
    observation?: string;
    sold: boolean;
    images?: string;
    typeId?: number | null;
    categoryId?: number | null;
    transmissionId?: number | null;
    fuelId?: string | null;
    colorId?: number | null;
    modelId: number;
    brandId: number;

    brand?: BrandModel;
    category?: CategoryModel;
    color?: ColorModel;
    fuel?: FuelModel;
    transmission?: TransmissionModel;
    type?: TypeModel;
    model?: ModelModel;
}
