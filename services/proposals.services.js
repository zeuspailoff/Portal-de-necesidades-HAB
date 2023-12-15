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
 
    if (response.affectedRows!== 1) {
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
    updateProposalStatus
};