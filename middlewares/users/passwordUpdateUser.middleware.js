import validateSchema from '../../helpers/validationSchema.helper.js';
import passwordUpdateUserSchema from '../../schemas/users/passwordUpdateUser.schema.js';
import { editPasswordById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    
    const { user_id, password } = req.body;
    
    try {
        await validateSchema(passwordUpdateUserSchema, req.body);
        const response = await editPasswordById(user_id, password);
        res.send({
            status: 200,
            message: `User password with ID: ${user_id} modified successfully.`,
            data: {response}
        })
    } catch (error) {
        next(error);
    }
};

export default main;