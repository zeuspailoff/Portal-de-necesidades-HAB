import getPool from '../db/getPool.js';
import errors from '../helpers/errors.helpers.js';

const insertNewUser = async (
  username,
  email,
  password,
  biography,
  birthdate,
  phone,
  name,
  lastname,
  profile_picture
) => {
    const pool = await getPool();

    const [response] = await pool.query(
        'INSERT INTO users ( username, email, password, biography, birthdate, phone, name, lastname, profile_picture ) VALUES (?,?,?,?,?,?,?,?,?)',
        [username,
          email,
          password,
          biography,
          birthdate,
          phone,
          name,
          lastname,
          profile_picture]
    );

    if (response.affectedRows!== 1) {
        errors.conflictError('Error al insertar el usuario', 'DEMAND_INSERT_ERROR');
    }

    return response;
}
export default {
  insertNewUser,
}
