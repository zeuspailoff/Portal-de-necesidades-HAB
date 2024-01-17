import getPool from '../db/getPool.js';
import errors from '../helpers/errors.helper.js';

export const insertNewDemand = async (user_id, title, description, category_id) => {
    const pool = await getPool();

    const [response] = await pool.query(
        'INSERT INTO demands (user_id, title, description,category_id) VALUES (?,?,?,?)',
        [user_id, title, description, category_id]
    );

    if (response.affectedRows !== 1) {
        errors.conflictError('Error al insertar la demanda', 'DEMAND_INSERT_ERROR');
    }

    return response;
}

export const selectDemandById = async (id) => {
    const pool = await getPool();
    const [response] = await pool.query(
        `SELECT 
        d.id AS demandId,
        d.title AS demandTitle,
        d.description AS demandDescription,
        d.created_at AS demandCreatedAt,
        u.id AS userId,
        u.username AS username,
        u.created_at AS userCreatedAt,
        fu.id AS userAvatarId,
        fu.src AS userAvatarSrc,
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT('fileId', df.id, 'fileSrc', df.src)
            )
            FROM files df
            WHERE df.demand_id = d.id
        ) AS demandFiles,
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'proposalId', p.id,
                    'proposalDescription', p.description,
                    'proposalCreatedAt', p.created_at,
                    'proposalFiles', (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT('fileId', pf.id, 'fileSrc', pf.src)
                        )
                        FROM files pf
                        WHERE pf.proposal_id = p.id
                    )
                )
            )
            FROM proposals p
            WHERE p.demand_id = d.id AND p.deleted_at IS NULL
        ) AS proposals
    FROM 
        demands d
    LEFT JOIN 
        users u ON d.user_id = u.id
    LEFT JOIN 
        files fu ON u.id = fu.user_id
    WHERE 
        d.id = ? AND d.deleted_at IS NULL;
    `,
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
            c.value as category,
            u.username as creator_username
        FROM 
            demands d
        LEFT JOIN 
            users u ON d.user_id = u.id
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
    d.id AS demandId,
    d.title AS demandTitle,
    d.description AS demandDescription,
    d.created_at AS demandCreatedAt,
    u.id AS userId,
    u.username AS username,
    u.created_at AS userCreatedAt,
    fu.id AS userAvatarId,
    fu.src AS userAvatarSrc,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT('fileId', df.id, 'fileSrc', df.src)
        )
        FROM files df
        WHERE df.demand_id = d.id
    ) AS demandFiles,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'proposalId', p.id,
                'proposalDescription', p.description,
                'proposalCreatedAt', p.created_at,
                'proposalFiles', (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT('fileId', pf.id, 'fileSrc', pf.src)
                    )
                    FROM files pf
                    WHERE pf.proposal_id = p.id
                )
            )
        )
        FROM proposals p
        WHERE p.demand_id = d.id AND p.deleted_at IS NULL
    ) AS proposals
FROM 
    demands d
LEFT JOIN 
    users u ON d.user_id = u.id
LEFT JOIN 
    files fu ON u.id = fu.user_id
WHERE 
    u.id = ? AND d.deleted_at IS NULL;

        `, [userId, userId]
    );

    if (response.length == 0) {
        errors.entityNotFound('Demand');
    }

    return response;
}

export const updateDemandStatus = async (demand_id) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'UPDATE demands SET is_closed = 1 WHERE id = ?',
        [demand_id]
    );

    if (response.affectedRows !== 1) {
        errors.conflictError('Error al actualizar la demanda', 'DEMAND_UPDATE_ERROR');
    }

    return response;
}

export const editDemand = async (demandId, title, description, category_id) => {
    const pool = await getPool();
    const [response] = await pool.query(
        `UPDATE demands SET title = ?, description = ? , category_id = ? WHERE id = ?`,
        [title, description, category_id, demandId]
    );

    if (response.affectedRows !== 1) {
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
export const isClosed = async (proposal_id) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'UPDATE proposals SET is_correct =1 WHERE id =?',
        [proposal_id]
    );

    if (response.affectedRows !== 1) {
        errors.conflictError('Proposal not found', 'PROPOSAL_NOT_FOUND');
    }


    return response;
}


