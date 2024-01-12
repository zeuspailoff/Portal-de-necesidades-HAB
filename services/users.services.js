import bcrypt from 'bcrypt'
import getPool from '../db/getPool.js';
import errors from '../helpers/errors.helper.js';
import randomstring from 'randomstring';


export const insertNewUser = async (body, registrationCode) => {

  const { username, email, password, biography, birthdate, phone, name, lastname } = body;


  const pool = await getPool();

  try {
    let [users] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ? and deleted_at IS NULL',
      [username, email]
    )


    if (users.length > 0) {
      console.error('Este usuario ya existe😥')
      errors.userAlreadyExists()
    }

    const sqlQuery = 'INSERT INTO users ( username, email, password, biography, birthdate, phone, name, lastname, registration_code) VALUES (?,?,?,?,?,?,?,?,?)';

    const passwordHashed = await bcrypt.hash(password, 5)

    const values = [username, email, passwordHashed, biography, birthdate, phone, name, lastname, registrationCode]

    const [response] = await pool.query(sqlQuery, values);

    return response;

  } catch (error) {
    errors.insertUserError();
  }
}

export const validateUser = async (registrationCode) => {//https://glovo.com/registrationUser?validateCode=320948239jdfsdjkfskdjf893jdfnbdi
  const pool = await getPool()

  const [users] = await pool.query(
    'SELECT * FROM users WHERE registration_code = ? AND deleted_at IS NULL',
    [registrationCode]
  )

  if (users.length !== 1) {
    errors.entityNotFound('Usuario')
  }

  if (users[0].is_active === true) {
    errors.conflictError(
      'User has already been activated',
      'USER_ACTIVATED_ERROR'
    )
  }

  try {
    const sqlQuery =
      'UPDATE users SET is_active = TRUE, registration_code = NULL WHERE id = ? '
    const values = [users[0].id]

    const [response] = await pool.query(sqlQuery, values)

    return users[0]
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
    'SELECT * FROM users WHERE email = ? OR username = ? and deleted_at IS NULL ',
    [email, email]
  )

  if (users.length == 0) {
    errors.entityNotFound('Usuario')
  }

  return users[0]
}


export const getUsers = async () => {
  const pool = await getPool()

  const [users] = await pool.query('SELECT * FROM users WHERE deleted_at IS NULL');

  return users
}

export const updatePasswordRecover = async (user) => {
  const recoverPassCode = randomstring.generate(10)//J5S3A6J9S4

  const pool = await getPool()

  const [response] = await pool.query(
    'UPDATE users SET password_recovered = ? WHERE id = ? ',
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
  return response[0];
}

export const updateUserPassword = async (id, password, recovery) => {
  const pool = await getPool();

  const sqlQuery = 'UPDATE users SET password =? WHERE id =?';

  const passwordHashed = await bcrypt.hash(password, 5)

  const values = [
    passwordHashed,
    id
  ]

  const [response] = await pool.query(sqlQuery, values);

  if (response.affectedRows !== 1) {
    errors.conflictError('Error al actualizar el usuario', 'PASSWORD_UPDATE_ERROR');
  }

  if (recovery) {
    await pool.query('UPDATE users SET password_recovered = NULL WHERE id =? ', [id]);
  }
  return response;

}

export const deleteUser = async (id) => {
  const pool = await getPool();

  const [response] = await pool.query(
    'UPDATE users SET deleted_at = NOW() WHERE id =?',
    [id]
  );

  if (response.affectedRows !== 1) {
    errors.conflictError('Error al actualizar el usuario', 'DELETE_USER_ERROR');
  }

  return response;

}


export const updateUser = async (id, username, email, password, biography, birthdate, phone, name, lastname) => {
  const pool = await getPool();

  const passwordHashed = await bcrypt.hash(password, 5)

  const [response] = await pool.query(
    'UPDATE users SET username=?, email=?, password=?, biography=?, birthdate=?, phone=?, name=?, lastname=? WHERE id=?',
    [username, email, passwordHashed, biography, birthdate, phone, name, lastname, id]
  );

  if (response.affectedRows !== 1) {
    errors.conflictError('Error al actualizar el usuario', 'USER_UPDATE_ERROR');
  }

  return response;

}

export const getOwnUser = async (id) => {
  const pool = await getPool();
  const [response] = await pool.query(
    'SELECT * FROM users WHERE id =? and deleted_at IS NULL',
    [id]
  );

  if (response.length === 0) {
    errors.notFoundError('User not found', 'USER_NOT_FOUND');
  }

  return response;

}


export const setPasswordRecover = async (user_id, recoverPassCode) => {
  const pool = await getPool();

  const [response] = await pool.query(
    'UPDATE users SET password_recovered =? WHERE id =? ',
    [recoverPassCode, user_id]
  )

  if (response.affectedRows !== 1) {
    errors.conflictError(
      'Error al generar el codigo de recuperacion de contrasena.',
      'RECOVER_PASS_ERROR'
    )
  }

  return response;

};

export const validateUserByRecoveryCode = async (recoverPassCode) => {
  const pool = await getPool()
  try {
    const [users] = await pool.query(
      'SELECT * FROM users WHERE password_recovered = ? ',
      [recoverPassCode]
    )

    if (users.length !== 1) {
      errors.conflictError(
        'Codigo de recuperacion invalido.',
        'RECOVER_PASS_ERROR'
      )
    }
    return users[0]

  } catch (err) {
    errors.conflictError(
      'Error al intentar recuperar contraseña.',
      'USER_ACTIVATED_ERROR'
    )
  }

}
export const passwordRecoverUpdate = async (user) => {
  const recoverPassCode = randomstring.generate(10)

  const pool = await getPool()

  const [response] = await pool.query(
    'UPDATE users SET password_recovered = ? WHERE id = ? ',
    [recoverPassCode, user.id]
  )

  if (response.affectedRows !== 1) {
    errors.conflictError(
      'Error al generar password_recovered.',
      'RECOVER_PASS_ERROR'
    )
  }

  return recoverPassCode
}



