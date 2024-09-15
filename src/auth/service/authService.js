import axios from "axios";

const BASE_URL_LOGIN = `${import.meta.env.VITE_API_BASE_URL}/login`;
export const LoginUser = async ({ username, password }) => {
    try {
        return await axios.post(BASE_URL_LOGIN, { username, password });
    } catch (error) {
        throw error;
    }
}
