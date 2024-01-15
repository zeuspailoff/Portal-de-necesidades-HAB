import validateSchema from '../../helpers/validationSchema.helper.js';
import editDemandSchema from '../../schemas/demands/editDemand.schema.js';
import { editDemandById } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    const demand_id = req.demand.id;
    const files = req.files;
    const { title, description } = req.body;
    try {
        await validateSchema(editDemandSchema, req.body);

        const response = await editDemandById(demand_id, title, description, files);

        res.send({
            status: 200,
            message: `Demand with ID: ${demand_id} edited successfully.`,
        })
    } catch (error) {
        next(error);
    }
};

export default main;