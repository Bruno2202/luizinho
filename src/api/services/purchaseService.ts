import toast from 'react-hot-toast';
import api from '../client';
import { ENDPOINTS } from '../endpoints';
import { PurchaseModel } from '../../core/models/PurchaseModel';

export class PurchaseService {
    static async registerPurchase(purchase: PurchaseModel, movementId: number) {
        try {
            const res = await api.post(ENDPOINTS.purchase, {
                movementId,
                purchase: purchase
            });

            // toast.success("Compra cadastrada com sucesso!");

            return res.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Erro ao cadastrar a compra");

            throw error;
        }
    }

    static async updatePurchase(purchase: PurchaseModel) {
        try {
            const res = await api.put(ENDPOINTS.purchase, purchase);

            // toast.success("Compra atualizada com sucesso!");

            return res.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Erro ao atualizar a compra");

            throw error;
        }
    }

    static async deletePurchase(id: number) {
        try {
            const res = await api.delete(`${ENDPOINTS.purchase}/${id}`);

            toast.success("Compra excluída com sucesso!");

            return res.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Erro ao excluir a compra");

            throw error;
        }
    }
}