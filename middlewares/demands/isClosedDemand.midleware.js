import { demandClosed } from "../../controllers/demands.controller.js";
const main = async (req, res, next) => {

    const demand_id = req.params;
    const proposal_id = req.params;

    try {
        await demandClosed(demand_id, proposal_id);

        res.send({
            status: 200,
            message: `Demand with id ${demand_id} is closed successfully`
        }
        )

    } catch (error) {
        next(error);
    }
};

export default main;