import { demandAlreadyExists } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    const { demand_id } = req.params || req.body;


    try {

        const response = await demandAlreadyExists(demand_id);

        req.demand = response[0];

        next();

    } catch (error) {
        next(error);
    }
};

export default main;