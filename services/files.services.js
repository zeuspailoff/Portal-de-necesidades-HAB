import getPool from '../db/getPool.js';
import path from 'path';
import fs from 'fs/promises';
import randomstring from 'randomstring';
import errors from '../helpers/errors.helper.js'


const saveFile = async (file, entity_type) => {

    const fileExtension = path.extname(file.originalname).toLowerCase();

    const validAllFiles = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.png', '.jpg', '.jpeg'];
    const validPhotos = ['.png', '.jpg', '.jpeg'];

    if (entity_type == 'users') {
        if (!validPhotos.includes(fileExtension.toLowerCase())) {
            errors.notAuthorizedError("El archivo no es valido", 'FILE_NOT_VALID_ERROR')
        }
    } else {
        if (!validAllFiles.includes(fileExtension.toLowerCase())) {
            errors.notAuthorizedError("El archivo no es valido", 'FILE_NOT_VALID_ERROR')
        }
    }

    if (file.size > 5000000) {
        errors.notAuthorizedError("El archivo es demasiado grande", 'FILE_TOO_BIG_ERROR')
    }

    const fileName = randomstring.generate({
        length: 10,
        charset: 'alphanumeric'
    }) + fileExtension;

    const filePath = path.join(__dirname, '..', 'public', 'uploads', entity_type, fileName);
    const relativePath = path.join('public', 'uploads', entity_type, fileName);

    await fs.writeFile(filePath, file.buffer);

    return relativePath;
}

export const insertFile = async (entity_id, entity_type, src) => {
    const column = entity_type.slice(0, -1) + '_id';
    const pool = await getPool();
    const [response] = await pool.query(
        `INSERT INTO files (${column}, src) VALUES (?,?,?)`,
        [entity_id, src]
    );

    if (response.affectedRows !== 1) {
        errors.conflictError('Error al insertar el archivo', 'FILE_INSERT_ERROR');
    }

    return response;
}

export const replaceUserAvatar = async (user_id, src) => {
    const pool = await getPool();

    const [previousAvatar] = await pool.query(
        `SELECT src FROM files WHERE user_id =?`,
        [user_id]
    )
    if (previousAvatar.length !== 1) {
        errors.conflictError('Error al editar el archivo', 'FILE_EDIT_ERROR');
    }
    
    const [response] = await pool.query(
        `UPDATE files SET src =? WHERE user_id =?`,
        [src, user_id]
    );

    if (response.affectedRows!== 1) {
        errors.conflictError('Error al editar el archivo', 'FILE_EDIT_ERROR');
    }

    await fs.unlink(path.join(__dirname, previousAvatar[0].src));

    return response;
}



export default {
    saveFile,
    insertFile,
    replaceUserAvatar
}

