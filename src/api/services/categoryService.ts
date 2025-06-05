import toast from 'react-hot-toast';
import { CategoryModel } from '../../core/models/CategoryModel';
import api from '../client';
import { ENDPOINTS } from '../endpoints';

export class CategoryService {
    static async getCategories() {
        const res = await api.get(ENDPOINTS.category);
        return res.data;
    }

    static async getCategoryByDescription(description: string) {
        const res = await api.get(`${ENDPOINTS.category}/description/${description}`);
        return res.data;
    };

    static async getCategoryById(id: number) {
        const res = await api.get(`${ENDPOINTS.category}/id/${id}`);
        return res.data;
    };

    static async registerCategory(category: CategoryModel) {
        try {
            const res = await api.post(ENDPOINTS.category, { ...category });

            toast.success("Categoria cadastrada com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao cadastrar categoria:", error);

            toast.error(error?.response?.data?.message || "Erro ao cadastrar o categoria");

            throw error;
        }
    }

    static async updateCategory(category: CategoryModel) {
        try {
            const res = await api.put(ENDPOINTS.category, { ...category });

            toast.success("Categoria atualizada com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao atualizar categoria:", error);

            toast.error(error?.response?.data?.message || "Erro ao atualizar o categoria");

            throw error;
        }
    }

    static async deleteCategory(id: number) {
        try {
            const res = await api.delete(`${ENDPOINTS.category}/${id}`);

            toast.success("Categoria excluida com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao excluir categoria:", error);

            toast.error(error?.response?.data?.message || "Erro ao excluir o categoria");

            throw error;
        }
    }
}