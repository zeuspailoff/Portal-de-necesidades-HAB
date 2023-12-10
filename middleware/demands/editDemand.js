import { editDemand } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    const { demand_id, title, description, files } = req.body;
    try {
        const response = await editDemand(demand_id, title, description, files);
        res.send({
            status: 200,
            message: `Demand with ID: ${demand_id} edited successfully.`,
        })
    } catch (error) {
        next(error);
    }
};

export default main;