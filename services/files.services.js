import path from 'path';
import fs from 'fs/promises';
import randomstring from 'randomstring';
import errors from '../helpers/errors.helpers.js'

const saveFile = async (file) =>{
    const fileName = randomstring.generate({
        length: 10,
        charset: 'alphanumeric'
    }) + path.extname(file.originalname);
    
    if(!['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.png', '.jpg', '.jpeg'].includes(path.extname(file.originalname).toLowerCase())){
        errors.notAuthorizedError("El archivo no es valido", 'FILE_NOT_VALID_ERROR')
    }

    //TODO: validar que el file no sea demasiado grande
    if(file.size > 5000000){
        errors.notAuthorizedError("El archivo es demasiado grande", 'FILE_TOO_BIG_ERROR')
    }

    const filePath = path.join(__dirname, '..', 'public', 'uploads', fileName);

    await fs.writeFile(filePath, file.buffer);

    return filePath;
}


export default {
    saveFile
}
