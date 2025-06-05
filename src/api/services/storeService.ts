import toast from 'react-hot-toast';
import api from '../client';
import { ENDPOINTS } from '../endpoints';
import { StoreModel } from '../../core/models/StoreModel';

export class StoreService {
    static async getStore() {
        const res = await api.get(ENDPOINTS.store);
        return res.data;
    }

    static async updateStore(store: StoreModel) {
        try {
            const res = await api.put(ENDPOINTS.store, { ...store });

            toast.success("Loja atualizada com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao atualizar loja:", error);

            toast.error(error?.response?.data?.message || "Erro ao atualizar o loja");

            throw error;
        }
    }
}