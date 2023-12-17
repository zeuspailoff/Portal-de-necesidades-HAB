import validateSchema from '../../helpers/validationSchema.helper.js'
import deleteDemandSchema from '../../schemas/demands/deleteDemand.schema.js';
import { deleteDemandById } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {


    const { demand_id } = req.body;

    try {
        await validateSchema(deleteDemandSchema, req.body);

        await deleteDemandById(demand_id);
        res.send({
            status: 200,
            message: `Demand with ID: ${demand_id} deleted successfully`
        })
    } catch (error) {
        next(error);
    }
};

export default main;