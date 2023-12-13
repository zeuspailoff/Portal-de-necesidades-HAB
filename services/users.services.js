import bcrypt from 'bcrypt'
import getPool from '../db/getPool.js';
import errors from '../helpers/errors.helpers.js';

export const insertNewUser = async (
  username,
  email,
  password,
  biography,
  birthdate,
  phone,
  name,
  lastname
) => {
  const pool = await getPool();

  let [users] = await pool.query(
    'SELECT * FROM users WHERE username = ? OR email = ?',
    [username, email]
  )

  if (users.length > 0) {
    errors.userAlreadyExists()
  }

  try {
    const sqlQuery = 'INSERT INTO users ( username, email, password, biography, birthdate, phone, name, lastname ) VALUES (?,?,?,?,?,?,?,? )';
    

    const passwordHashed = await bcrypt.hash(password, 5)

    const values = [
      username,
      email,
      passwordHashed,
      biography,
      birthdate,
      phone,
      name,
      lastname
    ] 

      const [response] = await pool.query(sqlQuery,values);
  
    return response;

  } catch (error) {
    errors.conflictError(
      'Error al intentar registrar el usuario',
      'USER_REGISTER_ERROR'
    );
  }
}

export const validateUser = async (registrationCode) => {//https://glovo.com/registrationUser?validateCode=320948239jdfsdjkfskdjf893jdfnbdi
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

export const getUserByEmailOrUsername = async (email) => {
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

//FORM LOGIN
//ruta.x.post(EMAIL/USERNAME, PASSWORD)
//CONST USER = getUserByEmailOrUsername(EMAIL/USERNAME)//si esto es ok, me devuelve el usuario
//bcrypt.compare(user.password, USER.password) //si esto es ok loggeo al usuario.// user.password === PASSWORD//si esto es ok loggeo al usuario.
//si estoy en front guardo en el navegador el registrationCode
//IF SESIONDELNAVEGADOR.REGISTRATIONCODE != null
//LOGGEO AL USUARIO



export const getUsers = async () => {
  const pool = await getPool()

  const [users] = await pool.query('SELECT * FROM users')

  return users
}

export const updatePasswordRecover = async (user) => {
  const recoverPassCode = randomstring.generate(10)//J5S3A6J9S4

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


export const getUserById = async (id) => {
  const pool = await getPool();
  
  const [response] = await pool.query(
    'SELECT * FROM users WHERE id =? and deleted_at IS NULL',
    [id]
  );
  
  if (response.length === 0) {
    errors.notFoundError('User not found', 'USER_NOT_FOUND');
  }
}

export const updateUserPassword = async (userId, password) => {
  const pool = await getPool();
  
  const sqlQuery = 'UPDATE users SET password =? WHERE id =?';
    
  const passwordHashed = await bcrypt.hash(password, 5)

  const values = [
    passwordHashed,
    userId
  ] 

  const [response] = await pool.query(sqlQuery,values);
  
  if (response.affectedRows!== 1) {
    errors.conflictError('Error al actualizar el usuario', 'PASSWORD_UPDATE_ERROR');
  }

  return response;
}

export const deleteUser = async (userId) => {
  const pool = await getPool();
  
  const [response] = await pool.query(
    'UPDATE users SET deleted_at = NOW() WHERE id =?',
    [userId]
  );
  
  if (response.affectedRows!== 1) {
    errors.conflictError('Error al actualizar el usuario', 'DELETE_USER_ERROR');
  }
  
  return response;
  
}


export const updateUser = async (id, username, email, password, biography, birthdate, phone, name, lastname) => {
  const pool = await getPool();
  
  const [response] = await pool.query(
    'UPDATE users SET username =?, email =?, password =?, biography =?, birthdate =?, phone =?, name =?, lastname =? WHERE id =?',
    [username,
      email,
      password,
      biography,
      birthdate,
      phone,
      name,
      lastname,
      id]
  );
  
  if (response.affectedRows!== 1) {
    errors.conflictError('Error al actualizar el usuario', 'USER_UPDATE_ERROR');
  }
  
  return response;
  
}

export const getOwnUser = async (userId) => {
  const pool = await getPool();
  //TODO:AVERIGUAR SI LO MEJOR ES FILTRAR LOS DATOS DEL USER EN SERVICIOS O EN CONTROLLERS.
  const [response] = await pool.query(
    'SELECT * FROM users WHERE id =? and deleted_at IS NULL',
    [userId]
  );
  
  if (response.length === 0) {
    errors.notFoundError('User not found', 'USER_NOT_FOUND');
  }
  
  return response;
  
}
