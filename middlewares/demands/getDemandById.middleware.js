import { getDemandById } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {


    const { demand_id } = req.params;

    try {

        const response = await getDemandById(demand_id);
        res.send({
            status: 200,
            message: `Demand ${demand_id} fetched successfully`,
            data: response
        })
    } catch (error) {
        next(error);
    }
};

export default main;