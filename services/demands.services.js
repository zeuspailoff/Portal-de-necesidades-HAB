import getPool from '../db/getPool.js';
import errors from '../helpers/errors.helpers.js';

const insertNewDemand = async (user_id, title, description) => {
    const pool = await getPool();

    const [response] = await pool.query(
        'INSERT INTO demands (user_id, title, description) VALUES (?,?,?)',
        [user_id, title, description]
    );

    if (response.affectedRows!== 1) {
        errors.conflictError('Error al insertar la demanda', 'DEMAND_INSERT_ERROR');
    }

    return response;
}

const getDemandById = async (demandId) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'SELECT * FROM demands WHERE id = ? AND deleted_at IS NULL',
        [demandId]
    );

    if (response.length < 1) {
        errors.entityNotFound('Demand');
    }

    return response[0];
}

const getAllDemands = async (userId) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'SELECT * FROM demands WHERE user_id = ? AND deleted_at IS NULL',
        [userId]
    );
    if (response.length == 0) {
        errors.entityNotFound('Demand');
    }
    return response;
}

const getAllDemandsByUserId = async (userId) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'SELECT * FROM demands WHERE user_id = ? AND deleted_at IS NULL',
        [userId]
    );

    if (response.length == 0) {
        errors.entityNotFound('Demand');
    }

    return response;
}

const updateDemandStatus = async (demandId, status) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'UPDATE demands SET status = ? WHERE id = ?',
        [status, demandId]
    );

    if (response.affectedRows!== 1) {
        errors.conflictError('Error al actualizar la demanda', 'DEMAND_UPDATE_ERROR');
    }

    return response;
}

const editDemand = async (demandId, title, description) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'UPDATE demands SET title = ?, description = ? WHERE id = ?',
        [title, description, demandId]
    );

    if (response.affectedRows!== 1) {
        errors.conflictError('Error al actualizar la demanda', 'DEMAND_UPDATE_ERROR');
    }

    return response;
}

const deleteDemand = async (demandId) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'UPDATE demands SET deleted_at = NOW() WHERE id = ?',
        [demandId]
    );

    if (response.affectedRows !== 1) {
        errors.conflictError('Error al borrar la demanda', 'DEMAND_DELETE_ERROR');
    }

    return response;
}


const insertFile = async (entity_id, entity_type, src) => {
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

const deleteFile = async (entity_id, entity_type) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'UPDATE files SET deleted_at = NOW() WHERE entity_id = ? AND entity_type = ?',
        [entity_id, entity_type]
    );

    if (response.affectedRows !== 1) {
        errors.conflictError('Error al borrar el archivo', 'FILE_DELETE_ERROR');
    }

    return response;
}

export default {
    insertNewDemand,
    getDemandById,
    updateDemandStatus,
    editDemand,
    deleteDemand,
    insertFile,
    getAllDemands,
    deleteFile,
    getAllDemandsByUserId
}
