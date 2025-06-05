import toast from 'react-hot-toast';
import { BrandModel } from '../../core/models/BrandModel';
import api from '../client';
import { ENDPOINTS } from '../endpoints';

export class BrandService {
    static async getBrands() {
        const res = await api.get(ENDPOINTS.brand);
        return res.data;
    }

    static async getBrandByName(name: string) {
        const res = await api.get(`${ENDPOINTS.brand}/name/${name}`);
        return res.data;
    };

    static async getBrandById(id: number) {
        const res = await api.get(`${ENDPOINTS.brand}/id/${id}`);
        return res.data;
    };

    static async registerBrand(brand: BrandModel) {
        try {
            const res = await api.post(ENDPOINTS.brand, { ...brand });

            toast.success("Marca cadastrada com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao cadastrar marcar:", error);

            toast.error(error?.response?.data?.message || "Erro ao cadastrar o marca");

            throw error;
        }

    }

    static async updateBrand(brand: BrandModel) {
        try {
            const res = await api.put(ENDPOINTS.brand, { ...brand });

            toast.success("Marca atualizada com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao cadastrar marca:", error);

            toast.error(error?.response?.data?.message || "Erro ao cadastrar o marca");

            throw error;
        }

    }

    static async deleteBrand(id: number) {
        try {
            const res = await api.delete(`${ENDPOINTS.brand}/${id}`);

            toast.success("Marca excluida com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao cadastrar marca:", error);

            toast.error(error?.response?.data?.message || "Erro ao cadastrar o marca");

            throw error;
        }

    }
}