import validateSchema from '../../helpers/validationSchema.helper.js';
import getDemandByIdSchema from '../../schemas/demands/getDemandById.schema.js';
import { getDemandById } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    await validateSchema(getDemandByIdSchema, req.body);

    const { id } = req.body;

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