import axiosClient from "./axiosClient";

export interface LoginResponse {
    ok: boolean,
    data: {
        token: string,
        user: {
            usuario_id: number,
            nombre: string,
            email: string,
            fecha_nacimiento: string,
            created_at: string,
            uptated_at: string
        };
    }
}

export const loginRequest = async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await axiosClient.post("/auth/login", { email, password });
    return data;
};
