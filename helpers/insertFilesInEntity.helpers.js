import filesServices from '../services/files.services.js'

const insertManyFiles = async (entity_id, files, entity_type) => {
    
    const arrayFiles = await Promise.all(files.map(async file => {
        const fileSrc = await insertFile(file, entity_type);
        const fileInDb = await filesServices.insertFile(entity_id, entity_type, fileSrc);
        return { 'id': fileInDb.insertId, 'path': fileSrc };
    }));

    return arrayFiles;
}

export const insertFile = async (file, entity_type) => {

    const src = await filesServices.saveFile(file, entity_type);

    return src;
}

export default insertManyFiles;