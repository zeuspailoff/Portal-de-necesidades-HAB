import getPool from '../db/getPool.js';
import path from 'path';
import fs from 'fs/promises';
import randomstring from 'randomstring';
import errors from '../helpers/errors.helper.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const saveFile = async (file, entity_type) => {

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

    const filePath = path.join(__dirname, '..', 'public/uploads', entity_type, fileName);
    const relativePath = path.join('public/uploads', entity_type, fileName);

    await fs.writeFile(filePath, file.buffer);

    return relativePath;
}

export const insertFile = async (entity_id, entity_type, src) => {
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

export const replaceUserAvatar = async (user_id, src) => {
    const pool = await getPool();

    const [previousAvatar] = await pool.query(
        `SELECT src FROM files WHERE user_id =?`,
        [user_id]
    )
    console.log("NADA ACA?", previousAvatar.length);
    if (previousAvatar.length != 1) {
        console.log("ADENTRO DEL IF");
        await insertFile(user_id, 'users', src)
    }
    console.log("DESPUES DEL IF");


    const [response] = await pool.query(
        `UPDATE files SET src =? WHERE user_id =?`,
        [src, user_id]
    );

    await fs.unlink(path.join(__dirname, previousAvatar[0].src));

    return response;
}

export const deleteFile = async (file_id, src) => {
    const pool = await getPool();

    const [previousFile] = await pool.query(
        'SELECT src FROM files WHERE id =?'
        [file_id]
    )

    if (previousFile.affectedRows == 0) {
        errors.conflictError('There are no files to delete', 'NO_EXISTING_FILES_ERROR');
    }

    const [response] = await pool.query(
        'DELETE FROM files WHERE id =?'
        [file_id]
    )
    if (response.affectedRows == 0) {
        errors.conflictError('Error trying to delete file', 'FILE_DELETE_ERROR');
    }

    await fs.unlink(path.join(__dirname, previousFile[0].src));

    return response;

}



export default {
    saveFile,
    insertFile,
    replaceUserAvatar,
    deleteFile
}

// "error": {
//     "message": "ENOENT: no such file or directory, unlink 'D:\\hack a boss\\Proyectos\\Proyecto2\\Portal-de-necesidades-HAB\\services\\public\\uploads\\users\\3YjsP4xHqh.png'",
//         "stack": "Error: ENOENT: no such file or directory, unlink 'D:\\hack a boss\\Proyectos\\Proyecto2\\Portal-de-necesidades-HAB\\services\\public\\uploads\\users\\3YjsP4xHqh.png'"
// }
// }



