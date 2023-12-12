import getPool from "../db/getPool.js";

const newProposal = async (user_id, demand_id, description) => {

    const pool = await getPool();

    const [response] = await pool.query(
        'INSERT INTO proposals (user_id, demand_id, description) VALUES (?,?,?)',
        [user_id, demand_id, description]
    );
    if (response.affectedRows !== 1) {
        console.log('fallo al insertar ')
    }
    return response;
};
//borramos el propousal

const deleteProposal = async (id) => {

    const pool = await getPool();

    const [response] = await pool.query(
        'DELETE FROM proposals WHERE id =? AND deleted_at IS NULL',
        [id]
    );
    if (response.affectedRows !== 1) {
        console.log('fallo al borrar ')
    }
    return response;
};

//editar el propousal

const editProposal = async (id, description) => {

    const pool = await getPool();

    const [response] = await pool.query(
        'UPDATE proposals SET description =? WHERE id =?',
        [description, id]
    );
    if (response.affectedRows !== 1) {
        console.log('fallo al editar ')
    }
    return response;
};

//encontramos una proposal por su id

const getProposalById = async (id) => {

    const pool = await getPool();

    const [response] = await pool.query(
        'SELECT * FROM proposals WHERE id =?',
        [id]
    );
    return response;
};

//encontramos una proposal por un demand_id

const getProposalByDemandId = async (demand_id) => {

    const pool = await getPool();

    const [response] = await pool.query(
        'SELECT * FROM proposals WHERE demand_id = ?',
        [demand_id]
    );
    if (response.length < 1) {
        console.error('no hay proposales en la base de datos');
    };
    return response;
};

export {
    newProposal,
    deleteProposal,
    editProposal,
    getProposalById,
    getProposalByDemandId
};