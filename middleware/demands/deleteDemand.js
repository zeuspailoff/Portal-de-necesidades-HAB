import deleteDemand from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {
    try {
        await deleteDemand(req.body.demand_id);
        res.send({
            status: 200,
            message: `Demand ${req.body.demand_id} deleted successfully`
        })
    } catch (error) {
        next(error);
    }
};

export default main;