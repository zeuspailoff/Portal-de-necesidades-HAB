import { insertNewUser, getUserById, updateUserPassword, deleteUser, updateUser, getUsers, getOwnUser, validateUser, getUserByEmailOrUsername, passwordRecoverUpdate, setPasswordRecover, validateUserByRecoveryCode } from '../services/users.services.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import errorsHelpers from '../helpers/errors.helper.js';
import { mailToRecoverPassword, mailToRegistration } from '../helpers/mailer.helper.js';
import { storeFile, deleteFile, insertFileSrc } from '../services/files.services.js';
import insertManyFiles from '../helpers/insertFilesInEntity.helper.js';

const entity_type = 'users';

export const createNewUser = async (body, registrationCode, files) => {

    const response = await insertNewUser(body, registrationCode);
    const { username, email } = body;
    const filesSrc = { insertId: response.insertId, files: [] }


    await mailToRegistration(username, email, registrationCode, body.url)


    if (files) {

        const entity_id = response.insertId;
        filesSrc.files = await (insertManyFiles(entity_id, files, entity_type));
    }

    return filesSrc


}

export const recoverPassword = async (email,url) => {
    const user = await getUserByEmailOrUsername(email)
    const { username } = user

    const recoverPassCode = await passwordRecoverUpdate(user)

    await mailToRecoverPassword(username, email, recoverPassCode, url)
}

export const findOrFailUserById = async (id) => {
    const response = await getUserById(id);

    return response;
}

export const editPasswordById = async (id, password, recovery) => {
    const response = await updateUserPassword(id, password, recovery);
    return response;
}

export const deleteUserById = async (id) => {
    const response = await deleteUser(id);
    return response;
}

export const updateUserById = async (id, username, password, biography, birthdate, phone, name, lastname, files, user) => {

    const response = await updateUser(id, username, password, biography, birthdate, phone, name, lastname);

    const actualAvatarId = user?.avatar_id;
    const newAvatar = {}
    let deleteOldAvatar = null;
    if (files) {
        newAvatar.src = await storeFile(files[0], entity_type);
        if (newAvatar.src) {
            if (actualAvatarId != null) deleteOldAvatar = await deleteFile(actualAvatarId);
            await insertFileSrc(user.id, entity_type, newAvatar.src);
        }

        response.avatar = newAvatar.src;
    }
    return response
}

export const getOwnUserById = async (id) => {
    const response = await getOwnUser(id);
    return response;
}

export const validateUserByRegistrationCode = async (registrationCode) => {
    const response = await validateUser(registrationCode);
    return response;
};

export const validateUserRecoveryCode = async (recoverPassCode) => {
    const response = await validateUserByRecoveryCode(recoverPassCode);
    return response;
};

export const getAllUsers = async () => {
    const response = await getUsers();
    return response;
}

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

    return {
        user: {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            biography: user.biography,
            created_at: user.created_at,
            username: user.username,
            token: token
        },
    };

};

