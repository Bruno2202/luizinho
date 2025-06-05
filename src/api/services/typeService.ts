import toast from 'react-hot-toast';
import { TypeModel } from '../../core/models/TypeModel';
import api from '../client';
import { ENDPOINTS } from '../endpoints';

export class TypeService {
    static async getTypes() {
        const res = await api.get(ENDPOINTS.type);
        return res.data;
    }

    static async getTypeByDescription(description: string) {
        const res = await api.get(`${ENDPOINTS.type}/description/${description}`);
        return res.data;
    };

    static async getTypeById(id: number) {
        const res = await api.get(`${ENDPOINTS.type}/id/${id}`);
        return res.data;
    };

    static async registerType(type: TypeModel) {
        try {
            const res = await api.post(ENDPOINTS.type, { ...type });

            toast.success("Tipo excluido com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao excluir tipo:", error);

            toast.error(error?.response?.data?.message || "Erro ao excluir o tipo");

            throw error;
        }
    }

    static async updateType(type: TypeModel) {
        try {
            const res = await api.put(ENDPOINTS.type, { ...type });

            toast.success("Tipo excluido com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao excluir tipo:", error);

            toast.error(error?.response?.data?.message || "Erro ao excluir o tipo");

            throw error;
        }

    }

    static async deleteType(id: number) {
        try {
            const res = await api.delete(`${ENDPOINTS.type}/${id}`);

            toast.success("Tipo excluido com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao excluir tipo:", error);

            toast.error(error?.response?.data?.message || "Erro ao excluir o tipo");

            throw error;
        }
    }
}