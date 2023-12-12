import validateSchema from '../../helpers/validationSchema.helper.js'
import deleteDemandSchema from '../../schema/demands/deleteDemand.schema.js';
import { deleteDemandById } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    await validateSchema(deleteDemandSchema, req.body);

    const { id } = req.body;

    try {
        await deleteDemandById(id);
        res.send({
            status: 200,
            message: `Demand with ID: ${id} deleted successfully`
        })
    } catch (error) {
        next(error);
    }
};

export default main;