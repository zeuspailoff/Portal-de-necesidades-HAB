import getPool from '../db/getPool.js';
import path from 'path';
import fs from 'fs/promises';
import randomstring from 'randomstring';
import errors from '../helpers/errors.helper.js'


const saveFile = async (file, entity_type) => {

    setUpFolders();

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

    const filePath = path.join('uploads', entity_type, fileName);

    await fs.writeFile(filePath, file.buffer);

    return filePath;
}

export const insertFile = async (entity_id, entity_type, src) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'INSERT INTO files (entity_type, src, entity_id) VALUES (?,?,?)',
        [entity_type, src, entity_id]
    );

    if (response.affectedRows !== 1) {
        errors.conflictError('Error al insertar el archivo', 'FILE_INSERT_ERROR');
    }

    return response;
}

const replaceFile = async (entity_id, src, entity_type) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'UPDATE files SET src =? WHERE entity_id =? AND entity_type =?',
        [src, entity_id, entity_type]
    );

}

export default {
    saveFile,
    insertFile
}

