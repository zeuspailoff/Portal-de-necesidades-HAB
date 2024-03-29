import getPool from "../db/getPool.js";
import errors from '../helpers/errors.helper.js';


const newProposal = async (user_id, demand_id, description) => {

    const pool = await getPool();

    const [response] = await pool.query(
        'INSERT INTO proposals (user_id, demand_id, description) VALUES (?,?,?)',
        [user_id, demand_id, description]
    );
    if (response.affectedRows !== 1) {
        errors.conflictError('Error inserting the proposal', 'PROPOSAL_INSERT_ERROR');
    }
    return response;
};

const deleteProposal = async (id) => {

    const pool = await getPool();

    const [response] = await pool.query(

        'UPDATE proposals SET deleted_at = NOW() WHERE id =?',
        [id]
    );
    if (response.affectedRows !== 1) {
        errors.conflictError('Error al borrar la porposal', 'PROPOSAL_DELETE_ERROR');
    }
    return response;
};

const editProposal = async (id, description) => {
    const pool = await getPool();

    const [response] = await pool.query(
        `UPDATE proposals SET description =? WHERE id =?`,
        [description, id]
    );
    if (response.affectedRows !== 1) {
        errors.conflictError('Error al editar la proposal', 'PROPOSAL_EDIT_ERROR');
    }
    return response;
};

const getProposalById = async (id) => {

    const pool = await getPool();

    const [response] = await pool.query(
        `
        SELECT 
        p.id,
        p.description,
        p.is_correct,
        p.created_at,
        u.username as creator_username,
            (SELECT AVG(value) 
            FROM 
                proposals_votes 
            WHERE 
                proposal_id = p.id) as voteAvg, 
            (SELECT COUNT(*) 
            FROM 
                proposals_votes 
            WHERE 
                proposal_id = p.id) as voteCount 
            FROM 
                proposals p
        LEFT JOIN 
            users u ON p.user_id = u.id
        WHERE 
            p.id = ? 
            AND p.deleted_at IS NULL;`, [id]
    );

    if (response.length < 1) {
        errors.entityNotFound('Proposal');
    }

    return response[0];
};

const getProposalByDemandId = async (demand_id) => {

    const pool = await getPool();

    const [response] = await pool.query(
        `
        SELECT 
    p.*,
    u.username as creator_username,
    p.description as proposal_description,
    d.user_id AS creator_id,
    d.title as demand_title,
    d.description as demand_description,
    JSON_ARRAYAGG(JSON_OBJECT('id', df.id, 'src', df.src)) as demandFiles,
    JSON_ARRAYAGG(JSON_OBJECT('id', pf.id, 'src', pf.src)) as proposalFiles,
    uf.src as profile_picture,
    (SELECT AVG(value) FROM proposals_votes pv WHERE pv.proposal_id = p.id) as voteAvg,
    (SELECT COUNT(*) FROM proposals_votes pv WHERE pv.proposal_id = p.id) as voteCount
FROM 
    proposals p
LEFT JOIN 
    users u ON p.user_id = u.id
LEFT JOIN 
    demands d ON p.demand_id = d.id
LEFT JOIN 
    files df ON d.id = df.demand_id AND df.proposal_id IS NULL
LEFT JOIN 
    files pf ON p.id = pf.proposal_id
LEFT JOIN 
    files uf ON u.id = uf.user_id
WHERE 
    p.demand_id = ? 
    AND p.deleted_at IS NULL
GROUP BY
    p.id, u.id, d.id, uf.id; -- Asegurarse de incluir todas las columnas no agregadas en GROUP BY
 
    `, [demand_id]
    );
    if (response.length < 1) {
        errors.entityNotFound('Proposal');
    }
    return response;
};

const insertVote = async (value, proposal_id, user_id) => {
    const pool = await getPool();

    const [actualVotes] = await pool.query(
        `SELECT * FROM proposals_votes WHERE user_id = ? AND proposal_id = ?`,
        [user_id, proposal_id]
    )
    if (actualVotes.length > 0) {
        errors.unauthorizedUser(
            'Only one vote per person😤'
        )
    }

    const [response] = await pool.query(
        `INSERT INTO proposals_votes (proposal_id, user_id, value) VALUES (?, ?, ?)`,
        [proposal_id, user_id, value]
    )

    if (response.affectedRows !== 1) {
        errors.conflictError('Error al insertar el voto', 'VOTE_INSERT_ERROR')
    }

    const [votes] = await pool.query(
        'SELECT AVG(value) as voteAvg FROM proposals_votes WHERE proposal_id = ?',
        [proposal_id]
    )

    if (votes.length < 1) {
        errors.entityNotFound('The lawsuit does not exist🔍')
    }

    return votes[0].voteAvg;
};

const proposalExists = async (proposal_id) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'SELECT * FROM proposals WHERE id =? AND deleted_at IS NULL',
        [proposal_id]
    );

    if (response.length !== 1) {
        errors.entityNotFound('Proposal');
    }
    return response;
}

const updateProposalStatus = async (id) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'UPDATE proposals SET is_correct = 1 WHERE id =?',
        [id]
    );

    if (response.affectedRows !== 1) {
        errors.conflictError('Error editing the proposal', 'PROPOSAL_EDIT_ERROR');
    }
    return response;
};

const getMostVotedProposalByUserId = async (user_id) => {

    const pool = await getPool();
    const [response] = await pool.query(
        `
        SELECT proposals.*, AVG(proposals_votes.value) AS average_votes
        FROM proposals
        LEFT JOIN proposals_votes ON proposals.id = proposals_votes.proposal_id
        WHERE proposals.user_id = ?
        GROUP BY proposals.id
        ORDER BY average_votes DESC
        LIMIT 5
        `,
        [user_id]
    );


    if (response.affectedRows == 0) {
        errors.conflictError('Proposals not found', 'PROPOSAL_FIND_ERROR');
    }
    return response;
};


export {
    newProposal,
    deleteProposal,
    editProposal,
    getProposalById,
    getProposalByDemandId,
    proposalExists,
    updateProposalStatus,
    insertVote,
    getMostVotedProposalByUserId
};
