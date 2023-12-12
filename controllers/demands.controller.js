import {
    insertNewDemand,
    selectDemandById,
    updateDemandStatus,
    editDemand,
    deleteDemand,
    insertFile,
    selectAllDemands,
    deleteFile,
    selectAllDemandsByUserId
} from '../services/demands.services.js'
import insertManyFiles from '../helpers/insertFilesInEntity.helpers.js'

const entity_type = 'demands'

export const insertNewDemand = async (user_id, title, description, files) => {
    const response = await demandsServices.insertNewDemand(
        user_id,
        title,
        description
    )
    
    const filesSrc = { insertId: response.insertId, files:[] }

    if(files){  
        const entity_id = response.insertId;
        filesSrc.files = await (insertManyFiles(entity_id, files, entity_type, insertFile));
    }

    return filesSrc
}

export const getAllDemands = async (userId) => {
    const response = await selectAllDemands(userId);
    return response;
}

export const getDemandById = async (demandId) => {
    const response = await selectDemandById(demandId);
    return response;
}

export const getAllDemandsByUserId = async (userId) => {
    const response = await selectAllDemandsByUserId(userId);
    return response;
}

export const deleteDemandById = async (demandId) => {
    const response = await deleteDemand(demandId);
    return response;
}

export const updateDemandStatusById = async (demandId, status) => {
    const response = await updateDemandStatus(demandId, status);
    return response;
}

export const editDemandById = async (demandId, title, description, files) => {
    const response = await editDemand(demandId, title, description);

    const filesSrc = { insertId: response.insertId, files:[] }

    if(files){  
        const entity_id = response.insertId;
        filesSrc.files = await (insertManyFiles(entity_id, files, entity_type, insertFile));
    }

    return filesSrc
}

export const deleteFileById = async (entity_id, entity_type) => {
    const response = await deleteFile(entity_id, entity_type);
    return response;
}


