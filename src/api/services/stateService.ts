import api from '../client';
import { ENDPOINTS } from '../endpoints';

export class StateService {
    static async getStates() {
        const res = await api.get(ENDPOINTS.state);
        return res.data;
    }

    static async getStateByName(name: string) {
        const res = await api.get(`${ENDPOINTS.state}/name/${name}`);
        return res.data;
    };

    static async getStateById(id: string) {
        const res = await api.get(`${ENDPOINTS.state}/id/${id}`);
        return res.data;
    };
}