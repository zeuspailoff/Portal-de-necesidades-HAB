import {
    insertNewUser,
    getUserById,
    updateUserPassword,
    deleteUser,
    updateUser,
    getOwnUser,
    validateUser
} from '../services/users.services.js';

export const createNewUser = async (
    username,
    email,
    password,
    biography,
    birthdate,
    phone,
    name,
    lastname
) => {
    const response = await insertNewUser(
        username,
        email,
        password,
        biography,
        birthdate,
        phone,
        name,
        lastname
    );

    return response;
}

export const findOrFailUserById = async (id) => {
    const response = await getUserById(id);
    return response;
}

export const editPasswordById = async (id, password) => {
    const response = await updateUserPassword(id, password);
    return response;
}

export const deleteUserById = async (id) => {
    const response = await deleteUser(id);
    return response;
}

export const updateUserById = async (id, username, email, password, biography, birthdate, phone, name, lastname) => {
    const response = await updateUser(id, username, email, password, biography, birthdate, phone, name, lastname);
    return response;
}

export const getOwnUserById = async (id) => {
    const response = await getOwnUser(id);
    return response;
}

export const validateUserById = async (registrationCode) => {
    const response = await validateUser(registrationCode);
    return response;

};