import validateSchema from '../../helpers/validationSchema.helper.js';
import getUserByIdSchema from '../../schemas/users/getUserById.schema.js';
import { findOrFailUserById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    await validateSchema(getUserByIdSchema, req.params);

    const { id } = req.params;

    try {
        const response = await findOrFailUserById(id);
        res.send({
            status: 200,
            message: `User ${id} fetched successfully`,
            data: response
        })
    } catch (error) {
        next(error);
    }
};

export default main;