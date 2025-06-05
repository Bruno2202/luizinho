import toast from 'react-hot-toast';
import { CityModel } from '../../core/models/CityModel';
import api from '../client';
import { ENDPOINTS } from '../endpoints';

export class CityService {
    static async getCities() {
        const res = await api.get(ENDPOINTS.city);
        return res.data;
    }

    static async getCityByName(name: string) {
        const res = await api.get(`${ENDPOINTS.city}/name/${name}`);
        return res.data;
    };

    static async getCityById(id: number) {
        const res = await api.get(`${ENDPOINTS.city}/id/${id}`);
        return res.data;
    };

    static async registerCity(city: CityModel) {
        try {
            const res = await api.post(ENDPOINTS.city, { ...city });

            toast.success("Cidade cadastrada com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao cadastrada cidade:", error);

            toast.error(error?.response?.data?.message || "Erro ao cadastrada o cidade");

            throw error;
        }
    }

    static async updateCity(city: CityModel) {
        try {
            const res = await api.put(ENDPOINTS.city, { ...city });

            toast.success("Cidade atualizada com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao atualizar cidade:", error);

            toast.error(error?.response?.data?.message || "Erro ao atualizar o cidade");

            throw error;
        }
    }

    static async deleteCity(id: number) {
        try {
            const res = await api.delete(`${ENDPOINTS.city}/${id}`);

            toast.success("Cidade excluida com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao excluida cidade:", error);

            toast.error(error?.response?.data?.message || "Erro ao excluida o cidade");

            throw error;
        }
    }
}