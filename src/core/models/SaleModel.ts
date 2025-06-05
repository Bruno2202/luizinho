export interface SaleModel {
    id: number | null;
    costValue?: number;
    saleDate?: Date | null;
    saleValue: number;
    observation?: string;
    paymentCondition?: string;
    buyerId: string | null;
}
