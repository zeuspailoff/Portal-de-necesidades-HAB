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
        'DELETE FROM proposals WHERE id =?',
        [id]
    );
    if (response.affectedRows !== 1) {
        console.log('fallo al borrar ')
    }
    return response;
};

export {
    newProposal,
    deleteProposal
};