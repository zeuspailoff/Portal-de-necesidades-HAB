import { insertNewUser, 
        findOrFailUser, 
        editPassword, 
        deleteUser, 
        updateUser, 
        getOwnUser
    } from '../services/users.services.js';

export const createNewUser = async (username,
    email,
    password,
    biography,
    birthdate,
    phone,
    name,
    lastname
    ) => {
        const response = await insertNewUser(username,
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

export const findOrFailUser = async (userId) => {
    const response = await findOrFailUser(userId);
    return response;
}

export const editPassword = async (userId, password) => {
    const response = await editPassword(userId, password);
    return response;
}

export const deleteUser = async (userId) => {
    const response = await deleteUser(userId);
    return response;
}

export const updateUser = async (userId, username, email, password, biography, birthdate, phone, name, lastname) => {
    const response = await updateUser(userId, username, email, password, biography, birthdate, phone, name, lastname);
    return response;
}

export const getOwnUser = async (userId) => {
    const response = await getOwnUser(userId);
    return response;
}