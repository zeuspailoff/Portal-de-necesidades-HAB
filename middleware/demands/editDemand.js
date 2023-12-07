import editDemand from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {
    try {
        await editDemand(req.body.demand_id, req.body.title, req.body.description, req.body.file);
        res.send({
            status: 200,
            message: `Demand ${req.body.demand_id} edited successfully.`,
        })
    } catch (error) {
        next(error);
    }
};

export default main;