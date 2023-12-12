import validateSchema from '../../helpers/validationSchema.helper.js'
import deleteDemandSchema from '../../schema/demands/deleteDemand.schema.js';
import { deleteDemand } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    await validateSchema(deleteDemandSchema, req.body);

    const { demand_id } = req.body;

    try {
        await deleteDemand(demand_id);
        res.send({
            status: 200,
            message: `Demand with ID: ${demand_id} deleted successfully`
        })
    } catch (error) {
        next(error);
    }
};

export default main;