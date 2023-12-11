//import bcrypt from 'bcrypt';
import randomstring from "randomstring";
import getPool from '../db/getPool.js'
import errors from '../helpers/errors.helpers.js'

const registerNewUser = async (username, email, password, birthdate, phone, name, lastname, registrationCode) => {
  const pool = await getPool()

  let [users] = await pool.query(
    'SELECT * FROM users WHERE username = ? OR email = ?',
    [username, email]
  )

  if (users.length > 0){
    errors.userAlreadyExists()
  }
  
  try {

    const sqlQuery = 'INSERT INTO users (username, email, password, birthdate, phone, name, lastname, registrationCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'

    //Falta el hash de password
    const [response] = await pool.query(sqlQuery, values)
    return response
  } catch (error) {
      errors.conflictError(
        'Error al registrar usuario', 'USER_REGISTER_ERROR'
      )
  }
}

const deleteUser = async (id) => {

  const pool = await getPool();

  const [response] = await pool.query(
      'DELETE FROM users WHERE id =?',
      [id]
  );
  if (response.affectedRows !== 1) {
      console.log('No se ha podido eliminar usuario ')
  }
  return response;
}

const validateUser = async(registrationCode) => {
  const pool = await getPool()
  const [users] = await pool.query(
    'SELECT * FROM users WHERE registrationCode = ?'
    [registrationCode]
  )

  if (users.length !== 1) {
    errors.entityNotFound('Usuario')
  }

  try {
    const sqlQuery = 'UPDATE users SET active = TRUE, registrationCode = null WHERE id = ?'

    const values = [users[0].id]

    const [response] = await pool.query(sqlQuery, values)
    return response

  } catch (error) {
    errors.conflictError(
      'Error al validar el usuario',
      'USER_ACTIVATED_ERROR'
    )
  }
}

const getUserByEmailOrUsername = async (email) => {
  
  const pool = await getPool()

  const [users] = await pool.query(
    'SELECT * FROM users WHERE email = ? OR username = ? '
    [email, email]
  )

  if (users.length == 0){
    errors.entityNotFound('Usuario')
  }
  return users [0]
}

const getUsers = async () => {
  
  const pool = await getPool()

  const [users] = await pool.query('SELECT * FROM users')

  return users
}

const getUserById = async (userId) => {
   
  const pool = getPool()

  const [users] = await pool.query ('SELECT * FROM users WHERE id = ?', [userId])

  if (users.length < 1) {
    errors.entityNotFound('Usuario')
  }
  return users [0]
}

//Faltan las funciones de Avatar, updatePasswordRecovery, updatePassword y exportarlas


export default {
  registerNewUser,
  deleteUser,
  validateUser,
  getUserByEmailOrUsername,
  getUsers,
  getUserById
}