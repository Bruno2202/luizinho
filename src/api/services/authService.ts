import toast from "react-hot-toast";
import { UserModel } from "../../core/models/UserModel";
import api from "../client";
import { ENDPOINTS } from "../endpoints";

export class AuthService {
    static async login(user: UserModel) {
        try {
            const res = await api.post(`${ENDPOINTS.auth}/login`, { ...user });

            return res.data;
        } catch (error: any) {
            console.error("Erro ao relizar login:", error);

            toast.error(error?.response?.data?.message || "Erro ao relizar login");

            throw error;
        }
    }
}