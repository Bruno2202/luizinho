import toast from 'react-hot-toast';
import { ClientModel } from '../../core/models/ClientModel';
import api from '../client';
import { ENDPOINTS } from '../endpoints';

export class ClientService {
    static async getClients() {
        const res = await api.get(ENDPOINTS.client);
        return res.data;
    }

    static async getClientByName(name: string) {
        const res = await api.get(`${ENDPOINTS.client}/name/${name}`);
        return res.data;
    };

    static async getClientById(id: string) {
        const res = await api.get(`${ENDPOINTS.client}/id/${id}`);
        return res.data;
    };

    static async registerClient(client: ClientModel) {
        try {
            const res = await api.post(ENDPOINTS.client, { ...client });

            toast.success("Cliente cadastrado com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao cadastrar cliente:", error);

            toast.error(error?.response?.data?.message || "Erro ao cadastrar o cliente");

            throw error;
        }
    }

    static async updateClient(client: ClientModel) {
        try {
            const res = await api.put(ENDPOINTS.client, { ...client });

            toast.success("Cliente atualizado com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao atualizar cliente:", error);

            toast.error(error?.response?.data?.message || "Erro ao atualizar o cliente");

            throw error;
        }
    }

    static async deleteClient(id: string) {
        try {
            const res = await api.delete(`${ENDPOINTS.client}/${id}`);

            toast.success("Cliente excluido com sucesso!");

            return res.data;
        } catch (error: any) {
            console.error("Erro ao excluir cliente:", error);

            toast.error(error?.response?.data?.message || "Erro ao excluir o cliente");

            throw error;
        }
    }
}