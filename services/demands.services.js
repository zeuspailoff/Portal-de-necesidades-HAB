import getPool from '../db/getPool.js';
import errors from '../helpers/errors.helper.js';

export const insertNewDemand = async (user_id, title, description) => {
    const pool = await getPool();

    const [response] = await pool.query(
        'INSERT INTO demands (user_id, title, description) VALUES (?,?,?)',
        [user_id, title, description]
    );

    if (response.affectedRows!== 1) {
        errors.conflictError('Error trying to insert demand', 'DEMAND_INSERT_ERROR');
    }

    return response;
}

export const selectDemandById = async (id) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'SELECT * FROM demands WHERE id = ? AND deleted_at IS NULL',
        [id]
    );

    if (response.length < 1) {
        errors.entityNotFound('Demand');
    }

    return response[0];
}

export const selectAllDemands = async () => {
    const pool = await getPool();
    const [response] = await pool.query(
        'SELECT * FROM demands WHERE deleted_at IS NULL'
    );
    if (response.length == 0) {
        errors.entityNotFound('Demand');
    }
    return response;
}

export const selectAllDemandsByUserId = async (userId) => {
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

export const updateDemandStatus = async (demandId, status) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'UPDATE demands SET status = ? WHERE id = ?',
        [status, demandId]
    );

    if (response.affectedRows!== 1) {
        errors.conflictError('Error trying to update demand', 'DEMAND_UPDATE_ERROR');
    }

    return response;
}

export const editDemand = async (demandId, title, description) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'UPDATE demands SET title = ?, description = ? WHERE id = ?',
        [title, description, demandId]
    );

    if (response.affectedRows!== 1) {
        errors.conflictError('Error trying to update demand', 'DEMAND_UPDATE_ERROR');
    }

    return response;
}

export const deleteDemand = async (id) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'UPDATE demands SET deleted_at = NOW() WHERE id = ?',
        [id]
    );

    if (response.affectedRows !== 1) {
        errors.conflictError('Error trying to delete demand', 'DEMAND_DELETE_ERROR');
    }

    return response;
}

export const deleteFile = async (entity_id, entity_type) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'UPDATE files SET deleted_at = NOW() WHERE entity_id = ? AND entity_type = ?',
        [entity_id, entity_type]
    );

    if (response.affectedRows !== 1) {
        errors.conflictError('Error trying to delete file', 'FILE_DELETE_ERROR');
    }

    return response;
}

export const demandExists = async (demand_id) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'SELECT * FROM demands WHERE id = ? AND deleted_at IS NULL',
        [demand_id]
    );

    if (response.length !== 1) {
        errors.entityNotFound('Demand');
    }

    return response;
} 


