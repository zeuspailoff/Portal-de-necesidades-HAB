import getAllDemands from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {
    try {
        await getAllDemands(req.body.user_id);
        res.send({
            status: 200,
            message: 'Demands fetched successfully',
        })
    } catch (error) {
        next(error);
    }
};

export default main;