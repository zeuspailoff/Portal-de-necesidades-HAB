import { getAllDemands } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {
    try {
        const [...response] = await getAllDemands(req.body.user_id);
        res.send({
            status: 200,
            message: 'Demands fetched successfully',
            data: response
        })
    } catch (error) {
        next(error);
    }
};

export default main;