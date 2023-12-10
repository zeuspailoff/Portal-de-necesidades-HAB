import { deleteDemand } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    const { demand_id } = req.body;

    try {
        await deleteDemand(demand_id);
        res.send({
            status: 200,
            message: `Demand with ID: ${demand_id} deleted successfully`
        })
    } catch (error) {
        next(error);
    }
};

export default main;