import getPool from "../db/getPool.js";

const newProposal = async (description, user_id, demand_id) => {

    const pool = await getPool();

    const query = `INSERT INTO proposals (description, user_id, demand_id) VALUES (?, ?, ?) `;
    const values = [description, user_id, demand_id];

    const result = await pool.query(query, values);
    return result.rows[0];
};

export default newProposal;