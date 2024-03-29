import {
    insertNewDemand,
    selectDemandById,
    updateDemandStatus,
    editDemand,
    deleteDemand,
    selectAllDemands,
    deleteFile,
    selectAllDemandsByUserId,
    demandExists,
    isClosed,
    selectAllCategories
} from '../services/demands.services.js'
import insertManyFiles from '../helpers/insertFilesInEntity.helper.js'

const entity_type = 'demands'

export const createDemand = async (user_id, title, description, category_id, files = null) => {
    const response = await insertNewDemand(
        user_id,
        title,
        description,
        category_id
    )

    const filesSrc = { insertId: response.insertId, documents: [] }

    if (files) {
        const entity_id = response.insertId;
        filesSrc.documents = await (insertManyFiles(entity_id, files, entity_type));
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

export const updateDemandStatusById = async (demandId) => {
    const response = await updateDemandStatus(demandId);
    return response;
}

export const editDemandById = async (demandId, title, description, category_id, files = null) => {
    const response = await editDemand(demandId, title, description, category_id);
    const filesSrc = { insertId: response.insertId, files: [] }
    if (files) {
        filesSrc.files = await (insertManyFiles(demandId, files, entity_type));
    }
    response.files = filesSrc;
    return response
}

export const deleteFileById = async (entity_id, entity_type) => {
    const response = await deleteFile(entity_id, entity_type);
    return response;
}

export const demandAlreadyExists = async (demandId) => {
    const response = await demandExists(demandId);
    return response;
}
export const demandClosed = async (proposal_id) => {
    const response = await isClosed(proposal_id);
    return response;
};

export const getAllCategories = async () => {
    const response = await selectAllCategories();
    return response;
}
