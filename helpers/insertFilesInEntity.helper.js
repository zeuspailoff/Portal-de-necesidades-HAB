import filesServices from '../services/files.services.js'

const insertManyFiles = async (entity_id, files, entity_type) => {
    const arrayFiles = await Promise.all(files.map(async file => {
        const fileSrc = await insertFileSrc(file, entity_type);
        const fileInDb = await filesServices.insertFileSrc(entity_id, entity_type, fileSrc);
        return { 'id': fileInDb.insertId, 'path': fileSrc };
    }));

    return arrayFiles;
}

export const insertFileSrc = async (file, entity_type) => {

    const src = await filesServices.storeFile(file, entity_type);

    return src;
}

export default insertManyFiles;