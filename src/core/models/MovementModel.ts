import { CarModel } from "./CarModel";
import { PurchaseModel } from "./PurchaseModel";
import { SaleModel } from "./SaleModel";

export interface MovementModel {
    id: number | null;
    purchaseId?: number | null;
    saleId?: number | null;
    carId: number | null;
    purchase?: PurchaseModel;
    sale?: SaleModel;
    car?: CarModel;
}
