import filesServices from '../services/files.services.js'
import demandsServices from '../services/demands.services.js'

const entity_type = 'demands'

export const insertNewDemand = async (user_id, title, description, files) => {
    //guardo la demanda y me devuelve el registro
    const response = await demandsServices.insertNewDemand(
        user_id,
        title,
        description
    )
    const filesSrc = { insertId: response.insertId, files: [] }

    if (files) {
        const arrayFiles = await Promise.all(files.map(async file => {
            const entity_id = response.insertId;
            const fileSrc = await insertFile(file);
            const fileInDb = await demandsServices.insertFile(entity_id, entity_type, fileSrc);
            return { 'id': fileInDb.insertId, 'path': fileSrc };
        }));

        filesSrc.files = arrayFiles;
        console.log('ESTO ES EL CONSOLE LOG DEL ARRAY PUSHEADO', arrayFiles);
    }

    console.log(filesSrc);

    return filesSrc;
};

export const getAllDemands = async (userId) => {
    const response = await demandsServices.getAllDemands(userId);
    return response;
}

export const getDemandById = async (demandId) => {
    const response = await demandsServices.getDemandById(demandId);
    return response;
}

export const getAllDemandsByUserId = async (userId) => {
    const response = await demandsServices.getAllDemandsByUserId(userId);
    return response;
}

export const deleteDemand = async (demandId) => {
    const response = await demandsServices.deleteDemand(demandId);
    return response;
}

export const updateDemandStatus = async (demandId, status) => {
    const response = await demandsServices.updateDemandStatus(demandId, status);
    return response;
}

export const editDemand = async (demandId, title, description, files) => {
    const response = await demandsServices.editDemand(demandId, title, description);

    if (files) {
        const filesSrc = [];
        const entity_id = demandId;

        files.forEach(async file => {
            const fileSrc = await insertFile(file)
            const fileInDb = await demandsServices.insertFile(entity_id, entity_type, fileSrc)

            filesSrc.push({ 'id': fileInDb.insertId, 'src': fileSrc })
        });

        response.files = filesSrc;
    }

    return response;
}

export const insertFile = async (file) => {
    const src = await filesServices.saveFile(file);

    return src;
}

export const deleteFile = async (entity_id, entity_type) => {
    const response = await demandsServices.deleteFile(entity_id, entity_type);
    return response;
}

