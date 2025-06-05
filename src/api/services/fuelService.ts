import api from '../client';
import { ENDPOINTS } from '../endpoints';

export class FuelService {
    static async getFuels() {
        const res = await api.get(ENDPOINTS.fuel);
        return res.data;
    }

    static async getFuelByDescription(description: string) {
        const res = await api.get(`${ENDPOINTS.fuel}/description/${description}`);
        return res.data;
    };

    static async getFuelById(id: string) {
        const res = await api.get(`${ENDPOINTS.fuel}/id/${id}`);
        return res.data;
    };
}