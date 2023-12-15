import validateSchema from '../../helpers/validationSchema.helper.js';
import editDemandSchema from '../../schemas/demands/editDemand.schema.js';
import { editDemandById } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    await validateSchema(editDemandSchema, req.body);

    const { id, title, description, files } = req.body;
    try {
        const response = await editDemandById(id, title, description, files);
        res.send({
            status: 200,
            message: `Demand with ID: ${id} edited successfully.`,
        })
    } catch (error) {
        next(error);
    }
};

export default main;