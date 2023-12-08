import bcrypt from 'bcrypt'
import randomstring from 'randomstring'
import getPool from '../db/getPool.js'
import errors from '../helpers/errors.helper.js'

const newUserRegister = async (username, password, email, bio, birthdate, phone, name, lastname, profile_picture, registrationCode) => {
  const pool = await getPool()

  let [users] = await pool.query(
    'SELECT * FROM users WHERE username = ? OR email = ?',
    [username, email]
  )

  if (users.length > 0) {
    errors.userAlreadyExists()
  }

  try {
    const sqlQuery =
      'INSERT INTO users (username, password, email, bio, birthdate, phone, name, lastname, profile_picture, registrationCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

    const hashPassword = await bcrypt.hash(password, 5)

    const values = [username, hashPassword, email, registrationCode]
    const [response] = await pool.query(sqlQuery, values)
    return response
  } catch (err) {
    errors.conflictError(
      'Error al intentar registrar el usuario',
      'USER_REGISTER_ERROR'
    )
  }
}

const validateUser = async (registrationCode) => {
  const pool = await getPool()
  const [users] = await pool.query(
    'SELECT * FROM users WHERE registrationCode = ?',
    [registrationCode]
  )

  if (users.length !== 1) {
    errors.entityNotFound('Usuario')
  }

  try {
    const sqlQuery =
      'UPDATE users SET active = TRUE, registrationCode = null WHERE id = ? '
    const values = [users[0].id]

    const [response] = await pool.query(sqlQuery, values)

    return response
  } catch (err) {
    errors.conflictError(
      'Error al intentar activar el usuario',
      'USER_ACTIVATED_ERROR'
    )
  }
}

const getUserByEmailOrUsername = async (email) => {
  const pool = await getPool()

  const [users] = await pool.query(
    'SELECT * FROM users WHERE email = ? OR username = ? ',
    [email, email]
  )

  if (users.length == 0) {
    errors.entityNotFound('Usuario')
  }

  return users[0]
}

const getUsers = async () => {
  const pool = await getPool()

  const [users] = await pool.query('SELECT * FROM users')

  return users
}

const getUserById = async (userId) => {
  const pool = await getPool()

  const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [userId])

  if (users.length < 1) {
    errors.entityNotFound('Usuario')
  }

  return users[0]
}

const updatePhoto = async (userId, Photo) => {
  const pool = await getPool()

  await pool.query('UPDATE users SET Photo = ? WHERE id = ? ', [
    Photo,
    userId
  ])
}

const updatePasswordRecover = async (user) => {
  const recoverPassCode = randomstring.generate(10)

  const pool = await getPool()

  const [response] = await pool.query(
    'UPDATE users SET recoverPassCode = ? WHERE id = ? ',
    [recoverPassCode, user.id]
  )

  if (response.affectedRows !== 1) {
    errors.conflictError(
      'Error al generar recoverPassCode.',
      'RECOVER_PASS_ERROR'
    )
  }

  return recoverPassCode
}

const updateUserPassword = async (user, newPass) => {
  const pool = await getPool()
  const newPassEncrypted = await bcrypt.hash(newPass, 5);
  const [response] = await pool.query(
    'UPDATE users SET password = ?, recoverPassCode = NULL WHERE id = ?',
    [newPassEncrypted, user.id]
  )

  if (response.affectedRows !== 1) {
    errors.conflictError(
      'Error al actualizar la contraseña.',
      'PASSWORD_UPDATE_ERROR'
    )
  }
}

export default {
  newUserRegister,
  validateUser,
  getUserByEmailOrUsername,
  getUsers,
  getUserById,
  updatePhoto,
  updatePasswordRecover,
  updateUserPassword
}
