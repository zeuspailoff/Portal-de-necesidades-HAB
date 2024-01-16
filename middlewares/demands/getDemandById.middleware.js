import { getDemandById } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {


    const { id } = req.params;

    try {

        const response = await getDemandById(id);
        res.send({
            status: 200,
            message: `Demand ${id} fetched successfully`,
            data: response
        })
    } catch (error) {
        next(error);
    }
};

export default main;