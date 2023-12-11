/* import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'*/
import userServices from '../services/users.services.js'
import errors from '../helpers/errors.helpers.js'
import filesServices from '../services/files.services.js'
//import sendMail from '../helpers/email.helper.js' 

export const editPassword = async (email, recoveryCode, newPassword) => {
    const user = await userServices.getUserByEmailOrUsername (email)

    if (!user.recoveryCode) {
        errors.conflictError(
            `El usuario ${user} no ha solicitado un cambio de contraseña`,
            'INVALID_RECOVER_PASS_ERROR'
        )
    }

    if (user.recoveryCode !== recoveryCode) {
        errors.conflictError(
            'Código de recuperación incorrecto, vuelva a intentarlo',
            'PASSWORD_RECOVER_CODE_ERROR'
        )
    }
    await userServices.updateUserPassword(user,newPassword)
}

export const passwordRecovery = async (email) => {
    const user = await userServices.getUserByEmailOrUsername(email)

    const recoveryCode = await userServices.updateUserPassword(user)

    const emailContent = `
     Se ha solicitado un código de recuperación de contraseña para I need up. Utiliza el siguiente código para crear una nueva contraseña: ${recoveryCode}. 
    
    Por favor, si no has sido tú, ignora este email.`

    await sendMail (email, 'Recuperación de contraseña', emailContent)
}

export const registerNewUser = async (body, registrationCode) => {
    const { username, password, email } = body
    const response = await userServices.registerNewUser (
        username,
        password,
        email,
        registrationCode
    )

    if (response.affectedRows !== 1) {
        errors.conflictError (
            'Error al registrar nuevo usuario',
            'USER_REGISTER_ERROR'
        )
    }

    const emailContent = `
        <h1>¡Bienvenido a I need up ${username}!</h1>
        Gracias por unirte a nosotros. 
        Para actuvar tu cuenta, por favor haz click en el siguiente enlace: 

        <a href="http://localhost:8080/users/validate/${registrationCode}">Activar mi cuenta</a>
    `

    await sendMail(email, 'Activa tu cuenta', emailContent)
}

export const validateUser = async (registrationCode) => {
    const response = await userServices.validateUser(registrationCode)

    if (response.affectedRows !==1) {
        errors.conflictError(
            'Error al validar el correo electrónico',
            'USER_VALIDATED_ERROR'
        )
    }
}

export const loginUser = async (email, password) => {
    const user = await userServices.getUserByEmailOrUsername(email)

    //const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        errors.notAuthorizedError('Credenciales no válidas', 'INVALID_CREDENTIALS')
    }

    if (!user.active) {
        errors.userPendingActivation(
            'Usuario pendiente de activar. Verifique su correo electrónico para validar la cuenta'
        )
    }

  /*  const tokenInfo = {
        id: user.id,
        role: user.role
    } */

    /* const token = jwt.sign(tokenInfo, process.env.SECRET, {
        expiresIn: process.env.EXPIRE
    })

    return token */
}

export const getUsers = async () => {
    const users = await userServices.getUsers()
    return users
}

export const getUserById = async (userId) => {
    const user = await userServices.getUserById(userId)
    return user
}

//FALTA editUserAvatar, newAvatarName y actualizar la bbdd