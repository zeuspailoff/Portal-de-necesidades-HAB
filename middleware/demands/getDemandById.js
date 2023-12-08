import getDemandById from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {
    try {
        await getDemandById(req.body.demand_id);
        res.send({
            status: 200,
            message: `Demand ${req.body.demand_id} fetched successfully`
        })
    } catch (error) {
        next(error);
    }
};

export default main;