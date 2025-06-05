export interface PurchaseModel {
    id: number | null;
    purchaseDate?: Date;
    purchaseValue?: number;
    sellerId: string | null;
}
