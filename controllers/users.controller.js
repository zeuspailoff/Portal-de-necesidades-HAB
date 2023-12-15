import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { insertNewUser, getUserById, updateUserPassword, deleteUser, updateUser, getOwnUser, validateUser, getUsers, getUserByEmailOrUsername } from '../services/users.services.js';
import errorsHelpers from '../helpers/errors.helper.js';
import sendMail from '../helpers/sendMail.helper.js';

export const createNewUser = async (username, email, password, biography, birthdate, phone, name, lastname, registrationCode) => {

    const response = await insertNewUser(username, email, password, biography, birthdate, phone, name, lastname, registrationCode);


    const emailBody = `
    <h1>Bienvenido ${username}</h1>
    Gracias por registrarte en Portal de necesidades. Para activar tu cuenta, haz clic en el siguiente enlace:

    <a href="http://localhost:8080/users/validate/${registrationCode}">Activar tu cuenta de PORTAL DE NECESIDADES</a>
 `

    await sendMail(email, `Activa tu cuenta`, emailBody);

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

export const validateUserByRegistrationCode = async (registrationCode) => {
    const response = await validateUser(registrationCode);
    return response;

};

export const getAllUsers = async () => {
    const response = await getUsers();
    return response;
};
export const loginUser = async (email, password) => {
    const user = await getUserByEmailOrUsername(email)


    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        errorsHelpers.notAuthorizedError("Credenciales inválidas", 'INVALID_CREDENTIALS');
    }

    if (!user.is_active) {
        errorsHelpers.userPendingActivation("Usuario pendiente de activar. Verifique su correo electrónico para validar su cuenta.")
    }

    const tokenI = {
        id: user.id,
    }

    const token = jwt.sign(tokenI, process.env.SECRET, { expiresIn: process.env.EXPIRE })

    return token;

};