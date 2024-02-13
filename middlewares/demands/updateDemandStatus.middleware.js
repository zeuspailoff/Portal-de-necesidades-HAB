import { demandClosed, updateDemandStatusById } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    const { proposal_id } = req.body;
    const { demand_id } = req.params;

    try {
        if (proposal_id) {
            await demandClosed(proposal_id)
        }
        await updateDemandStatusById(demand_id);

        res.send({
            status: 200,
            message: `Demand with ID: ${demand_id} status modified successfully`
        })
    } catch (error) {
        next(error);
    }
};

export default main;