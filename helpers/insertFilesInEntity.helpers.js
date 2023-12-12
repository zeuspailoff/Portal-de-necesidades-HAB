import filesServices from '../services/files.services.js'

const insertManyFiles = async (entity_id, files, entity_type, entity_service_function) => {
    
    const arrayFiles = await Promise.all(files.map(async file => {
        const fileSrc = await insertFile(file);
        const fileInDb = await entity_service_function(entity_id, entity_type, fileSrc);
        return { 'id': fileInDb.insertId, 'path': fileSrc };
    }));

    return arrayFiles;
}

export const insertFile = async (file) => {

    const src = await filesServices.saveFile(file);

    return src;
}

export default insertManyFiles;