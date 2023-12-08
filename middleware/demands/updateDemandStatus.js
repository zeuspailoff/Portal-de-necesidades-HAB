import updateDemandStatus from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {
    try {
        await updateDemandStatus(req.body.demand_id, req.body.status);
        res.send({
            status: 200,
            message: `Demand ${req.body.demand_id} status modified successfully. New status: ${req.body.status}`
        })
    } catch (error) {
        next(error);
    }
};

export default main;