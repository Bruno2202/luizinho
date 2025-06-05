import toast from 'react-hot-toast';
import api from '../client';
import { ENDPOINTS } from '../endpoints';
import { MovementModel } from '../../core/models/MovementModel';

export class MovementService {
    static async getMovements() {
        const res = await api.get(ENDPOINTS.movement);
        return res.data;
    }

    static async getMovementsByCar(description: string) {
        const res = await api.get(`${ENDPOINTS.movement}/car/${description}`);
        return res.data;
    };

    static async getMovementById(id: number) {
        const res = await api.get(`${ENDPOINTS.movement}/id/${id}`);
        return res.data;
    };

    static async registerMovement(movement: MovementModel) {
        try {
            const res = await api.post(ENDPOINTS.movement, { ...movement });

            toast.success("Movimentação cadastrada com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao adicionar movimentação:", error);

            toast.error(error?.response?.data?.message || "Erro ao adicionar o movimentação");

            throw error;
        }
    }

    static async updateMovement(movement: MovementModel) {
        try {
            const res = await api.put(ENDPOINTS.movement, { ...movement });

            toast.success("Movimentação atualizada com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao atualizar movimentação:", error);

            toast.error(error?.response?.data?.message || "Erro ao atualizar o movimentação");

            throw error;
        }
    }

    static async deleteMovement(id: number) {
        try {
            const res = await api.delete(`${ENDPOINTS.movement}/${id}`);

            toast.success("Movimentação excluida com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao excluir movimentação:", error);

            toast.error(error?.response?.data?.message || "Erro ao excluir o movimentação");

            throw error;
        }
    }
}