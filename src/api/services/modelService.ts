import toast from 'react-hot-toast';
import { ModelModel } from '../../core/models/ModelModel';
import api from '../client';
import { ENDPOINTS } from '../endpoints';

export class ModelService {
    static async getModels() {
        const res = await api.get(ENDPOINTS.model);
        return res.data;
    }

    static async getModelByDescription(description: string) {
        const res = await api.get(`${ENDPOINTS.model}/description/${description}`);
        return res.data;
    };

    static async getModelById(id: number) {
        const res = await api.get(`${ENDPOINTS.model}/id/${id}`);
        return res.data;
    };

    static async registerModel(model: ModelModel) {
        try {
            const res = await api.post(ENDPOINTS.model, { ...model });

            toast.success("Modelo cadastrado com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao cadastrar carro:", error);

            toast.error(error?.response?.data?.message || "Erro ao cadastrar modelo");

            throw error;
        }
    }

    static async updateModel(model: ModelModel) {
        try {
            const res = await api.put(ENDPOINTS.model, { ...model });

            toast.success("Modelo atualizado com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao atualizar modelo:", error);

            toast.error(error?.response?.data?.message || "Erro ao atualizar modelo");

            throw error;
        }
    }

    static async deleteModel(id: number) {
        try {
            const res = await api.delete(`${ENDPOINTS.model}/${id}`);

            toast.success("Modelo excluido com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao excluir modelo:", error);

            toast.error(error?.response?.data?.message || "Erro ao excluir modelo");

            throw error;
        }
    }
}