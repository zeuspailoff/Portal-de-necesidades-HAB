import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
/* import userServices from '../services/users.services.js'
import errors from '../helpers/errors.helper.js'
import filesServices from '../services/files.services.js'
import sendMail from '../helpers/email.helper.js' */

export const editUserPassword = async (email, recoverPassCode, newPass) => {
  const user = await userServices.getUserByEmailOrUsername(email)

  if (!user.recoverPassCode) {
    errors.conflictError(
      'No se ha solicitado el cambio de contraseña para este usuario.',
      'INVALID_RECOVER_PASS_ERROR'
    )
  }

  if (user.recoverPassCode !== recoverPassCode) {
    errors.conflictError(
      'Código de recuperación incorrecto.',
      'PASSWORD_RECOVER_CODE_ERROR'
    )
  }

  await userServices.updateUserPassword(user, newPass)
}

export const passwordRecover = async (email) => {
  const user = await userServices.getUserByEmailOrUsername(email)

  const recoverPassCode = await userServices.updatePasswordRecover(user)

  const emailBody = `
        Se ha solicitado una recuperación de contraseña para este email en I need up. 
                    
        Utiliza este código para generar una nueva contraseña: ${recoverPassCode}

        Si no has sido tú, por favor ignora este email.
     `
  await sendMail(email, 'Recuperación de contraseña', emailBody)
}

export const newUserRegister = async (body, registrationCode) => {
  const { username, password, email } = body
  const response = await userServices.newUserRegister(
    username,
    password,
    email,
    registrationCode
  )

  if (response.affectedRows !== 1) {
    errors.conflictError(
      'No se ha podido registrar el nuevo usuario.',
      'USER_REGISTER_ERROR'
    )
  }

  const emailBody = `
        <h1>¡Hola! ${username}</h1>
        Bienvenido a I need up. Para activar tu cuenta, haz clic en el siguiente enlace:

        <a href="http://localhost:8080/users/validate/${registrationCode}">Activar mi cuenta</a>
     `

  await sendMail(email, 'Activa tu usuario', emailBody)
}

export const validateUser = async (registrationCode) => {
  const response = await userServices.validateUser(registrationCode)

  if (response.affectedRows !== 1) {
    errors.conflictError(
      'Error al validar el correo electrónico.',
      'USER_VALIDATED_ERROR'
    )
  }
}

export const loginUser = async (email, password) => {
  const user = await userServices.getUserByEmailOrUsername(email)

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    errors.notAuthorizedError('Contraseña no válida', 'INVALID_CREDENTIALS')
  }

  if (!user.active) {
    errors.userPendingActivation(
      'Usuario pendiente de activar. Verifique su correo electrónico para validar su cuenta.'
    )
  }

  const tokenInfo = {
    id: user.id,
    role: user.role
  }

  const token = jwt.sign(tokenInfo, process.env.SECRET, {
    expiresIn: process.env.EXPIRE
  })

  return token
}

export const getUsers = async () => {
  const users = await userServices.getUsers()
  return users
}

export const getUserById = async (userId) => {
  const user = await userServices.getUserById(userId)
  return user
}

export const editUserphoto = async (photo, user) => {
  if (user.photo) {

    await filesServices.deletePhoto(user.photo)
  }

  const newphotoName = await filesServices.savePhoto(photo, 100)

  await userServices.updatephoto(user.id, newphotoName)
}
