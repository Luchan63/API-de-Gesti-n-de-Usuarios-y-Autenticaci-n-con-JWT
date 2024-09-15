import usersApi from "../apis/usersApi";

const BASE_URL_GET = "/users";
const BASE_URL_POST = "/create";
const BASE_URL_UPDATE = "/update";
const BASE_URL_DELETE = "/delete";

export const findAll = async () => {

    try {
        const response = await usersApi.get(BASE_URL_GET);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const save = async ({ username, email, password, admin }) => {
    try {
        const response = await usersApi.post(BASE_URL_POST, { username, password, email,admin });
        return response;
    } catch (error) {

        throw error;
    }
}

export const update = async ({ id, username, email, admin }) => {
    try {
        const response = await usersApi.put(`${BASE_URL_UPDATE}/${id}`, { username, email, admin });
        return response;
    } catch (error) {
        throw error;
    }
}

export const remuve = async ( id ) => {
    try {
        const reponse = await usersApi.delete(`${BASE_URL_DELETE}/${id}`);
        return reponse;
    } catch (error) {
        console.log(error);
        throw error;
    }
}