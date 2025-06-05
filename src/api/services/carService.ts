import toast from 'react-hot-toast';
import { CarModel } from '../../core/models/CarModel';
import api from '../client';
import { ENDPOINTS } from '../endpoints';

export class CarService {
    static async getCars() {
        const res = await api.get(ENDPOINTS.car);
        return res.data;
    }

    static async getCarByDescription(description: string) {
        const res = await api.get(`${ENDPOINTS.car}/description/${description}`);
        return res.data;
    };

    static async getCarById(id: number) {
        const res = await api.get(`${ENDPOINTS.car}/id/${id}`);
        return res.data;
    };

    static async registerCar(car: CarModel) {
        try {
            const res = await api.post(ENDPOINTS.car, { ...car });

            toast.success("Carro cadastrado com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao cadastrar carro:", error);

            toast.error(error?.response?.data?.message || "Erro ao cadastrar o carro");

            throw error;
        }
    }

    static async updateCar(car: CarModel) {
        try {
            const res = await api.put(ENDPOINTS.car, { ...car });

            toast.success("Carro atualizado com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao atualizar carro:", error);

            toast.error(error?.response?.data?.message || "Erro ao atualizar o carro");

            throw error;
        }
    }

    static async deleteCar(id: number) {
        try {
            const res = await api.delete(`${ENDPOINTS.car}/${id}`);

            toast.success("Carro excluido com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao excluir carro:", error);

            toast.error(error?.response?.data?.message || "Erro ao excluir o carro");

            throw error;
        }
    }
}