import getPool from '../db/getPool.js';
import path from 'path';
import fs from 'fs/promises';
import randomstring from 'randomstring';
import errors from '../helpers/errors.helpers.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const saveFile = async (file, entity_type) =>{

    setUpFolders();

    const fileExtension = path.extname(file.originalname).toLowerCase();
        
    if(!['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.png', '.jpg', '.jpeg'].includes(fileExtension.toLowerCase())){
        errors.notAuthorizedError("El archivo no es valido", 'FILE_NOT_VALID_ERROR')
    }

    if(file.size > 5000000){
        errors.notAuthorizedError("El archivo es demasiado grande", 'FILE_TOO_BIG_ERROR')
    }
    
    const fileName = randomstring.generate({
        length: 10,
        charset: 'alphanumeric'
    }) + fileExtension;

    const filePath = path.join(__dirname, '..', 'public', 'uploads',entity_type, fileName);

    await fs.writeFile(filePath, file.buffer);

    return filePath;
}

export const insertFile = async (entity_id, entity_type, src) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'INSERT INTO files (entity_type, src, entity_id) VALUES (?,?,?)',
        [entity_type, src, entity_id]
    );

    if (response.affectedRows!== 1) {
        errors.conflictError('Error al insertar el archivo', 'FILE_INSERT_ERROR');
    }

    return response;
}

const setUpFolders = ()=> {
    const publicFolderPath = path.join(__dirname, 'public');
    const uploadsFolderPath = path.join(publicFolderPath, 'uploads');
    const demandsFolderPath = path.join(uploadsFolderPath, 'demands');
    const proposalsFolderPath = path.join(uploadsFolderPath, 'proposals');

    const verifyAndCreate = (carpeta) => {
        try {
            if (!fs.existsSync(carpeta)) {
                fs.mkdirSync(carpeta, { recursive: true });
            } 
        } catch (error) {
            
        }
    }

    verifyAndCreate(publicFolderPath);
    verifyAndCreate(uploadsFolderPath);
    verifyAndCreate(demandsFolderPath);
    verifyAndCreate(proposalsFolderPath);
}


export default {
    saveFile,
    insertFile
}
