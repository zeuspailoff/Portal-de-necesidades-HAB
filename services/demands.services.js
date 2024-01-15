import getPool from '../db/getPool.js';
import errors from '../helpers/errors.helper.js';

export const insertNewDemand = async (user_id, title, description) => {
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

export const selectDemandById = async (id) => {
    const pool = await getPool();
    const [response] = await pool.query(
    `SELECT 
        d.description, d.is_closed, d.category_id, d.created_at, 
        u.email as creator_email,
        u.username as creator_username,
        p.*,
        COUNT(pv.id) as voteCount,
        AVG(pv.value) as voteAvg,
        fd.src as demandFileSrc,
        fp.src as proposalFileSrc,
        fu.src as userFileSrc,
        c.value as category
    FROM 
        demands d
    LEFT JOIN 
        users u ON d.users_id = u.id
    LEFT JOIN 
        proposals p ON d.id = p.demand_id AND p.deleted_at IS NULL
    LEFT JOIN 
        proposals_votes pv ON p.id = pv.proposal_id
    LEFT JOIN 
        files fd ON d.id = fd.demand_id AND fd.proposal_id IS NULL
    LEFT JOIN 
        files fp ON p.id = fp.proposal_id
    LEFT JOIN 
        files fu ON u.id = fu.user_id
    LEFT JOIN
        categories c ON d.category_id = c.id
    WHERE 
        d.id = ? AND d.deleted_at IS NULL
    GROUP BY 
        d.id, u.id, p.id, fd.id, fp.id, fu.id;`,
        [id]
    );

    if (response.length < 1) {
        errors.entityNotFound('Demand');
    }

    return response[0];
}

export const selectAllDemands = async () => {
    const pool = await getPool();
    const [response] = await pool.query(`
        SELECT 
            d.id,
            d.title,
            d.description,
            d.is_closed,
            c.name as category,
            u.username as creator_username,
        FROM 
            demands d
        LEFT JOIN 
            users u ON d.users_id = u.id
        LEFT JOIN
            categories c ON d.category_id = c.id
        WHERE 
            d.deleted_at IS NULL;
    `
    );
    if (response.length == 0) {
        errors.entityNotFound('Demand');
    }
    return response;
}

export const selectAllDemandsByUserId = async (userId) => {
    const pool = await getPool();
    const [response] = await pool.query(
        `
            SELECT 
                d.id,
                d.title,
                d.description,
                d.is_closed,
                c.name as category,
                u.username as creator_username,
            FROM 
                demands d
            LEFT JOIN 
                users u ON d.users_id =?
            LEFT JOIN
                categories c ON d.category_id = c.id
            WHERE 
                user_id =? 
            AND
                d.deleted_at IS NULL;
        `,[userId,userId]
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
        errors.conflictError('Error al actualizar la demanda', 'DEMAND_UPDATE_ERROR');
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
        errors.conflictError('Error al actualizar la demanda', 'DEMAND_UPDATE_ERROR');
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
        errors.conflictError('Error al borrar la demanda', 'DEMAND_DELETE_ERROR');
    }

    await pool.query(
        'UPDATE proposals SET deleted_at = NOW() WHERE demand_id =?',
        [id]
    );


    return response;
}

export const deleteFile = async (entity_id, entity_type) => {
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


