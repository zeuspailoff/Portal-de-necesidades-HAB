import validateSchema from '../../helpers/validationSchema.helper.js'
import validateUserSchema from '../../schema/users/validateUser.schema.js'
import { validateUserById } from '../../controllers/users.controller.js'

const main = async (req, res, next) => {

    await validateSchema(validateUserSchema, req.body);

    const { id } = req.body;

    try {
        await validateUserById(id);
        res.send({
            status: 200,
            message: `User with ID: ${id} validated successfully`
        })
    } catch (error) {
        next(error);
    }
};

export default main;
