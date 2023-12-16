import getPool from "../db/getPool.js";
import errors from '../helpers/errors.helper.js';


const newProposal = async (user_id, demand_id, description) => {

    const pool = await getPool();

    const [response] = await pool.query(
        'INSERT INTO proposals (user_id, demand_id, description) VALUES (?,?,?)',
        [user_id, demand_id, description]
    );
    if (response.affectedRows !== 1) {
        errors.conflictError('Error al insertar la proposal', 'PROPOSAL_INSERT_ERROR');
    }
    return response;
};

const deleteProposal = async (id) => {

    const pool = await getPool();

    const [response] = await pool.query(

        'DELETE FROM proposals WHERE id =? AND deleted_at IS NULL',

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
        'UPDATE proposals SET description =? WHERE id =?',
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
        'SELECT * FROM proposals WHERE id =? and deleted_at IS NULL',
        [id]
    );

    if (response.length < 1) {
        errors.entityNotFound('Proposal');
    }

    return response[0];
};

const getProposalByDemandId = async (demand_id) => {

    const pool = await getPool();

    const [response] = await pool.query(
        'SELECT * FROM proposals WHERE demand_id = ? and deleted_at IS NULL',
        [demand_id]
    );
    if (response.length < 1) {
        errors.entityNotFound('Proposal');
    }
    return response;
};
const insertVote = async (value, proposal_id, user_id, demand_id) => {
    const pool = await getPool();

    const [actualVotes] = await pool.query(
        `SELECT * FROM proposals_votes WHERE user_id = ? AND proposal_id = ?`,
        [user_id, proposal_id]
    )
    if (actualVotes.length > 0) {
        errors.unauthorizedUser(
            'Solo un voto por persona😤'
        )
    }

    const [response] = await pool.query(
        'INSERT INTO proposals_votes (proposal_id, user_id, value, demand_id) VALUES (?, ?, ?, ?)',
        [proposal_id, user_id, value, demand_id]
    )

    if (response.affectedRows !== 1) {
        errors.conflictError('Error al insertar el voto', 'VOTE_INSERT_ERROR')
    }

    const [votes] = await pool.query(
        'SELECT AVG(value) as voteAvg FROM proposals_votes WHERE demand_id = ?',
        [demand_id]
    )

    if (votes.length < 1) {
        errors.entityNotFound('La demanda no existe🔍')
    }

    return votes[0].voteAvg;
};

const proposalExists = async (proposal_id) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'SELECT * FROM proposals WHERE id = ?',
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
        errors.conflictError('Error al editar la proposal', 'PROPOSAL_EDIT_ERROR');
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
    insertVote
};