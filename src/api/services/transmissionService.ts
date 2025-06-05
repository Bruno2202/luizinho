import api from '../client';
import { ENDPOINTS } from '../endpoints';

export class TransmissionService {
    static async getTransmissions() {
        const res = await api.get(ENDPOINTS.transmission);
        return res.data;
    }

    static async getTransmissionByDescription(name: string) {
        const res = await api.get(`${ENDPOINTS.transmission}/name/${name}`);
        return res.data;
    };

    static async getTransmissionById(id: number) {
        const res = await api.get(`${ENDPOINTS.transmission}/id/${id}`);
        return res.data;
    };
}