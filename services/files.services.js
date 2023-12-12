import path from 'path';
import fs from 'fs/promises';
import randomstring from 'randomstring';
import errors from '../helpers/errors.helpers.js'

const saveFile = async (file) =>{

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

    const filePath = path.join(__dirname, '..', 'public', 'uploads', fileName);

    await fs.writeFile(filePath, file.buffer);

    return filePath;
}


export default {
    saveFile
}
