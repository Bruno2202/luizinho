import toast from 'react-hot-toast';
import api from '../client';
import { ENDPOINTS } from '../endpoints';
import { SaleModel } from '../../core/models/SaleModel';

export class SaleService {
    static async registerSale(sale: SaleModel, movementId: number) {
        try {
            const res = await api.post(ENDPOINTS.sale, {
                movementId,
                sale: sale
            });

            // toast.success("Venda cadastrada com sucesso!");

            return res.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Erro ao cadastrar a venda");

            throw error;
        }
    }

    static async updateSale(sale: SaleModel) {
        try {
            const res = await api.put(ENDPOINTS.sale, sale);

            // toast.success("Venda atualizada com sucesso!");

            return res.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Erro ao atualizar a venda");

            throw error;
        }
    }

    static async deleteSale(id: number) {
        try {
            const res = await api.delete(`${ENDPOINTS.sale}/${id}`);

            toast.success("Venda excluída com sucesso!");

            return res.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Erro ao excluir a venda");

            throw error;
        }
    }
}