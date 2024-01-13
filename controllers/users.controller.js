import {insertNewUser,getUserById,updateUserPassword,deleteUser,updateUser, getUsers, getOwnUser,validateUser, getUserByEmailOrUsername} from '../services/users.services.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import errorsHelpers from '../helpers/errors.helper.js';
import sendMail from '../helpers/sendMail.helper.js';


export const createNewUser = async (body, registrationCode, file) => {

    const response = await insertNewUser(body, registrationCode);

    const { username, email } = body;
    
    const emailBody = 
    `<h1>Welcome, ${username}!</h1>
    Thank you for becoming a part of iNeedApp. In order to activte your account, please follow the link provided below:

    <a href="http://localhost:8080/users/validate/${registrationCode}">Activate my iNeedApp account!</a>`

    await sendMail(email, `iNeedApp Account activation`, emailBody);


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
}

export const loginUser = async (email, password) => {
    const user = await getUserByEmailOrUsername(email)


    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) {
        errorsHelpers.notAuthorizedError("Invalid credentials",'INVALID_CREDENTIALS');
    }

    if(!user.is_active){
        errorsHelpers.userPendingActivation("User activation pending. Please verify your email inbox in order to activate your account.")
    }

    const tokenI = {
        id: user.id,
    }

    const token = jwt.sign(tokenI, process.env.SECRET, {expiresIn: process.env.EXPIRE})

    return token;

};

