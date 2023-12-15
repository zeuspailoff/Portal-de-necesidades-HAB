import validateSchema from '../../helpers/validationSchema.helper.js';
import passwordUpdateUserSchema from '../../schemas/users/passwordUpdateUser.schema.js';
import { editPasswordById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    await validateSchema(passwordUpdateUserSchema, req.body);

    const { id, password } = req.body;

    try {
        const response = await editPasswordById(id, password);
        res.send({
            status: 200,
            message: `User password with ID: ${id} modified successfully.`,
            data: {response}
        })
    } catch (error) {
        next(error);
    }
};

export default main;