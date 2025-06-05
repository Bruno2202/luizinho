import toast from 'react-hot-toast';
import { ColorModel } from '../../core/models/ColorModel';
import api from '../client';
import { ENDPOINTS } from '../endpoints';

export class ColorService {
    static async getColors() {
        const res = await api.get(ENDPOINTS.color);
        return res.data;
    }

    static async getColorByDescription(description: string) {
        const res = await api.get(`${ENDPOINTS.color}/description/${description}`);
        return res.data;
    };

    static async getColorById(id: number) {
        const res = await api.get(`${ENDPOINTS.color}/id/${id}`);
        console.log(res)
        return res.data;
    };

    static async registerColor(color: ColorModel) {
        try {
            const res = await api.post(ENDPOINTS.color, { ...color });

            toast.success("Cor cadastrada com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao cadastrada cor:", error);

            toast.error(error?.response?.data?.message || "Erro ao cadastrada o cor");

            throw error;
        }
    }

    static async updateColor(color: ColorModel) {
        try {
            const res = await api.put(ENDPOINTS.color, { ...color });

            toast.success("Cor atualizada com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao atualizar cor:", error);

            toast.error(error?.response?.data?.message || "Erro ao atualizar o cor");

            throw error;
        }
    }

    static async deleteColor(id: number) {
        try {
            const res = await api.delete(`${ENDPOINTS.color}/${id}`);

            toast.success("Cor excluida com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao excluir cor:", error);

            toast.error(error?.response?.data?.message || "Erro ao excluir o cor");

            throw error;
        }
    }
}