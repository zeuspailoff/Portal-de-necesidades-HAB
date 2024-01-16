import getPool from '../db/getPool.js';
import path from 'path';
import fs from 'fs/promises';
import randomstring from 'randomstring';
import errors from '../helpers/errors.helper.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();
const UPLOADS_DIR  = process.env.UPLOADS_DIR



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const validateAvatarExtension = (fileExtension) => {
    const avatarAllowedExtensions = ['.png', '.jpg', '.jpeg'];

    if (!avatarAllowedExtensions.includes(fileExtension.toLowerCase())) {
        errors.notAuthorizedError("El archivo no es valido", 'FILE_NOT_VALID_ERROR')
    }
}
const validateFilesExtension = (fileExtension) => {
    const filesAllowedExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.png', '.jpg', '.jpeg'];

    if (!filesAllowedExtensions.includes(fileExtension.toLowerCase())) {
        errors.notAuthorizedError("El archivo no es valido", 'FILE_NOT_VALID_ERROR')
    }
}

export const storeFile = async (file, entity_type) => {

    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (entity_type == 'users') {
        validateAvatarExtension(fileExtension)
    } else {
        validateFilesExtension(fileExtension)
    }

    if (file.size > 5000000) {
        errors.notAuthorizedError("El archivo es demasiado grande", 'FILE_TOO_BIG_ERROR')
    }

    const fileName = randomstring.generate({
        length: 10,
        charset: 'alphanumeric'
    }) + fileExtension;

    const filePath = path.join(__dirname, '..',UPLOADS_DIR ,'uploads', entity_type, fileName);
    const relativePath = path.join('uploads', entity_type, fileName);

    await fs.writeFile(filePath, file.buffer);

    return relativePath;
}

export const insertFileSrc = async (entity_id, entity_type, src) => {
    const column = entity_type.slice(0, -1) + '_id';
    const pool = await getPool();

    const [response] = await pool.query(
        `INSERT INTO files (${column}, src) VALUES (?,?)`,
        [entity_id, src]
    );

    if (response.affectedRows !== 1) {
        errors.conflictError('Error al insertar el archivo', 'FILE_INSERT_ERROR');
    }

    return response;
}

export const deleteFile = async (file_id) => {
    const pool = await getPool();

    const [previousFile] = await pool.query(
        `SELECT src FROM files WHERE id = ?`,
        [file_id]
    )

    if (previousFile.affectedRows == 0) {
        errors.conflictError('There are no files to delete', 'NO_EXISTING_FILES_ERROR');
    }

    const [response] = await pool.query(
        `DELETE FROM files WHERE id =?`,
        [file_id]
    )
    if (response.affectedRows == 0) {
        errors.conflictError('Error trying to delete file', 'FILE_DELETE_ERROR');
    }

    try {
        await fs.unlink(path.join(__dirname,"..", previousFile[0].src));
    } catch (error) {
        console.error(error.getMessage());
    }

    return response;

}

export default {
    storeFile,
    insertFileSrc,
    deleteFile
}





